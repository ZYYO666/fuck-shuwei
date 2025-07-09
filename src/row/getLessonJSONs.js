
module.exports = function getLessonJSONs(lessonDatas) {
  try {
    return new Function(`${lessonDatas} return lessonJSONs`)()
  } catch (error) {
    throw new Error('未找到有效的 lessonJSONs 对象')
  }
}
