const { visit, getLessonJSONs } = require('./tool')

module.exports = async function getLesson(config) {
  try {
    const profileId = config.profileId
    if (!profileId) {
      throw new Error('profileId 不能为空')
    }

    // 检查多轮次缓存数据
    let lessonJSONsCache = config.lessonJSONsCache || {}
    
    // 如果缓存的是字符串，需要解析为对象
    if (typeof lessonJSONsCache === 'string') {
      try {
        lessonJSONsCache = JSON.parse(lessonJSONsCache)
      } catch (e) {
        lessonJSONsCache = {}
      }
    }

    let lessonJSONs = null

    // 检查当前轮次是否有缓存
    if (lessonJSONsCache[profileId]) {
      config.logger.sendData('log', `使用轮次 ${profileId} 的缓存数据`)
      lessonJSONs = lessonJSONsCache[profileId]
      
      // 如果缓存的是字符串，需要解析为对象
      if (typeof lessonJSONs === 'string') {
        lessonJSONs = JSON.parse(lessonJSONs)
      }
    } else {
      config.logger.sendData('log', `获取轮次 ${profileId} 的课程数据...`)
      const result = await visit(
        '/eams/stdElectCourse!data.action?profileId=' + profileId,
        config.cookie,
      )
      if (!result) {
        throw new Error('未获取到课程信息')
      }
      
      // 处理原始数据得到lessonJSONs对象
      lessonJSONs = getLessonJSONs(result)
      
      // 将当前轮次数据存入缓存
      lessonJSONsCache[profileId] = lessonJSONs
      
      // 更新多轮次缓存
      config.logger.sendData('cache', { key: 'lessonJSONsCache', value: JSON.stringify(lessonJSONsCache) })
      config.logger.sendData('log', `轮次 ${profileId} 数据已缓存`)
    }

    // 设置当前使用的数据
    config.lessonJSONs = lessonJSONs

    return config

  } catch (error) {
    throw error
  }
}
