const { visit } = require('../base/tool')
const cheerio = require('cheerio')

module.exports = async function getProfileId(config) {
  try {
    const rawCount = config.count === undefined || config.count === null ? '' : String(config.count).trim()
    const count = parseInt(rawCount) || 1

    let result = await visit('/eams/stdElectCourse!innerIndex.action', config.cookie)

    if (!result) {
      throw new Error('初始页面失败')
    }

    // 解析所有选课轮次信息
    const $ = cheerio.load(result)
    const electionProfiles = []

    // 查找所有选课轮次容器
    $('div[id^="electIndexNotice"]').each((index, element) => {
      const $element = $(element)

      // 提取标题
      const title = $element.find('h2').text().trim()

      // 提取轮次信息
      const roundInfo = $element.find('div').first().text()
      const roundMatch = roundInfo.match(/选课轮次\s+(\d+)/)
      const round = roundMatch ? parseInt(roundMatch[1]) : index + 1

      // 提取时间信息
      const timeInfo = $element.find('div').first().html() || ''
      const openTimeMatch = timeInfo.match(/选课开放时间:\s*([^<]+)/)
      const closeTimeMatch = timeInfo.match(/退课开放时间:\s*([^<]+)/)

      // 提取profileId
      const linkElement = $element.find('a[href*="electionProfile.id"]')
      const href = linkElement.attr('href') || ''
      const profileIdMatch = href.match(/electionProfile\.id=(\d+)/)
      const profileId = profileIdMatch ? profileIdMatch[1] : ''

      // 提取注意事项
      const noticeElements = $element.find('div').filter((i, el) => {
        return $(el).text().includes('注意事项')
      })
      let notice = ''
      if (noticeElements.length > 0) {
        notice = noticeElements.next().text().trim()
      }

      if (profileId && title) {
        electionProfiles.push({
          id: profileId,
          title: title,
          round: round,
          openTime: openTimeMatch ? openTimeMatch[1].trim() : '',
          closeTime: closeTimeMatch ? closeTimeMatch[1].trim() : '',
          notice: notice,
          index: index
        })
      }
    })

    if (electionProfiles.length === 0) {
      console.log(result);

      throw new Error('未找到任何选课轮次，请检查是否开放选课')
    }

    // 更新config中的轮次信息
    config.electionProfiles = electionProfiles

    // 缓存轮次列表（创建一个安全的副本用于序列化）
    const safeProfiles = electionProfiles.map(profile => ({
      id: profile.id,
      title: profile.title,
      round: profile.round,
      openTime: profile.openTime,
      closeTime: profile.closeTime,
      notice: profile.notice,
      index: profile.index
    }))
    config.logger.sendData('cache', { key: 'electionProfiles', value: JSON.stringify(safeProfiles) })

    const profileIndex = count - 1
    if (profileIndex >= 0 && profileIndex < electionProfiles.length) {
      config.profileId = electionProfiles[profileIndex].id
      config.logger.sendData('log', `选择轮次 ${count}: ${electionProfiles[profileIndex].title}`)
    } else {
      // 如果count超出范围，默认选择第一个
      config.profileId = electionProfiles[0].id
      config.count = '1' // 重置count为1
      config.logger.sendData('log', `count值超出范围，默认选择第一个轮次: ${electionProfiles[0].title}`)
    }

    config.logger.sendData('log', `发现${electionProfiles.length}个选课轮次`)
    config.logger.sendData('log', `提取到 profileId: ${config.profileId}`)

    return config

  } catch (error) {
    throw error
  }
}
