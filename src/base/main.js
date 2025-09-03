const { configure } = require('./request')
const getCookie = require('./getCookie')
const getLesson = require('./getLesson')
const initSelection = require('./initSelection')
const getProfileId = require('./getProfileId')

const startBaseProcess = async (config, retryCount = 0) => {
    try {
        configure(config.url, config.delay)

        config = await getCookie(config)

        config = await getProfileId(config)

        await initSelection(config)

        config = await getLesson(config)

        return config

    } catch (error) {
        if (error.message.includes('登录过期') && retryCount < 3) {

            config.logger.sendData('log', '登录过期，尝试重新执行流程...')

            config.cookie = ''

            config.logger.sendData('cache', { key: 'cookie', value: '' })

            config.logger.sendData('good', '登录缓存文件清除成功')

            return await startBaseProcess(config, retryCount + 1)
        } else {
            throw error
        }
    }
}

module.exports = { startBaseProcess }
