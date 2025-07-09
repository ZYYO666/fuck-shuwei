// 主要功能：根据课程代码，从lessonJSONs中提取所有目标课程信息
module.exports = function getLessonsFromCode(lessonJSONs, userLessonCode) {
  return userLessonCode.map((code) => {
    const trimmedNo = code // 课程代码
    const matches = lessonJSONs.filter((l) => l.code === trimmedNo) // 匹配课程

    if (matches.length === 0) {
      throw new Error(code + '无开课信息') // 未找到课程抛出异常
    }

    const lessons = matches.map((match) => ({
      id: match.id, // 课程ID
      name: match.name, // 课程名称
      no: match.no, // 课程编号
      teachers: match.teachers, // 教师信息
      teachClassName: match.teachClassName, // 教学班名称
      arrangeInfo: match.arrangeInfo, // 排课信息
    }))

    return {
      code: trimmedNo, // 课程代码
      lessons: lessons, // 课程信息数组
    }
  })
}
