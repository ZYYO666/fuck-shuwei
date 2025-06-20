const fs = require('fs')

const login = require('./login')

module.exports = async function getCookie(config) {
  try {
    if (config.cookie == '') {
      config.logger.zyyo('Cookie缓存不存在，开始登陆获取.......')
      const newCookie = await login(config)

      config.logger.cookie(newCookie)

      return newCookie
    } else {
      config.logger.zyyo('登录缓存读取成功')
      config.logger.zyyostep(1)
      return config.cookie
    }
  } catch (error) {
    throw error
  }
}
