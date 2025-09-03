const express = require('express');
const crypto = require('crypto-js');
const { v4: uuidv4 } = require('uuid');
const { APIError, formatSuccessResponse, asyncHandler } = require('../utils/errorHandler');
const router = express.Router();

// 模拟用户数据
const mockUsers = {
  'admin': {
    password: 'admin123',
    name: '管理员',
    studentId: '2021001'
  },
  'student': {
    password: 'student123', 
    name: '学生用户',
    studentId: '2021002'
  }
};

// 存储会话
const sessions = new Map();

// 获取登录页面 - 返回salt
router.get('/loginExt.action', asyncHandler(async (req, res) => {
  const salt = uuidv4().substring(0, 8);
  const sessionId = uuidv4();
  
  // 存储salt到会话
  sessions.set(sessionId, { salt, timestamp: Date.now() });
  
  // 设置cookie
  res.setHeader('Set-Cookie', [`JSESSIONID=${sessionId}; Path=/; HttpOnly`]);
  
  // 返回包含salt的HTML页面
  const loginPageHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>教务系统登录</title>
        <script>
            function encryptPassword() {
                // SHA1('${salt}-' + password)
                var password = document.getElementById('password').value;
                var encrypted = SHA1('${salt}-' + password);
                document.getElementById('password').value = encrypted;
                return true;
            }
        </script>
    </head>
    <body>
        <h2>教务系统登录</h2>
        <form method="post" action="/eams/loginExt.action" onsubmit="return encryptPassword()">
            <input type="text" name="username" placeholder="用户名" required />
            <input type="password" id="password" name="password" placeholder="密码" required />
            <input type="hidden" name="sesson_locale" value="zh_CN" />
            <button type="submit">登录</button>
        </form>
    </body>
    </html>
  `;
  
  res.send(loginPageHtml);
}));

// 处理登录请求
router.post('/loginExt.action', asyncHandler(async (req, res) => {
  const { username, password, sesson_locale } = req.body;
  const cookies = req.headers.cookie || '';
  
  // 解析JSESSIONID
  const sessionMatch = cookies.match(/JSESSIONID=([^;]+)/);
  if (!sessionMatch) {
    throw new APIError('SESSION_EXPIRED', '会话已过期，请重新登录', 400);
  }
  
  const sessionId = sessionMatch[1];
  const session = sessions.get(sessionId);
  
  if (!session) {
    throw new APIError('SESSION_EXPIRED', '会话已过期，请重新登录', 400);
  }
  
  // 检查用户是否存在
  const user = mockUsers[username];
  if (!user) {
    throw new APIError('INVALID_CREDENTIALS', '帐号或密码错误', 401);
  }
  
  // 验证密码（模拟SHA1加密验证）
  const expectedPassword = crypto.SHA1(`${session.salt}-${user.password}`).toString();
  
  // 调试信息
  console.log('登录调试信息:');
  console.log('用户名:', username);
  console.log('Salt:', session.salt);
  console.log('原始密码:', user.password);
  console.log('加密字符串:', `${session.salt}-${user.password}`);
  console.log('期望密码:', expectedPassword);
  console.log('接收密码:', password);
  console.log('密码匹配:', password === expectedPassword);
  
  if (password !== expectedPassword) {
    throw new APIError('INVALID_CREDENTIALS', '帐号或密码错误', 401);
  }
  
  // 登录成功，更新会话
  sessions.set(sessionId, {
    ...session,
    authenticated: true,
    username: username,
    user: user,
    loginTime: Date.now()
  });
  
  // 返回成功页面（包含免听申请等关键词）
  const successHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>教务系统主页</title>
    </head>
    <body>
        <h2>欢迎，${user.name}！</h2>
        <div class="menu">
            <a href="#">课程管理</a>
            <a href="#">选课系统</a>
            <a href="#">免听申请</a>
            <a href="#">成绩查询</a>
        </div>
        <p>登录成功，您可以开始使用教务系统。</p>
    </body>
    </html>
  `;
  
  res.send(successHtml);
}));

// 验证会话中间件
function requireAuth(req, res, next) {
  try {
    const cookies = req.headers.cookie || '';
    const sessionMatch = cookies.match(/JSESSIONID=([^;]+)/);
    
    if (!sessionMatch) {
      throw new APIError('AUTH_REQUIRED', '登录已过期，请重新登录', 401);
    }
    
    const sessionId = sessionMatch[1];
    const session = sessions.get(sessionId);
    
    if (!session || !session.authenticated) {
      throw new APIError('SESSION_EXPIRED', '登录已过期，请重新登录', 401);
    }
    
    // 检查会话是否过期（30分钟）
    if (Date.now() - session.loginTime > 30 * 60 * 1000) {
      sessions.delete(sessionId);
      throw new APIError('SESSION_EXPIRED', '登录已过期，请重新登录', 401);
    }
    
    req.session = session;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { router, requireAuth };