
const { getInstance } = require('./request')

const fs = require('fs')

 function getLessonsFromCode(lessonJSONs, userLessonCode) {
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

 function getLessonsFromNo(lessonJSONs, userLessonNo) {
  return userLessonNo.map((no) => {


    const matches = lessonJSONs.filter((l) => l.no === no)

    if (matches.length === 0) {
      throw new Error('无开课信息' + no)
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

 function getLessonJSONs(lessonDatas) {
  try {
    return new Function(`${lessonDatas} return lessonJSONs`)()
  } catch (error) {
    throw new Error('未找到有效的 lessonJSONs 对象')
  }
}

function getFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    throw err
  }
}


function mergeArrays(arr1, arr2) {
  if (arr1.length !== arr2.length || arr1[0]?.length !== arr2[0]?.length) {
    throw new Error('数组结构不相同')
  }
  return arr1.map(
    (row, i) => row.map((cell, j) => (cell || arr2[i][j] ? 1 : 0)),
  )
}


function createEmptySchedule(yixuanData) {
  const weeks = 16
  const slots = 91
  let schedule = []
  for (let w = 0; w < weeks; w++) {
    schedule.push(new Array(slots).fill(0))
  }
  // 如果启用已选课表，先填充
  if (yixuanData) {
    for (const item of yixuanData) {
      if (item.formatDatas) {
        for (const format of item.formatDatas) {
          schedule = mergeArrays(schedule, format)
        }
      }
    }
  }
  return schedule
}


function isConflict(schedule, lessonFormat) {
  for (let w = 0; w < 16; w++) {
    for (let s = 0; s < 91; s++) {
      if (lessonFormat[w][s] && schedule[w][s]) {
        return true
      }
    }
  }
  return false
}


function removeArrays(schedule, lessonFormat) {
  for (let w = 0; w < 16; w++) {
    for (let s = 0; s < 91; s++) {
      if (lessonFormat[w][s]) {
        schedule[w][s] = 0
      }
    }
  }
  return schedule
}
async function visit(href, cookie) {
  const axios = getInstance()
  try {
    const response = await axios.get(href, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Cookie: cookie,
      },
      validateStatus: (status) => true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

function zyyo_delay(zyyo_ms) {
  return new Promise((resolve) => setTimeout(resolve, zyyo_ms))
}

async function getElectedLessonNos(config) {
  const profileId = config.profileId
  if (!profileId) {
    throw new Error('profileId 不能为空')
  }
  if (!config.cookie) {
    throw new Error('cookie 不能为空')
  }

  const page = await visit(
    `/eams/stdElectCourse!defaultPage.action?electionProfile.id=${profileId}`,
    config.cookie,
  )
  if (!page) {
    return { ids: [], nos: [], missingIds: [] }
  }

  const ids = []
  const re = /electedIds\["l(\d+)"\]\s*=\s*true/g
  let m = null
  while ((m = re.exec(page)) !== null) {
    if (m[1]) ids.push(m[1])
  }

  const uniqueIds = Array.from(new Set(ids))
  const byId = new Map()
  if (Array.isArray(config.lessonJSONs)) {
    for (const l of config.lessonJSONs) {
      const raw = l && l.id !== undefined && l.id !== null ? String(l.id) : ''
      if (!raw) continue
      const normalized = raw.replace(/^l/, '')
      if (!byId.has(normalized)) byId.set(normalized, l)
    }
  }

  const nos = []
  const missingIds = []
  for (const id of uniqueIds) {
    const lesson = byId.get(String(id))
    if (!lesson) {
      missingIds.push(id)
      continue
    }
    if (lesson.no) nos.push(String(lesson.no))
  }

  return { ids: uniqueIds, nos: Array.from(new Set(nos)), missingIds }
}

module.exports = {
  visit,
  zyyo_delay,
  mergeArrays,
  createEmptySchedule,
  isConflict,
  removeArrays,
  getFile,
  getLessonJSONs,
  getLessonsFromNo,
  getLessonsFromCode,
  getElectedLessonNos,
}
