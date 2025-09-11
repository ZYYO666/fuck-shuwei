const { configure } = require('./module/request')

const meanwhile = require('./module/meanwhile')
const bingfa = require('./module/bingfa')
const initSelection = require('./module/initSelection')
const getLesson = require('./module/getLesson')
const getLessonId = require('./module/getLessonId')
const getProfileId = require('./module/getProfileId')
const getCookie = require('./module/getCookie')


const startMainProcess = async (config, retryCount = 0) => {

  try {

    configure(config.url, config.delay)

    config.logger.zyyostep(1) 

    config = await getCookie(config)

    config = await getProfileId(config)



    const init = await initSelection(config)


    config = await getLesson(config)

    config = getLessonId(config)

    if (config.selectionModel == 2) {
      await meanwhile(config)
    } else {
      await bingfa(config)
    }
  } catch (error) {
    if (error.message.includes('登录过期') && retryCount < 3) {
      config.logger.zyyo('登录过期，尝试重新执行流程...')
      config.logger.zyyostep(1)

      config.cookie = ''
      config.logger.cookie('')
      config.logger.zyyogood('登录缓存文件清除成功')
      //递归
      await startMainProcess(config, retryCount + 1)
    } else {
      config.logger.zyyoerror('程序错误:', error.message)
    }
  }
}

//模块导出不能直接使用递归，长记性了
module.exports = { startMainProcess }
