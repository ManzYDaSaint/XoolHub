// File-based Session Management for Multi-School Support
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// File-based session store configuration
const fileStore = new FileStore({
  path: './sessions',
  ttl: 86400, // 24 hours
  retries: 5,
  logFn: function() {} // Disable logging
});

// Session configuration for multi-school support
const sessionConfig = {
  store: fileStore,
  secret: process.env.SESSION_SECRET || 'xoolhub-session-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  rolling: true, // Reset expiration on activity
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS attacks
    maxAge: 86400000, // 24 hours in milliseconds
    sameSite: 'lax' // CSRF protection
  },
  name: 'xoolhub.sid', // Custom session name
  genid: function(req) {
    // Generate session ID with school context
    const schoolId = req.body?.school_id || req.query?.school_id || 'global';
    return `sess_${schoolId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Session middleware
const sessionMiddleware = session(sessionConfig);

// Session validation middleware
const validateSession = (req, res, next) => {
  if (!req.session) {
    return res.status(401).json({
      status: 'error',
      message: 'Session not found',
      code: 'SESSION_NOT_FOUND'
    });
  }
  
  if (!req.session.user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not authenticated',
      code: 'USER_NOT_AUTHENTICATED'
    });
  }
  
  next();
};

// School session validation middleware
const validateSchoolSession = (req, res, next) => {
  if (!req.session) {
    return res.status(401).json({
      status: 'error',
      message: 'Session not found',
      code: 'SESSION_NOT_FOUND'
    });
  }
  
  if (!req.session.user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not authenticated',
      code: 'USER_NOT_AUTHENTICATED'
    });
  }
  
  if (!req.session.user.school_id) {
    return res.status(403).json({
      status: 'error',
      message: 'School access not authorized',
      code: 'SCHOOL_ACCESS_DENIED'
    });
  }
  
  next();
};

// Role-based session validation
const validateRoleSession = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not authenticated',
        code: 'USER_NOT_AUTHENTICATED'
      });
    }
    
    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    
    next();
  };
};

// Session cleanup middleware
const cleanupSession = (req, res, next) => {
  // Clean up session data on logout
  if (req.path === '/logout' || req.path === '/api/logout') {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
      } else {
        console.log('Session destroyed successfully');
      }
    });
  }
  
  next();
};

// Session statistics middleware
const sessionStatsMiddleware = async (req, res, next) => {
  try {
    // Get session statistics from Redis
    const sessionKeys = await redisClient.keys('xoolhub:session:*');
    const activeSessions = sessionKeys.length;
    
    // Get school-specific session counts
    const schoolSessions = {};
    for (const key of sessionKeys) {
      const sessionData = await redisClient.get(key);
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          if (parsed.user && parsed.user.school_id) {
            const schoolId = parsed.user.school_id;
            schoolSessions[schoolId] = (schoolSessions[schoolId] || 0) + 1;
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    }
    
    req.sessionStats = {
      totalSessions: activeSessions,
      schoolSessions: schoolSessions,
      timestamp: new Date().toISOString()
    };
    
    next();
  } catch (error) {
    console.error('Session stats middleware error:', error.message);
    req.sessionStats = {
      totalSessions: 0,
      schoolSessions: {},
      timestamp: new Date().toISOString(),
      error: error.message
    };
    next();
  }
};

// Session health check middleware
const sessionHealthCheck = async (req, res, next) => {
  try {
    const isHealthy = await redisClient.ping();
    if (isHealthy !== 'PONG') {
      return res.status(503).json({
        status: 'error',
        message: 'Session store unavailable',
        code: 'SESSION_STORE_UNAVAILABLE'
      });
    }
    
    next();
  } catch (error) {
    console.error('Session health check failed:', error.message);
    return res.status(503).json({
      status: 'error',
      message: 'Session store connection failed',
      code: 'SESSION_STORE_CONNECTION_FAILED'
    });
  }
};

module.exports = {
  sessionMiddleware,
  validateSession,
  validateSchoolSession,
  validateRoleSession,
  cleanupSession,
  sessionStatsMiddleware,
  sessionHealthCheck,
  fileStore: fileStore
};
