const { visit } = require('./tool')

module.exports = async function getLesson(config) {
  try {
    let lessonDatas = config.lessonDatas

    if (lessonDatas !== '') {
      config.logger.zyyo('本地课程信息缓存已存在')
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
    try {
      const lessonJSONs = new Function(`${lessonDatas}; return lessonJSONs`)()

   
      config.lessonJSONs = lessonJSONs
      return config
    } catch (error) {
      throw new Error('未找到有效的 lessonJSONs 对象')
    }

  } catch (error) {
    throw error
  }
}
