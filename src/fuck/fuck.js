const { getInstance } = require('../base/request')

const cheerio = require('cheerio')

module.exports = async function fuck(profileId, id, cookie) {
  const axios = getInstance()
  //参数是控制台分析源码和请求弄过来的，我也看不懂，照抄吧
  let timestamp = Date.now()
  //nice  这傻逼系统url加个事件戳就不会触发点击过快了哈哈哈哈哈哈哈
  //我zyyo真是天才一个
  const url = `/eams/stdElectCourse!batchOperator.action?${timestamp}&profileId=${profileId}`
  const params = `optype=true&operator0=${id}%3Atrue%3A0&lesson0=${id}&schLessonGroup_${id}=undefined`
  try {

    const response = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        'User-Agent':a
          'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Mobile/15E148 Safari/604.1',
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        Cookie: cookie,
      },
      validateStatus: (status) => true,
    })

    const result = response.data.toString('utf-8')
    const $ = cheerio.load(result)
    $('script').remove()
    $('style').remove()
    const text = $('body').text().replace(/\s+/g, ' ').trim()

    if (text.includes('403')) {
      return 'overtime'
    } else if (text.includes('冲突')) {
      return 'clash'
    } else if (text.includes('人数已满')) {
      return 'full'
    } else if (text.includes('成功')) {
      return 'success'
    } else if (text.includes('不开放')) {
      return 'noopen'
    } else if (text.includes('选过')) {
      return 'selected'
    }
    return text
  } catch (error) {
    throw error
  }
}
