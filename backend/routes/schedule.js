const express = require('express');
const { requireAuth } = require('./auth');
const router = express.Router();

// 模拟排课数据
const mockScheduleData = {
  "courses": [
    {
      "id": "SC001",
      "name": "数据结构",
      "code": "CS201",
      "credits": 4,
      "type": "必修",
      "department": "计算机学院",
      "teachers": ["张教授", "李副教授"],
      "capacity": 60,
      "timeSlots": [
        { "day": 1, "period": [1, 2], "weeks": [1, 16] },
        { "day": 3, "period": [3, 4], "weeks": [1, 16] }
      ],
      "classrooms": ["教学楼A101", "教学楼A102"],
      "priority": "high"
    },
    {
      "id": "SC002",
      "name": "操作系统",
      "code": "CS202",
      "credits": 3,
      "type": "必修",
      "department": "计算机学院",
      "teachers": ["王教授"],
      "capacity": 50,
      "timeSlots": [
        { "day": 2, "period": [1, 2], "weeks": [1, 16] },
        { "day": 4, "period": [3, 4], "weeks": [1, 16] }
      ],
      "classrooms": ["教学楼B201"],
      "priority": "high"
    },
    {
      "id": "SC003",
      "name": "软件工程",
      "code": "CS301",
      "credits": 3,
      "type": "专业选修",
      "department": "计算机学院",
      "teachers": ["赵教授", "钱副教授"],
      "capacity": 40,
      "timeSlots": [
        { "day": 1, "period": [5, 6], "weeks": [1, 16] },
        { "day": 5, "period": [1, 2], "weeks": [1, 16] }
      ],
      "classrooms": ["教学楼C301"],
      "priority": "medium"
    },
    {
      "id": "SC004",
      "name": "人工智能导论",
      "code": "CS401",
      "credits": 2,
      "type": "公选",
      "department": "计算机学院",
      "teachers": ["孙教授"],
      "capacity": 80,
      "timeSlots": [
        { "day": 3, "period": [7, 8], "weeks": [1, 16] }
      ],
      "classrooms": ["大教室D101"],
      "priority": "low"
    },
    {
      "id": "SC005",
      "name": "数据库系统",
      "code": "CS203",
      "credits": 4,
      "type": "必修",
      "department": "计算机学院",
      "teachers": ["周教授"],
      "capacity": 55,
      "timeSlots": [
        { "day": 2, "period": [5, 6], "weeks": [1, 16] },
        { "day": 4, "period": [1, 2], "weeks": [1, 16] }
      ],
      "classrooms": ["教学楼A201"],
      "priority": "high"
    }
  ],
  "constraints": {
    "maxCoursesPerDay": 4,
    "minBreakBetweenCourses": 1,
    "preferredTimeSlots": [1, 2, 3, 4, 5, 6],
    "avoidTimeSlots": [7, 8, 9, 10]
  },
  "resources": {
    "classrooms": [
      { "id": "A101", "capacity": 60, "type": "普通教室" },
      { "id": "A102", "capacity": 60, "type": "普通教室" },
      { "id": "A201", "capacity": 55, "type": "普通教室" },
      { "id": "B201", "capacity": 50, "type": "多媒体教室" },
      { "id": "C301", "capacity": 40, "type": "实验室" },
      { "id": "D101", "capacity": 100, "type": "大教室" }
    ],
    "teachers": [
      { "id": "T001", "name": "张教授", "maxHours": 12 },
      { "id": "T002", "name": "李副教授", "maxHours": 10 },
      { "id": "T003", "name": "王教授", "maxHours": 14 },
      { "id": "T004", "name": "赵教授", "maxHours": 8 },
      { "id": "T005", "name": "钱副教授", "maxHours": 6 },
      { "id": "T006", "name": "孙教授", "maxHours": 4 },
      { "id": "T007", "name": "周教授", "maxHours": 10 }
    ]
  }
};

// 获取排课数据
router.get('/schedule!data.action', requireAuth, (req, res) => {
  const { semester, department } = req.query;
  
  // 模拟延迟
  setTimeout(() => {
    const responseData = {
      ...mockScheduleData,
      semester: semester || '2024-1',
      department: department || '计算机学院',
      timestamp: Date.now(),
      user: req.session.username
    };
    
    res.json(responseData);
  }, 300);
});

// 获取排课页面
router.get('/schedule!defaultPage.action', requireAuth, (req, res) => {
  const pageHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>智能排课系统</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .schedule-container { max-width: 1200px; margin: 0 auto; }
            .course-list { margin: 20px 0; }
            .course-item { 
                border: 1px solid #ddd; 
                padding: 15px; 
                margin: 10px 0; 
                border-radius: 5px;
                background: #f9f9f9;
            }
            .course-header { 
                font-weight: bold; 
                font-size: 16px; 
                color: #333; 
                margin-bottom: 8px;
            }
            .course-details { 
                color: #666; 
                font-size: 14px; 
                line-height: 1.4;
            }
            .priority-high { border-left: 4px solid #ff4444; }
            .priority-medium { border-left: 4px solid #ffaa00; }
            .priority-low { border-left: 4px solid #44ff44; }
            .schedule-btn { 
                background: #28a745; 
                color: white; 
                border: none; 
                padding: 10px 20px; 
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer; 
                margin: 10px 5px;
            }
            .schedule-btn:hover { background: #218838; }
            .schedule-btn:disabled { background: #ccc; cursor: not-allowed; }
            .controls { 
                background: #f8f9fa; 
                padding: 20px; 
                border-radius: 5px; 
                margin-bottom: 20px;
            }
            .control-group { 
                margin: 10px 0; 
                display: inline-block; 
                margin-right: 20px;
            }
            .control-group label { 
                display: inline-block; 
                width: 100px; 
                font-weight: bold;
            }
            .result-area { 
                margin-top: 20px; 
                padding: 15px; 
                background: #e9ecef; 
                border-radius: 5px; 
                min-height: 100px;
            }
        </style>
    </head>
    <body>
        <div class="schedule-container">
            <h2>智能排课系统</h2>
            <p>当前用户: ${req.session.user.name} (${req.session.user.studentId})</p>
            
            <div class="controls">
                <h3>排课参数设置</h3>
                <div class="control-group">
                    <label>学期:</label>
                    <select id="semester">
                        <option value="2024-1">2024年春季学期</option>
                        <option value="2024-2">2024年秋季学期</option>
                    </select>
                </div>
                <div class="control-group">
                    <label>学院:</label>
                    <select id="department">
                        <option value="计算机学院">计算机学院</option>
                        <option value="数学学院">数学学院</option>
                        <option value="物理学院">物理学院</option>
                    </select>
                </div>
                <div class="control-group">
                    <label>算法:</label>
                    <select id="algorithm">
                        <option value="genetic">遗传算法</option>
                        <option value="greedy">贪心算法</option>
                        <option value="backtrack">回溯算法</option>
                    </select>
                </div>
                <br>
                <button class="schedule-btn" onclick="startScheduling()">开始排课</button>
                <button class="schedule-btn" onclick="loadCourseData()">加载课程数据</button>
                <button class="schedule-btn" onclick="exportSchedule()">导出排课表</button>
            </div>
            
            <div class="course-list">
                <h3>待排课程列表</h3>
                <div id="courseList">点击"加载课程数据"获取课程信息</div>
            </div>
            
            <div class="result-area">
                <h3>排课结果</h3>
                <div id="scheduleResult">排课结果将在这里显示...</div>
            </div>
        </div>
        
        <script>
            let courseData = null;
            let isScheduling = false;
            
            function loadCourseData() {
                const semester = document.getElementById('semester').value;
                const department = document.getElementById('department').value;
                
                fetch(\`/eams/schedule!data.action?semester=\${semester}&department=\${department}\`)
                .then(response => response.json())
                .then(data => {
                    courseData = data;
                    displayCourses(data.courses);
                })
                .catch(error => {
                    alert('加载课程数据失败: ' + error);
                });
            }
            
            function displayCourses(courses) {
                const courseList = document.getElementById('courseList');
                courseList.innerHTML = courses.map(course => \`
                    <div class="course-item priority-\${course.priority}">
                        <div class="course-header">\${course.name} (\${course.code})</div>
                        <div class="course-details">
                            <strong>学分:</strong> \${course.credits} | 
                            <strong>类型:</strong> \${course.type} | 
                            <strong>容量:</strong> \${course.capacity}人<br>
                            <strong>教师:</strong> \${course.teachers.join(', ')}<br>
                            <strong>教室:</strong> \${course.classrooms.join(', ')}<br>
                            <strong>优先级:</strong> \${course.priority}
                        </div>
                    </div>
                \`).join('');
            }
            
            function startScheduling() {
                if (!courseData) {
                    alert('请先加载课程数据');
                    return;
                }
                
                if (isScheduling) {
                    alert('排课正在进行中，请稍候...');
                    return;
                }
                
                isScheduling = true;
                const algorithm = document.getElementById('algorithm').value;
                const resultDiv = document.getElementById('scheduleResult');
                
                resultDiv.innerHTML = '正在进行智能排课，请稍候...';
                
                const params = \`algorithm=\${algorithm}&semester=\${courseData.semester}&department=\${courseData.department}\`;
                
                fetch('/eams/schedule!process.action', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: params
                })
                .then(response => response.json())
                .then(data => {
                    isScheduling = false;
                    displayScheduleResult(data);
                })
                .catch(error => {
                    isScheduling = false;
                    resultDiv.innerHTML = '排课失败: ' + error;
                });
            }
            
            function displayScheduleResult(result) {
                const resultDiv = document.getElementById('scheduleResult');
                
                if (result.success) {
                    resultDiv.innerHTML = \`
                        <h4>排课成功！</h4>
                        <p><strong>算法:</strong> \${result.algorithm}</p>
                        <p><strong>耗时:</strong> \${result.duration}ms</p>
                        <p><strong>冲突数:</strong> \${result.conflicts}</p>
                        <p><strong>满意度:</strong> \${result.satisfaction}%</p>
                        <h5>排课详情:</h5>
                        <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px;">
                            \${result.schedule.map(item => \`
                                <div style="margin: 5px 0; padding: 5px; background: white; border-radius: 3px;">
                                    <strong>\${item.courseName}</strong> - 
                                    周\${['', '一', '二', '三', '四', '五', '六', '日'][item.day]} 
                                    第\${item.periods.join('-')}节 
                                    (\${item.classroom})
                                </div>
                            \`).join('')}
                        </div>
                    \`;
                } else {
                    resultDiv.innerHTML = \`
                        <h4>排课失败</h4>
                        <p><strong>错误:</strong> \${result.error}</p>
                        <p><strong>建议:</strong> \${result.suggestion || '请检查课程设置和约束条件'}</p>
                    \`;
                }
            }
            
            function exportSchedule() {
                alert('导出功能开发中...');
            }
            
            // 页面加载时自动加载数据
            window.onload = function() {
                loadCourseData();
            };
        </script>
    </body>
    </html>
  `;
  
  res.send(pageHtml);
});

// 排课处理
router.post('/schedule!process.action', requireAuth, (req, res) => {
  const { algorithm, semester, department } = req.body;
  
  // 模拟排课算法处理时间
  const processingTime = Math.random() * 3000 + 1000; // 1-4秒
  
  setTimeout(() => {
    const random = Math.random();
    
    if (random < 0.1) {
      // 10% 概率失败
      res.json({
        success: false,
        error: '排课算法收敛失败',
        suggestion: '建议调整课程时间约束或增加可用教室'
      });
    } else {
      // 生成模拟排课结果
      const schedule = generateMockSchedule();
      
      res.json({
        success: true,
        algorithm: algorithm || 'genetic',
        duration: Math.round(processingTime),
        conflicts: Math.floor(Math.random() * 3),
        satisfaction: Math.round(85 + Math.random() * 10),
        schedule: schedule,
        timestamp: Date.now()
      });
    }
  }, processingTime);
});

// 生成模拟排课结果
function generateMockSchedule() {
  const courses = mockScheduleData.courses;
  const schedule = [];
  
  courses.forEach(course => {
    course.timeSlots.forEach(slot => {
      schedule.push({
        courseId: course.id,
        courseName: course.name,
        courseCode: course.code,
        day: slot.day,
        periods: slot.period,
        classroom: course.classrooms[0],
        teacher: course.teachers[0],
        weeks: slot.weeks
      });
    });
  });
  
  return schedule;
}

module.exports = router;