# 教务系统测试API后端

这是一个模拟教务系统API的测试后端，用于开发调试前端应用。

## 功能特性

- 🔐 **用户认证系统** - 模拟登录、会话管理
- 📚 **选课系统** - 完整的选课流程和状态管理
- 📅 **智能排课** - 排课算法模拟和结果展示
- 🎯 **真实API格式** - 完全复刻原教务系统的请求/响应格式
- ⚡ **开发友好** - 支持热重载，便于调试

## 快速开始

### 安装依赖
```bash
cd backend
npm install
```

### 启动服务器
```bash
# 开发模式（支持热重载）
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:8080` 启动

## API 接口文档

### 认证相关

#### 获取登录页面
```
GET /eams/loginExt.action
```
返回包含salt的登录页面，用于密码加密。

#### 用户登录
```
POST /eams/loginExt.action
Content-Type: application/x-www-form-urlencoded

参数:
- username: 用户名
- password: 加密后的密码 (SHA1(salt + 原密码))
- sesson_locale: 语言设置 (zh_CN)
```

**测试账号:**
- 用户名: `admin`, 密码: `admin123`
- 用户名: `student`, 密码: `student123`

### 选课相关

#### 获取选课页面
```
GET /eams/stdElectCourse!defaultPage.action
```
返回选课系统主页面。

#### 获取课程数据
```
GET /eams/stdElectCourse!data.action?profileId={profileId}
```
返回可选课程的JSON数据。

#### 选课操作
```
POST /eams/stdElectCourse!batchOperator.action?{timestamp}&profileId={profileId}
Content-Type: application/x-www-form-urlencoded

参数:
- optype: true
- operator0: {courseId}:true:0
- lesson0: {courseId}
- schLessonGroup_{courseId}: undefined
```

**可能的返回结果:**
- `<html><body>选课成功</body></html>`
- `<html><body>选课失败：人数已满</body></html>`
- `<html><body>选课失败：时间冲突</body></html>`
- `<html><body>系统繁忙，请稍后重试</body></html>`

### 排课相关

#### 获取排课页面
```
GET /eams/schedule!defaultPage.action
```
返回智能排课系统页面。

#### 获取排课数据
```
GET /eams/schedule!data.action?semester={semester}&department={department}
```
返回待排课程和约束条件的JSON数据。

#### 执行排课
```
POST /eams/schedule!process.action
Content-Type: application/x-www-form-urlencoded

参数:
- algorithm: 排课算法 (genetic/greedy/backtrack)
- semester: 学期
- department: 学院
```

**返回格式:**
```json
{
  "success": true,
  "algorithm": "genetic",
  "duration": 2500,
  "conflicts": 1,
  "satisfaction": 92,
  "schedule": [
    {
      "courseId": "SC001",
      "courseName": "数据结构",
      "day": 1,
      "periods": [1, 2],
      "classroom": "教学楼A101",
      "teacher": "张教授"
    }
  ]
}
```

## 模拟特性

### 真实的网络延迟
- 登录: 无延迟
- 获取课程数据: 300-500ms
- 选课操作: 200-1200ms 随机延迟
- 排课处理: 1-4秒

### 随机失败模拟
- 选课失败率: 15% (包括系统繁忙、人数已满等)
- 排课失败率: 10%
- 时间冲突检测
- 会话过期处理

### 状态管理
- 用户选课记录持久化
- 课程人数实时更新
- 会话管理和超时处理

## 项目结构

```
backend/
├── server.js           # 主服务器文件
├── package.json        # 项目配置
├── routes/
│   ├── auth.js         # 认证路由
│   ├── course.js       # 选课路由
│   └── schedule.js     # 排课路由
└── README.md          # 说明文档
```

## 开发说明

### 添加新的API接口
1. 在对应的路由文件中添加新的路由处理器
2. 在 `server.js` 中注册路由（如果是新模块）
3. 更新本文档

### 修改模拟数据
- 课程数据: `routes/course.js` 中的 `mockCourses`
- 排课数据: `routes/schedule.js` 中的 `mockScheduleData`
- 用户数据: `routes/auth.js` 中的 `mockUsers`

### 调试技巧
- 使用 `console.log` 输出请求参数和响应
- 检查浏览器开发者工具的网络面板
- 使用 Postman 或 curl 测试API接口

## 注意事项

1. **密码加密**: 前端需要使用 SHA1 算法加密密码
2. **会话管理**: 登录后会设置 JSESSIONID cookie
3. **CORS**: 已配置允许跨域请求
4. **错误处理**: API返回的错误信息格式与原系统保持一致
5. **数据格式**: 严格按照原教务系统的数据结构设计

## 许可证

MIT License