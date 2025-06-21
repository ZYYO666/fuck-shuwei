

const login = require('./login')


module.exports = async function getCookie(config) {
  try {
    config.logger.zyyostep(2)
    if (config.cookie == '') {
      config.logger.zyyo('Cookie缓存不存在，开始登陆获取.......')
      const newCookie = await login(config)


      config.profileId = ''
      //登陆和profileid的获取必须同步，这里可以选择手动清除profileid，或者手动访问一遍选课列表页面

      config.logger.cookie(newCookie)
      config.cookie = newCookie

      return config
    } else {
      config.logger.zyyo('登录缓存读取成功')

      return config
    }
  } catch (error) {
    throw error
  }
}
