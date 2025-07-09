const fuck = require('./fuck')


module.exports = async function fuckLesson(config) {
  let newlessonDatas = config.lessonIds
  if (config.selectionModel == 2) {

    for (const [index, lessonId] of newlessonDatas.entries()) {
      if (lessonId.状态 === 'notfound' || lessonId.状态 === 'success') {
        continue
      }
      newlessonDatas[index].状态 = 'loading'
      config.logger.zyyotable(newlessonDatas)
      const result = await fuck(config.profileId, lessonId.id, config.cookie)

      newlessonDatas[index].状态 = result
      config.logger.zyyotable(newlessonDatas)
    }
  } else {

    await Promise.all(
      newlessonDatas.map(async (lesson, index) => {
        if (lesson.状态 === 'notfound' || lesson.状态 === 'success') {
          return
        }
        newlessonDatas[index].状态 = 'loading'
        config.logger.zyyotable(newlessonDatas)
        try {
          const result = await fuck(config.profileId, lesson.id, config.cookie)
          newlessonDatas[index].状态 = result
          config.logger.zyyotable(newlessonDatas)
        } catch (error) {

          newlessonDatas[index].状态 = 'error'
          config.logger.zyyoerror(`处理课程 ${lesson.id} 时出错:`, error)
          config.logger.zyyotable(newlessonDatas)
        }
      }),
    )
  }
}
