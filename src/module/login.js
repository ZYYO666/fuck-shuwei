const { getInstance } = require('./request')

const cheerio = require('cheerio')
const qs = require('querystring')
const CryptoJS = require('crypto-js')
const zyyo_delay = require('./tool')


module.exports = async function login(config) {
  const axios = getInstance()
  async function getLoginSalt() {
    let loginCookie = ''
    try {
      const response = await axios.get('/eams/loginExt.action', {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
      })
      if (response.headers['set-cookie']) {
        loginCookie = response.headers['set-cookie']
          .map((cookie) => cookie.split(';')[0])
          .join('; ')
      }
      const saltPattern = /SHA1\('([a-zA-Z0-9\-]+)-/
      const saltMatch = response.data.match(saltPattern)

      if (saltMatch && saltMatch[1]) {
        config.logger.zyyo('获取到的 salt:', saltMatch[1])
        return { salt: saltMatch[1], cookie: loginCookie }
      } else {
        throw new Error('未找到 salt，请检查页面内容')
      }
    } catch (error) {
      config.logger.zyyo('获取 salt 失败:', error.message)
      throw error
    }
  }
  try {
    const salt = await getLoginSalt()
    const encryptedPassword = CryptoJS.SHA1(
      `${salt.salt}-${config.password}`,
    ).toString()
    await zyyo_delay(500)
    const response = await axios.post(
      '/eams/loginExt.action',
      qs.stringify({
        username: config.username,
        password: encryptedPassword,
        sesson_locale: 'zh_CN',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Referer: '/eams/loginPage.action',
          Cookie: salt.cookie,
        },
      },
    )
    const result = response.data.toString('utf-8')
    const $ = cheerio.load(result)
    $('script').remove()
    $('style').remove()
    const text = $('body').text().replace(/\s+/g, ' ').trim()
    if (text.includes('免听申请')) {
      config.logger.zyyo('登录成功， Cookie 已更新。')
      return salt.cookie
    } if (text.includes('验证码不正确')) {
      throw new Error("我勒个痘，验证码不正确，我还没开发。")

    } else {
      throw new Error("帐号或密码错误")
    }
  } catch (error) {
    throw error
  }
}
