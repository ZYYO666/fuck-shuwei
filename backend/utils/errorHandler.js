// 统一错误处理工具

// 错误码定义
const ERROR_CODES = {
  // 认证相关错误 (1000-1099)
  AUTH_REQUIRED: { code: 1001, message: '需要登录认证' },
  INVALID_CREDENTIALS: { code: 1002, message: '用户名或密码错误' },
  SESSION_EXPIRED: { code: 1003, message: '会话已过期，请重新登录' },
  PERMISSION_DENIED: { code: 1004, message: '权限不足' },
  
  // 参数验证错误 (1100-1199)
  MISSING_PARAMETER: { code: 1101, message: '缺少必要参数' },
  INVALID_PARAMETER: { code: 1102, message: '参数格式错误' },
  PARAMETER_OUT_OF_RANGE: { code: 1103, message: '参数超出有效范围' },
  
  // 选课相关错误 (1200-1299)
  COURSE_NOT_FOUND: { code: 1201, message: '课程不存在' },
  COURSE_FULL: { code: 1202, message: '课程人数已满' },
  COURSE_CLOSED: { code: 1203, message: '选课未开放或已结束' },
  TIME_CONFLICT: { code: 1204, message: '课程时间冲突' },
  ALREADY_SELECTED: { code: 1205, message: '已选择该课程' },
  CREDIT_LIMIT_EXCEEDED: { code: 1206, message: '超出学分限制' },
  PREREQUISITE_NOT_MET: { code: 1207, message: '未满足先修课程要求' },
  
  // 排课相关错误 (1300-1399)
  SCHEDULE_CONFLICT: { code: 1301, message: '排课时间冲突' },
  CLASSROOM_UNAVAILABLE: { code: 1302, message: '教室不可用' },
  TEACHER_UNAVAILABLE: { code: 1303, message: '教师时间冲突' },
  SCHEDULE_GENERATION_FAILED: { code: 1304, message: '排课生成失败' },
  
  // 系统错误 (1400-1499)
  SYSTEM_BUSY: { code: 1401, message: '系统繁忙，请稍后重试' },
  DATABASE_ERROR: { code: 1402, message: '数据库操作失败' },
  NETWORK_ERROR: { code: 1403, message: '网络连接异常' },
  INTERNAL_ERROR: { code: 1500, message: '服务器内部错误' }
};

// 自定义错误类
class APIError extends Error {
  constructor(errorCode, details = null, statusCode = 400) {
    const errorInfo = ERROR_CODES[errorCode] || ERROR_CODES.INTERNAL_ERROR;
    super(errorInfo.message);
    
    this.name = 'APIError';
    this.code = errorInfo.code;
    this.errorCode = errorCode;
    this.details = details;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

// 统一错误响应格式
function formatErrorResponse(error, req = null) {
  const response = {
    success: false,
    error: {
      code: error.code || ERROR_CODES.INTERNAL_ERROR.code,
      message: error.message || ERROR_CODES.INTERNAL_ERROR.message,
      timestamp: error.timestamp || new Date().toISOString()
    }
  };
  
  // 添加详细信息（仅在开发环境）
  if (process.env.NODE_ENV === 'development') {
    if (error.details) {
      response.error.details = error.details;
    }
    if (error.stack) {
      response.error.stack = error.stack;
    }
    if (req) {
      response.error.request = {
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query
      };
    }
  }
  
  return response;
}

// 统一成功响应格式
function formatSuccessResponse(data, message = '操作成功') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

// Express错误处理中间件
function errorHandler(err, req, res, next) {
  console.error('API Error:', {
    error: err.message,
    code: err.code,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // 如果是自定义API错误
  if (err instanceof APIError) {
    // 对于登录相关错误，返回HTML格式以兼容前端拦截器
    if (err.errorCode === 'AUTH_REQUIRED' || err.errorCode === 'SESSION_EXPIRED') {
      return res.status(err.statusCode).send('<html><body>登录已过期，请重新登录</body></html>');
    }
    
    return res.status(err.statusCode).json(formatErrorResponse(err, req));
  }
  
  // 处理其他类型的错误
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'INVALID_PARAMETER';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    errorCode = 'AUTH_REQUIRED';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    errorCode = 'PERMISSION_DENIED';
  }
  
  const apiError = new APIError(errorCode, err.message, statusCode);
  res.status(statusCode).json(formatErrorResponse(apiError, req));
}

// 404处理中间件
function notFoundHandler(req, res) {
  const error = new APIError('INVALID_PARAMETER', `路由 ${req.method} ${req.url} 不存在`, 404);
  res.status(404).json(formatErrorResponse(error, req));
}

// 异步错误包装器
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  ERROR_CODES,
  APIError,
  formatErrorResponse,
  formatSuccessResponse,
  errorHandler,
  notFoundHandler,
  asyncHandler
};