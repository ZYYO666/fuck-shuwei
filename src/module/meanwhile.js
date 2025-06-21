const fuck = require('./fuck')
const zyyo_delay = require('./tool')
module.exports = async function meanwhile(config) {
  let newlessonDatas = config.lessonIds
  for (const [index, lessonId] of newlessonDatas.entries()) {
    if (lessonId.状态 === 'notfound' || lessonId.状态 === 'success') {
      continue
    }

    newlessonDatas[index].状态 = 'loading'

    config.logger.zyyotable(newlessonDatas)

    const result = await fuck(config.profileId, lessonId.id, config.cookie)
    if (index < newlessonDatas.length - 1) {
      await zyyo_delay(config.delay)
    }
    newlessonDatas[index].状态 = result

    config.logger.zyyotable(newlessonDatas)
  }
}
