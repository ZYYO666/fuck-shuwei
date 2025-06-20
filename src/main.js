const { configure } = require('./module/request')

const meanwhile = require('./module/meanwhile')
const bingfa = require('./module/bingfa')
const initSelection = require('./module/initSelection')
const getLesson = require('./module/getLesson')
const getLessonId = require('./module/getLessonId')
const getProfileId = require('./module/getProfileId')
const getCookie = require('./module/getCookie')
const zyyo_delay = require('./module/tool')

const startMainProcess = async (config, retryCount = 0) => {
  try {
    configure(config.url, config.delay)

    config.logger.zyyostep(1) //标志程序开始，千万别删，不然前端有个逆天bug浪费我半个小时

    const cookie = await getCookie(config)

    const profileId = await getProfileId(config, cookie)

    const init = await initSelection(config, profileId, cookie)

    const lessons = await getLesson(config, profileId, cookie)

    const lessonIds = getLessonId(config, lessons)

    if (config.selectionModel == 2) {
      const res = await meanwhile(config, profileId, lessonIds, cookie)
    } else {
      const res = await bingfa(config, profileId, lessonIds, cookie)
    }
  } catch (error) {
    //登陆过期重试
    //接受来自于响应拦截器抛出的异常，并且重试
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
