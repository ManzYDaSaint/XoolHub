const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

// Advanced rate limiting with Redis-like storage
class AdvancedRateLimiter {
  constructor() {
    this.store = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Clean every minute
  }

  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.store.entries()) {
      if (now > data.expiresAt) {
        this.store.delete(key);
      }
    }
  }

  isAllowed(identifier, maxAttempts = 3, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const key = `rate_limit:${identifier}`;
    const data = this.store.get(key) || { count: 0, firstAttempt: now, expiresAt: now + windowMs };
    
    if (now > data.expiresAt) {
      data.count = 0;
      data.firstAttempt = now;
      data.expiresAt = now + windowMs;
    }
    
    if (data.count >= maxAttempts) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: data.expiresAt,
        retryAfter: Math.ceil((data.expiresAt - now) / 1000)
      };
    }
    
    data.count++;
    this.store.set(key, data);
    
    return {
      allowed: true,
      remaining: maxAttempts - data.count,
      resetTime: data.expiresAt,
      retryAfter: 0
    };
  }
}

const rateLimiter = new AdvancedRateLimiter();

// Security headers middleware
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
});

// IP-based rate limiting
const ipRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please try again later.",
      retryAfter: 900
    });
  }
});

// Email-based rate limiting
const emailRateLimit = (req, res, next) => {
  const email = req.body.email;
  const ip = req.ip || req.connection.remoteAddress;
  const identifier = `${email}:${ip}`;
  
  const result = rateLimiter.isAllowed(identifier, 3, 15 * 60 * 1000);
  
  if (!result.allowed) {
    return res.status(429).json({
      success: false,
      message: "Too many password reset requests. Please try again later.",
      retryAfter: result.retryAfter
    });
  }
  
  res.set({
    'X-RateLimit-Limit': '3',
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString()
  });
  
  next();
};

// Request validation middleware
const validatePasswordResetRequest = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

const validatePasswordReset = [
  body('token')
    .isLength({ min: 64, max: 64 })
    .matches(/^[a-f0-9]+$/i)
    .withMessage('Invalid reset token format'),
  body('password')
    .isLength({ min: 8, max: 128 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Password validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Security monitoring middleware
const securityMonitoring = (req, res, next) => {
  const startTime = Date.now();
  const originalSend = res.send;
  
  res.send = function(data) {
    const duration = Date.now() - startTime;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      statusCode: res.statusCode,
      duration: duration,
      bodySize: data ? data.length : 0,
      headers: {
        'content-type': res.get('Content-Type'),
        'x-ratelimit-remaining': res.get('X-RateLimit-Remaining')
      }
    };
    
    // Log suspicious activity
    if (duration > 5000 || res.statusCode >= 400) {
      console.warn('Suspicious activity detected:', logData);
    }
    
    originalSend.call(this, data);
  };
  
  next();
};

// Request sanitization
const sanitizeRequest = (req, res, next) => {
  // Remove potentially dangerous characters
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/[<>\"'%;()&+]/g, '');
  };
  
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }
  
  next();
};

// CSRF protection
const csrfProtection = (req, res, next) => {
  const token = req.headers['x-csrf-token'];
  const sessionToken = req.session?.csrfToken;
  
  if (req.method === 'POST' && (!token || token !== sessionToken)) {
    return res.status(403).json({
      success: false,
      message: 'CSRF token mismatch'
    });
  }
  
  next();
};

// IP whitelist/blacklist
const ipFilter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const blacklistedIPs = process.env.BLACKLISTED_IPS ? process.env.BLACKLISTED_IPS.split(',') : [];
  const whitelistedIPs = process.env.WHITELISTED_IPS ? process.env.WHITELISTED_IPS.split(',') : [];
  
  if (blacklistedIPs.includes(ip)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  if (whitelistedIPs.length > 0 && !whitelistedIPs.includes(ip)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  next();
};

// Request size limiting
const requestSizeLimit = (req, res, next) => {
  const contentLength = parseInt(req.get('Content-Length') || '0');
  const maxSize = 1024 * 1024; // 1MB
  
  if (contentLength > maxSize) {
    return res.status(413).json({
      success: false,
      message: 'Request too large'
    });
  }
  
  next();
};

// Timeout middleware
const requestTimeout = (timeout = 30000) => {
  return (req, res, next) => {
    req.setTimeout(timeout, () => {
      res.status(408).json({
        success: false,
        message: 'Request timeout'
      });
    });
    next();
  };
};

module.exports = {
  securityHeaders,
  ipRateLimit,
  emailRateLimit,
  validatePasswordResetRequest,
  validatePasswordReset,
  securityMonitoring,
  sanitizeRequest,
  csrfProtection,
  ipFilter,
  requestSizeLimit,
  requestTimeout,
  rateLimiter
};
