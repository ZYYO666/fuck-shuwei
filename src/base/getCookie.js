const login = require('./login')


module.exports = async function getCookie(config) {
  try {

    if (config.cookie == '') {

      config.logger.sendData('log', 'Cookie缓存不存在，开始登陆获取.......')
      const newCookie = await login(config)

      // 登录后清除轮次缓存，因为新的登录可能对应不同的轮次
      config.profileId = null
      config.logger.sendData('cache', { key: 'electionProfiles', value: '' })

      config.logger.sendData('cache', { key: 'cookie', value: newCookie })
      config.cookie = newCookie

      return config
    } else {
      config.logger.sendData('log', '登录缓存读取成功')

      return config
    }
  } catch (error) {
    throw error
  }
}
