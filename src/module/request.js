// request.js
const axios = require('axios')
const cheerio = require('cheerio')

let configuredInstance = null

function configure(url, delay) {  // 添加 delay 参数
  if (configuredInstance) {
    // 实例已存在时不重复创建
  }

  const instance = axios.create({
    baseURL: url,
  })

  // 延迟函数封装
  const delayResponse = (response) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(response), delay)
    })
  }

  const delayError = (error) => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(error), delay)
    })
  }

  instance.interceptors.response.use(
    (response) => {
      try {
        const requestUrl = response.config.url || ''
        // 登录请求直接延迟返回
        if (requestUrl.includes('loginExt')) {
          return delayResponse(response)
        }

        const html = response.data
        const $ = cheerio.load(html)
        const text = $('body').text()
        const loginText = text.includes('过期') || text.includes('登录')

        if (loginText) {
          // 登录过期错误延迟返回
          return delayError(new Error('检测到登录过期...'))
        }

        // 正常响应延迟返回
        return delayResponse(response)
      } catch (error) {
        // 解析错误延迟返回
        return delayError(error)
      }
    },
    (error) => {
      let errMsg = '请求失败，请稍后重试';

      if (error.code === 'ECONNABORTED') {
        errMsg = '请求超时，请检查网络';
      } else if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400: errMsg = '请求参数错误'; break;
          case 401: errMsg = '未授权，请登录'; break;
          case 404: errMsg = '请求资源不存在'; break;
          case 500: errMsg = '服务器内部错误'; break;
          default: errMsg = `请求失败（状态码：${status}）`;
        }
      } else if (error.request) {
        errMsg = '网络错误，请检查地址是否正确';
      }

      // 所有错误类型都延迟返回
      return delayError(new Error(errMsg));
    }
  )

  configuredInstance = instance
  return instance
}

function getInstance() {
  if (!configuredInstance) {
    throw new Error('Request instance not configured. Call configure() first')
  }
  return configuredInstance
}

module.exports = { configure, getInstance }