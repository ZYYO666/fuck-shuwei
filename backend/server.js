const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// 导入路由
const { router: authRoutes } = require('./routes/auth');
const courseRoutes = require('./routes/course');
const scheduleRoutes = require('./routes/schedule');

// 导入错误处理工具
const { errorHandler, notFoundHandler, formatSuccessResponse } = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 8081;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务
app.use('/static', express.static(path.join(__dirname, 'public')));

// API路由
app.use('/eams', authRoutes);
app.use('/eams', courseRoutes);
app.use('/eams', scheduleRoutes);

// 根路径
app.get('/', (req, res) => {
  res.json(formatSuccessResponse({
    message: '教务系统Mock API服务',
    version: '1.0.0',
    endpoints: {
      login: 'POST /eams/loginExt.action',
      courseData: 'GET /eams/stdElectCourse!data.action',
      electCourse: 'POST /eams/stdElectCourse!batchOperator.action',
      profile: 'GET /eams/stdElectCourse!defaultPage.action',
      scheduleData: 'GET /eams/schedule!data.action',
      scheduleProcess: 'POST /eams/schedule!process.action'
    }
  }, '服务运行正常'));
});

// 404处理
app.use(notFoundHandler);

// 统一错误处理中间件
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`教务系统Mock API服务启动成功`);
  console.log(`服务地址: http://localhost:${PORT}`);
  console.log(`API文档: http://localhost:${PORT}`);
});

module.exports = app;