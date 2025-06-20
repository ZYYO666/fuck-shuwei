const fuck = require('./fuck')
const zyyo_delay = require('./tool')
module.exports = async function meanwhile(
  config,
  profileId,
  lessonIds,
  cookie,
) {
  let newlessonDatas = lessonIds
  for (const [index, lessonId] of lessonIds.entries()) {
    if (lessonId.状态 === 'notfound' || lessonId.状态 === 'success') {
      continue
    }

    newlessonDatas[index].状态 = 'loading'

    config.logger.zyyotable(newlessonDatas)

    const result = await fuck(profileId, lessonId.id, cookie)
    if (index < lessonIds.length - 1) {
      await zyyo_delay(config.delay)
    }
    newlessonDatas[index].状态 = result

    config.logger.zyyotable(newlessonDatas)
  }
}
