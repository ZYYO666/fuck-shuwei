
const visit = require('./visit')

module.exports = async function getLesson(config) {
  try {
    let lessonDatas = config.lessonDatas
    if (lessonDatas == '') {
      const result = await visit(
        '/eams/stdElectCourse!data.action?profileId=' + config.profileId,
        config.cookie,
      )

      config.logger.lessonDatas(result)

      lessonDatas = result
    } else {
      config.logger.zyyo('本地课程信息缓存已存在')
    }

    const match = lessonDatas.match(
      /var\s+lessonJSONs\s*=\s*(\[\s*{[\s\S]*}\s*])/,
    )
    if (match && match[1]) {
      const lessonJSONs = new Function(`return ${match[1]};`)()
      config.logger.zyyostep(5)
      config.lessonJSONs = lessonJSONs
      return config
    } else {
      throw new Error('未找到有效的 lessonJSONs 对象,尝试删除Cache')
    }
  } catch (error) {
    throw error
  }
}
