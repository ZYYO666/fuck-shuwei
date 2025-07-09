const { visit } = require('../base/tool')

module.exports = async function getProfileId(config) {
  try {

    if (config.profileId !== '') {
      config.logger.zyyo('profileId缓存读取成功')
  
      return config
    }

    let result = await visit('/eams/stdElectCourse.action', config.cookie)

    if (!result) {
      throw new Error('初始页面失败')
    }

    const hrefMatch = result.match(/electionProfile\.id=(\d+)/)

    if (!hrefMatch) {
      throw new Error('未找到任何选课轮次，请检查是否开放选课')
    }
    const profileId = hrefMatch[config.count]

    if (!profileId) {
      throw new Error('未找到 profileId，请检查轮次')
    }

    config.logger.sendData('cache', { key: 'profileId', value: profileId })
    config.logger.zyyo('提取到 profileId:', profileId)
    config.logger.zyyo('课程id信息缓存保存成功')

    config.profileId = profileId

    return config

  } catch (error) {
    throw error
  }
}
