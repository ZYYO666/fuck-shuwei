const fuck = require('./fuck')


module.exports = async function bingfa(config) {
  let newlessonDatas = config.lessonIds


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
