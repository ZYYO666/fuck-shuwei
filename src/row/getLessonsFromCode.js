
module.exports = function getLessonsFromCode(lessonJSONs, userLessonCode) {
  return userLessonCode.map((code) => {
    const trimmedNo = code 
    const matches = lessonJSONs.filter((l) => l.code === trimmedNo)

    if (matches.length === 0) {
      throw new Error(code + '无开课信息')
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
      code: trimmedNo,
      lessons: lessons,
    }
  })
}
