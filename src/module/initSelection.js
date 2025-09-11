const visit = require('./visit')
/* 他妈的你猜我为啥多此一举，因为这傻逼系统不访问一下这个页面，那几个接口都用不了 zyyo注 */
module.exports = async function initSelection(config) {
  const initUrl = `/eams/stdElectCourse!defaultPage.action?electionProfile.id=${config.profileId}`

  try {
    const res = await visit(initUrl, config.cookie)

   


    if (!res) {
      throw new Error('选课初始化失败')
    }
    config.logger.zyyo('选课初始化成功')
    config.logger.zyyostep(4)
  } catch (error) {
    throw error
  }
}
