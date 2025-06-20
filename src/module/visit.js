const { getInstance } = require('./request')

module.exports = async function visit(href, cookie) {
  const axios = getInstance()
  try {
    const response = await axios.get(href, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Cookie: cookie,
      },
      validateStatus: (status) => true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
