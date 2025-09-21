const express = require('express');
const { requireAuth } = require('./auth');
const { APIError, formatSuccessResponse, asyncHandler } = require('../utils/errorHandler');
const router = express.Router();

// 生成大量模拟课程数据
function generateMockCourses() {
  const courses = [];
  
  // 课程基础数据
  const departments = [
    { code: '001', name: '计算机科学与技术', prefix: 'CS' },
    { code: '002', name: '数学与应用数学', prefix: 'MATH' },
    { code: '003', name: '英语', prefix: 'ENG' },
    { code: '004', name: '物理学', prefix: 'PHY' },
    { code: '005', name: '化学', prefix: 'CHEM' },
    { code: '006', name: '经济学', prefix: 'ECON' },
    { code: '007', name: '管理学', prefix: 'MGMT' },
    { code: '008', name: '电子工程', prefix: 'EE' },
    { code: '009', name: '机械工程', prefix: 'ME' },
    { code: '010', name: '土木工程', prefix: 'CE' }
  ];
  
  const teachers = [
    '张教授', '李教授', '王教授', '赵教授', '刘教授', '陈教授', '杨教授', '黄教授',
    'Smith教授', 'Johnson教授', '孙教授', '周教授', '吴教授', '郑教授', '冯教授',
    '何教授', '高教授', '林教授', '徐教授', '胡教授', '朱教授', '郭教授', '罗教授'
  ];
  
  const courseTemplates = {
    '001': [ // 计算机科学
      { name: '计算机科学导论', credits: 3 },
      { name: '程序设计基础', credits: 4 },
      { name: 'C++程序设计', credits: 4 },
      { name: 'Java程序设计', credits: 4 },
      { name: 'Python程序设计', credits: 3 },
      { name: '数据结构与算法', credits: 4 },
      { name: '计算机组成原理', credits: 4 },
      { name: '操作系统', credits: 4 },
      { name: '计算机网络', credits: 3 },
      { name: '数据库系统', credits: 4 },
      { name: '软件工程', credits: 3 },
      { name: '人工智能', credits: 3 },
      { name: '机器学习', credits: 4 },
      { name: '深度学习', credits: 3 },
      { name: '计算机图形学', credits: 3 },
      { name: '编译原理', credits: 4 },
      { name: '算法设计与分析', credits: 3 },
      { name: '分布式系统', credits: 3 },
      { name: '网络安全', credits: 3 },
      { name: '移动应用开发', credits: 3 }
    ],
    '002': [ // 数学
      { name: '高等数学A', credits: 5 },
      { name: '高等数学B', credits: 4 },
      { name: '线性代数', credits: 3 },
      { name: '概率论与数理统计', credits: 4 },
      { name: '离散数学', credits: 3 },
      { name: '数学分析', credits: 5 },
      { name: '抽象代数', credits: 4 },
      { name: '实变函数', credits: 3 },
      { name: '复变函数', credits: 3 },
      { name: '数值分析', credits: 3 },
      { name: '运筹学', credits: 3 },
      { name: '图论', credits: 2 },
      { name: '数学建模', credits: 3 },
      { name: '微分方程', credits: 4 },
      { name: '拓扑学', credits: 3 }
    ],
    '003': [ // 英语
      { name: '大学英语I', credits: 2 },
      { name: '大学英语II', credits: 2 },
      { name: '大学英语III', credits: 2 },
      { name: '大学英语IV', credits: 2 },
      { name: '英语听说', credits: 2 },
      { name: '英语写作', credits: 2 },
      { name: '英语阅读', credits: 2 },
      { name: '商务英语', credits: 3 },
      { name: '学术英语', credits: 3 },
      { name: '英美文学', credits: 3 },
      { name: '英语语言学', credits: 3 },
      { name: '翻译理论与实践', credits: 3 }
    ],
    '004': [ // 物理
      { name: '大学物理A', credits: 4 },
      { name: '大学物理B', credits: 3 },
      { name: '理论力学', credits: 4 },
      { name: '电磁学', credits: 4 },
      { name: '热力学与统计物理', credits: 4 },
      { name: '量子力学', credits: 4 },
      { name: '固体物理', credits: 3 },
      { name: '光学', credits: 3 },
      { name: '原子物理', credits: 3 },
      { name: '核物理', credits: 3 },
      { name: '物理实验', credits: 2 }
    ],
    '005': [ // 化学
      { name: '无机化学', credits: 4 },
      { name: '有机化学', credits: 4 },
      { name: '物理化学', credits: 4 },
      { name: '分析化学', credits: 4 },
      { name: '生物化学', credits: 3 },
      { name: '化学实验', credits: 2 },
      { name: '材料化学', credits: 3 },
      { name: '环境化学', credits: 3 },
      { name: '药物化学', credits: 3 }
    ],
    '006': [ // 经济学
      { name: '微观经济学', credits: 3 },
      { name: '宏观经济学', credits: 3 },
      { name: '计量经济学', credits: 4 },
      { name: '国际经济学', credits: 3 },
      { name: '货币银行学', credits: 3 },
      { name: '财政学', credits: 3 },
      { name: '发展经济学', credits: 3 },
      { name: '产业经济学', credits: 3 },
      { name: '劳动经济学', credits: 3 },
      { name: '环境经济学', credits: 2 }
    ],
    '007': [ // 管理学
      { name: '管理学原理', credits: 3 },
      { name: '组织行为学', credits: 3 },
      { name: '人力资源管理', credits: 3 },
      { name: '市场营销', credits: 3 },
      { name: '财务管理', credits: 4 },
      { name: '战略管理', credits: 3 },
      { name: '运营管理', credits: 3 },
      { name: '项目管理', credits: 3 },
      { name: '质量管理', credits: 2 },
      { name: '创新管理', credits: 2 }
    ],
    '008': [ // 电子工程
      { name: '电路分析', credits: 4 },
      { name: '模拟电子技术', credits: 4 },
      { name: '数字电子技术', credits: 4 },
      { name: '信号与系统', credits: 4 },
      { name: '通信原理', credits: 4 },
      { name: '微波技术', credits: 3 },
      { name: '天线原理', credits: 3 },
      { name: '电磁场理论', credits: 3 },
      { name: '集成电路设计', credits: 3 }
    ],
    '009': [ // 机械工程
      { name: '工程制图', credits: 3 },
      { name: '理论力学', credits: 4 },
      { name: '材料力学', credits: 4 },
      { name: '机械原理', credits: 4 },
      { name: '机械设计', credits: 4 },
      { name: '流体力学', credits: 3 },
      { name: '热力学', credits: 3 },
      { name: '控制工程', credits: 3 },
      { name: '制造工艺', credits: 3 }
    ],
    '010': [ // 土木工程
      { name: '工程力学', credits: 4 },
      { name: '结构力学', credits: 4 },
      { name: '土力学', credits: 3 },
      { name: '混凝土结构', credits: 4 },
      { name: '钢结构', credits: 3 },
      { name: '工程测量', credits: 3 },
      { name: '建筑材料', credits: 3 },
      { name: '施工技术', credits: 3 },
      { name: '工程管理', credits: 2 }
    ]
  };
  
  let courseId = 1;
  
  // 为每个院系生成课程
  departments.forEach(dept => {
    const templates = courseTemplates[dept.code] || [];
    
    templates.forEach((template, index) => {
      // 为每门课程生成多个班级
      const classCount = Math.floor(Math.random() * 3) + 1; // 1-3个班级
      
      for (let classNum = 1; classNum <= classCount; classNum++) {
        const id = String(courseId).padStart(6, '0');
        const no = `${dept.code}.${String(index + 1)}.${classNum}`;
        const teacher = teachers[Math.floor(Math.random() * teachers.length)];
        const capacity = 30 + Math.floor(Math.random() * 50); // 30-80人
        const selected = Math.floor(Math.random() * capacity);
        
        let status = 'open';
        if (selected >= capacity) {
          status = 'full';
        } else if (Math.random() < 0.1) {
          status = 'closed';
        }
        
        // 生成课程安排
        const arrangeInfo = generateArrangeInfo();
        
        courses.push({
          id,
          code: `${dept.prefix}${String(index + 101)}`,
          no,
          name: template.name,
          teachers: teacher,
          teachClassName: `${dept.name}${classNum}班`,
          arrangeInfo,
          capacity,
          selected,
          status,
          credits: template.credits,
          department: dept.name,
          courseType: getCourseType(template.name),
          campus: getRandomCampus(),
          semester: '2024春',
          description: `${template.name}是${dept.name}专业的重要课程，旨在培养学生的专业能力。`,
          prerequisites: getPrerequisites(template.name, dept.code),
          textbooks: [`《${template.name}教程》`, `《${template.name}习题集》`],
          assessment: {
            attendance: '10%',
            homework: '20%',
            midterm: '30%',
            final: '40%'
          }
        });
        
        courseId++;
      }
    });
  });
  
  return courses;
}

// 生成课程安排信息
function generateArrangeInfo() {
  const arrangements = [];
  const sessionCount = Math.floor(Math.random() * 2) + 1; // 1-2次课
  
  for (let i = 0; i < sessionCount; i++) {
    const weekDay = Math.floor(Math.random() * 5) + 1; // 周一到周五
    const startUnit = Math.floor(Math.random() * 10) + 1; // 1-10节
    const duration = Math.floor(Math.random() * 2) + 1; // 1-2节课
    
    arrangements.push({
      weekDay,
      weekState: "011111111111111110", // 2-17周
      startUnit,
      endUnit: startUnit + duration - 1,
      classroom: `${String.fromCharCode(65 + Math.floor(Math.random() * 5))}${Math.floor(Math.random() * 500) + 100}`,
      weeks: "2-17周"
    });
  }
  
  return arrangements;
}

// 获取课程类型
function getCourseType(courseName) {
  if (courseName.includes('基础') || courseName.includes('导论')) return '基础课';
  if (courseName.includes('实验') || courseName.includes('实践')) return '实验课';
  if (courseName.includes('英语') || courseName.includes('体育')) return '公共课';
  if (courseName.includes('数学') || courseName.includes('物理')) return '基础课';
  return '专业课';
}

// 获取随机校区
function getRandomCampus() {
  const campuses = ['本部', '东校区', '西校区', '南校区'];
  return campuses[Math.floor(Math.random() * campuses.length)];
}

// 获取先修课程
function getPrerequisites(courseName, deptCode) {
  const prerequisites = [];
  
  if (courseName.includes('高级') || courseName.includes('II') || courseName.includes('2')) {
    prerequisites.push('相关基础课程');
  }
  
  if (deptCode === '001' && (courseName.includes('算法') || courseName.includes('数据结构'))) {
    prerequisites.push('程序设计基础');
  }
  
  return prerequisites;
}

// 生成课程数据
const mockCourses = {
  lessons: generateMockCourses()
};

// 用户选课状态
const userSelections = new Map();



// 课程搜索和筛选API
router.get('/stdElectCourse!search.action', requireAuth, asyncHandler(async (req, res) => {
  const {
    keyword,        // 关键词搜索（课程名称、教师、课程代码）
    teacher,        // 教师筛选
    credits,        // 学分筛选
    status,         // 状态筛选（open, full, closed）
    weekDay,        // 星期筛选
    timeSlot,       // 时间段筛选
    department,     // 院系筛选
    courseType,     // 课程类型筛选
    page = 1,       // 页码
    pageSize = 20   // 每页数量
  } = req.query;

  let filteredCourses = [...mockCourses.lessons];

  // 关键词搜索
  if (keyword) {
    const searchKeyword = keyword.toLowerCase();
    filteredCourses = filteredCourses.filter(course => 
      course.name.toLowerCase().includes(searchKeyword) ||
      course.code.toLowerCase().includes(searchKeyword) ||
      course.teachers.toLowerCase().includes(searchKeyword) ||
      course.no.toLowerCase().includes(searchKeyword)
    );
  }

  // 教师筛选
  if (teacher) {
    filteredCourses = filteredCourses.filter(course => 
      course.teachers.toLowerCase().includes(teacher.toLowerCase())
    );
  }

  // 学分筛选
  if (credits) {
    const creditValue = parseInt(credits);
    if (!isNaN(creditValue)) {
      filteredCourses = filteredCourses.filter(course => course.credits === creditValue);
    }
  }

  // 状态筛选
  if (status) {
    filteredCourses = filteredCourses.filter(course => course.status === status);
  }

  // 星期筛选
  if (weekDay) {
    const dayValue = parseInt(weekDay);
    if (!isNaN(dayValue)) {
      filteredCourses = filteredCourses.filter(course => 
        course.arrangeInfo.some(arrange => arrange.weekDay === dayValue)
      );
    }
  }

  // 时间段筛选
  if (timeSlot) {
    const slotValue = parseInt(timeSlot);
    if (!isNaN(slotValue)) {
      filteredCourses = filteredCourses.filter(course => 
        course.arrangeInfo.some(arrange => 
          arrange.startUnit <= slotValue && arrange.endUnit >= slotValue
        )
      );
    }
  }

  // 分页处理
  const pageNum = Math.max(1, parseInt(page) || 1);
  const size = Math.min(100, Math.max(1, parseInt(pageSize) || 20));
  const startIndex = (pageNum - 1) * size;
  const endIndex = startIndex + size;
  
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
  
  // 添加搜索统计信息
  const searchStats = {
    totalCourses: filteredCourses.length,
    availableCourses: filteredCourses.filter(c => c.status === 'open').length,
    fullCourses: filteredCourses.filter(c => c.status === 'full').length,
    averageCredits: filteredCourses.length > 0 ? 
      (filteredCourses.reduce((sum, c) => sum + c.credits, 0) / filteredCourses.length).toFixed(1) : 0
  };

  res.json(formatSuccessResponse({
    courses: paginatedCourses,
    pagination: {
      currentPage: pageNum,
      pageSize: size,
      totalItems: filteredCourses.length,
      totalPages: Math.ceil(filteredCourses.length / size),
      hasNext: endIndex < filteredCourses.length,
      hasPrev: pageNum > 1
    },
    searchStats,
    filters: {
      keyword: keyword || null,
      teacher: teacher || null,
      credits: credits || null,
      status: status || null,
      weekDay: weekDay || null,
      timeSlot: timeSlot || null
    }
  }, '课程搜索成功'));
}));

// 获取课程筛选选项API
router.get('/stdElectCourse!filterOptions.action', requireAuth, asyncHandler(async (req, res) => {
  // 从现有课程数据中提取筛选选项
  const teachers = [...new Set(mockCourses.lessons.map(course => course.teachers))].sort();
  const credits = [...new Set(mockCourses.lessons.map(course => course.credits))].sort((a, b) => a - b);
  const statuses = [...new Set(mockCourses.lessons.map(course => course.status))];
  const weekDays = [...new Set(
    mockCourses.lessons.flatMap(course => 
      course.arrangeInfo.map(arrange => arrange.weekDay)
    )
  )].sort((a, b) => a - b);
  
  const timeSlots = [];
  for (let i = 1; i <= 12; i++) {
    timeSlots.push({
      value: i,
      label: `第${i}节`,
      timeRange: getTimeRange(i)
    });
  }

  res.json(formatSuccessResponse({
    teachers: teachers.map(teacher => ({ value: teacher, label: teacher })),
    credits: credits.map(credit => ({ value: credit, label: `${credit}学分` })),
    statuses: statuses.map(status => ({ 
      value: status, 
      label: status === 'open' ? '可选' : status === 'full' ? '已满' : '关闭' 
    })),
    weekDays: weekDays.map(day => ({ 
      value: day, 
      label: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'][day] 
    })),
    timeSlots
  }, '获取筛选选项成功'));
}));

// 时间段转换函数
function getTimeRange(slot) {
  const timeMap = {
    1: '08:00-08:45', 2: '08:55-09:40', 3: '10:00-10:45', 4: '10:55-11:40',
    5: '14:00-14:45', 6: '14:55-15:40', 7: '16:00-16:45', 8: '16:55-17:40',
    9: '19:00-19:45', 10: '19:55-20:40', 11: '20:50-21:35', 12: '21:45-22:30'
  };
  return timeMap[slot] || '未知时间';
}

// 获取课程详情API
router.get('/stdElectCourse!detail.action', requireAuth, asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.query;
  
  if (!courseId && !lessonId) {
    throw new APIError('INVALID_PARAMS', '课程ID或课程编号不能为空');
  }
  
  // 查找课程
  const course = mockCourses.lessons.find(lesson => 
    lesson.id === courseId || lesson.no === lessonId
  );
  
  if (!course) {
    throw new APIError('COURSE_NOT_FOUND', '课程不存在');
  }
  
  // 获取用户选课状态
  const userId = req.session.userId;
  const userCourses = userSelections.get(userId) || [];
  const isSelected = userCourses.some(selected => selected.id === course.id);
  
  // 构建详细信息
  const courseDetail = {
    ...course,
    isSelected,
    selectionInfo: {
      currentCount: course.selectedCount || 0,
      maxCount: course.maxStudents || 100,
      waitingCount: course.waitingCount || 0,
      selectionRate: course.maxStudents ? 
        ((course.selectedCount || 0) / course.maxStudents * 100).toFixed(1) + '%' : '0%'
    },
    timeInfo: course.arrangeInfo.map(arrange => ({
      ...arrange,
      weekDayName: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'][arrange.weekDay],
      timeRange: `${getTimeRange(arrange.startUnit)} - ${getTimeRange(arrange.endUnit)}`,
      classroom: arrange.classroom || '待定',
      weeks: arrange.weeks || '1-16周'
    })),
    prerequisites: course.prerequisites || [],
    description: course.description || '暂无课程描述',
    syllabus: course.syllabus || '暂无教学大纲',
    assessment: course.assessment || {
      attendance: '10%',
      homework: '20%',
      midterm: '30%',
      final: '40%'
    },
    textbooks: course.textbooks || [],
    references: course.references || []
  };
  
  res.json(formatSuccessResponse(courseDetail, '获取课程详情成功'));
}));



// 获取课程数据
router.get('/stdElectCourse!data.action', requireAuth, asyncHandler(async (req, res) => {
  const { profileId } = req.query;
  
  if (!profileId) {
    throw new APIError('MISSING_PARAMETER', '缺少profileId参数');
  }
  
  // 模拟延迟
  setTimeout(() => {
    // 返回JavaScript代码格式，符合getLessonJSONs函数的期望
    const jsCode = `var lessonJSONs = ${JSON.stringify(mockCourses.lessons, null, 2)};`;
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(jsCode);
  }, 500);
}));

// 获取选课轮次页面 - 这是getProfileId.js访问的URL
router.get('/stdElectCourse!innerIndex.action', requireAuth, asyncHandler(async (req, res) => {
  const pageHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>学生选课系统 - 轮次选择</title>
    </head>
    <body>
        <h1>学生选课系统</h1>
        
        <!-- 选课轮次1 -->
        <div id="electIndexNotice1">
            <h2>2024年春季学期第一轮选课</h2>
            <div>
                选课轮次 1<br>
                选课开放时间: 2024-02-20 09:00:00<br>
                退课开放时间: 2024-02-25 18:00:00
            </div>
            <a href="/eams/stdElectCourse!defaultPage.action?electionProfile.id=12345">进入选课</a>
            <div>注意事项</div>
            <div>请在规定时间内完成选课，逾期系统将自动关闭。</div>
        </div>
        
        <!-- 选课轮次2 -->
        <div id="electIndexNotice2">
            <h2>2024年春季学期第二轮选课</h2>
            <div>
                选课轮次 2<br>
                选课开放时间: 2024-03-01 09:00:00<br>
                退课开放时间: 2024-03-05 18:00:00
            </div>
            <a href="/eams/stdElectCourse!defaultPage.action?electionProfile.id=12346">进入选课</a>
            <div>注意事项</div>
            <div>第二轮选课主要针对补选和调整，请合理安排。</div>
        </div>
        
        <!-- 选课轮次3 -->
        <div id="electIndexNotice3">
            <h2>2024年春季学期第三轮选课</h2>
            <div>
                选课轮次 3<br>
                选课开放时间: 2024-03-10 09:00:00<br>
                退课开放时间: 2024-03-15 18:00:00
            </div>
            <a href="/eams/stdElectCourse!defaultPage.action?electionProfile.id=12347">进入选课</a>
            <div>注意事项</div>
            <div>最后一轮选课，请确认所选课程无误。</div>
        </div>
    </body>
    </html>
  `;
  
  res.send(pageHtml);
}));

// 获取选课页面
router.get('/stdElectCourse!defaultPage.action', requireAuth, asyncHandler(async (req, res) => {
  const profileId = Date.now().toString(); // 生成profileId
  
  const pageHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>学生选课系统</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .course-list { margin-top: 20px; }
            .course-item { border: 1px solid #ddd; padding: 10px; margin: 5px 0; }
            .course-name { font-weight: bold; color: #333; }
            .course-info { color: #666; font-size: 14px; }
            .select-btn { background: #007bff; color: white; border: none; padding: 5px 10px; cursor: pointer; }
            .select-btn:disabled { background: #ccc; }
        </style>
    </head>
    <body>
        <h2>学生选课系统</h2>
        <p>当前用户: ${req.session.user ? req.session.user.name : 'unknown'} (${req.session.user ? req.session.user.studentId : 'unknown'})</p>
        <p>ProfileID: ${profileId}</p>
        
        <div class="course-list">
            <h3>可选课程列表</h3>
            ${mockCourses.lessons.map(course => `
                <div class="course-item">
                    <div class="course-name">${course.name} (${course.code})</div>
                    <div class="course-info">
                        教师: ${course.teachers} | 
                        时间: ${course.arrangeInfo} | 
                        人数: ${course.selected}/${course.capacity} |
                        学分: ${course.credits}
                    </div>
                    <button class="select-btn" ${course.status === 'full' ? 'disabled' : ''} 
                            onclick="selectCourse('${course.id}', '${profileId}')">
                        ${course.status === 'full' ? '已满' : '选课'}
                    </button>
                </div>
            `).join('')}
        </div>
        
        <script>
            function selectCourse(courseId, profileId) {
                const timestamp = Date.now();
                const url = \`/eams/stdElectCourse!batchOperator.action?\${timestamp}&profileId=\${profileId}\`;
                const params = \`optype=true&operator0=\${courseId}%3Atrue%3A0&lesson0=\${courseId}&schLessonGroup_\${courseId}=undefined\`;
                
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: params
                })
                .then(response => response.text())
                .then(data => {
                    alert('选课结果: ' + data);
                    location.reload();
                })
                .catch(error => {
                    alert('选课失败: ' + error);
                });
            }
        </script>
    </body>
    </html>
  `;
  
  res.send(pageHtml);
}));

// 选课操作
router.post('/stdElectCourse!batchOperator.action', requireAuth, asyncHandler(async (req, res) => {
  const { profileId } = req.query;
  const body = req.body;
  
  if (!profileId) {
    throw new APIError('MISSING_PARAMETER', '缺少profileId参数');
  }
  
  // 解析选课参数 - 处理URL编码的表单数据
  let courseId;
  if (typeof body === 'string') {
    // 如果body是字符串，使用正则表达式解析
    const lessonMatch = body.match(/lesson0=([^&]+)/);
    if (!lessonMatch) {
      throw new APIError('INVALID_PARAMETER', '选课参数格式错误');
    }
    courseId = lessonMatch[1];
  } else if (typeof body === 'object' && body.lesson0) {
    // 如果body是对象，直接获取属性
    courseId = body.lesson0;
  } else {
    throw new APIError('INVALID_PARAMETER', '选课参数格式错误');
  }
  const course = mockCourses.lessons.find(c => c.id === courseId);
  
  if (!course) {
    return res.send('<html><body>课程不存在</body></html>');
  }
  
  // 获取用户选课记录
  const userId = req.session.username;
  if (!userSelections.has(userId)) {
    userSelections.set(userId, new Set());
  }
  const userCourses = userSelections.get(userId);
  
  // 模拟各种选课结果
  const random = Math.random();
  
  // 检查是否已选过
  if (userCourses.has(courseId)) {
    return res.send('<html><body>您已经选过这门课程</body></html>');
  }
  
  // 检查人数是否已满
  if (course.selected >= course.capacity) {
    return res.send('<html><body>选课失败：人数已满</body></html>');
  }
  
  // 检查时间冲突（简单模拟）
  for (const selectedCourseId of userCourses) {
    const selectedCourse = mockCourses.lessons.find(c => c.id === selectedCourseId);
    if (selectedCourse && hasTimeConflict(course.arrangeInfo, selectedCourse.arrangeInfo)) {
      return res.send('<html><body>选课失败：时间冲突</body></html>');
    }
  }
  
  // 100% 选课成功保证！
  setTimeout(() => {
    // 无条件选课成功
    userCourses.add(courseId);
    if (course) {
      course.selected += 1;
    }
    
    // 永远返回成功
    res.send('<html><body>选课成功</body></html>');
  }, 50); // 固定50ms快速响应
}));

// 简单的时间冲突检测
function hasTimeConflict(time1, time2) {
  // 简化的冲突检测逻辑
  const days1 = time1.match(/周[一二三四五六日]/g) || [];
  const days2 = time2.match(/周[一二三四五六日]/g) || [];
  
  for (const day1 of days1) {
    if (days2.includes(day1)) {
      return true; // 简单认为同一天就冲突
    }
  }
  return false;
}

module.exports = router;