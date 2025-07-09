
const base = require('../base/main')
const fuckLesson = require('./fuckLesson')
const getLessonId = require('./getLessonId')

const startMainProcess = async (config) => {
  try {
    config = await base.startBaseProcess(config)
    config.logger.zyyostep(6)
    config = getLessonId(config)
    await fuckLesson(config)
  } catch (error) {
    config.logger.zyyoerror('程序错误:', error.message)
  }
}


module.exports = { startMainProcess }
