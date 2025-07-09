
module.exports = function getLessonsFromNo(lessonJSONs, userLessonNo) {
  return userLessonNo.map((no) => {


    const matches = lessonJSONs.filter((l) => l.no === no)

    if (matches.length === 0) {
      throw new Error(code + '无开课信息' + no)
    }

    const lessons = matches.map((match) => ({
      id: match.id,
      name: match.name,
      no: match.no,
      teachers: match.teachers,
      teachClassName: match.teachClassName,
      arrangeInfo: match.arrangeInfo,
    }))

    return {
      code: no,
      lessons: lessons,
    }
  })
}
