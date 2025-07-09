const { visit, getLessonJSONs } = require('./tool')

module.exports = async function getLesson(config) {
  try {
    let lessonDatas = config.lessonDatas

    if (lessonDatas !== '') {
      config.logger.sendData('log', '本地课程信息缓存已存在')
    } else {
      const result = await visit(
        '/eams/stdElectCourse!data.action?profileId=' + config.profileId,
        config.cookie,
      )
      if (!result) {
        throw new Error('未获取到课程信息')
      }
      config.logger.sendData('cache', { key: 'lessonDatas', value: result })
      lessonDatas = result
    }
    const lessonJSONs = getLessonJSONs(lessonDatas)

    config.lessonJSONs = lessonJSONs

    return config

  } catch (error) {
    throw error
  }
}
