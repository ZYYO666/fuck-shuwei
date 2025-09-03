
const base = require('../base/main')
const fuckLesson = require('./fuckLesson')
const getLessonId = require('./getLessonId')

const startMainProcess = async (config) => {
  try {
    config = await base.startBaseProcess(config)
    config = getLessonId(config)
    await fuckLesson(config)
  } catch (error) {
    config.logger.sendData('error', ['程序错误:', error.message].join(' '))
  }
}


module.exports = { startMainProcess }
