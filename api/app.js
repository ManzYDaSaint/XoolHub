const express = require('express')
const cors = require('cors')
const api = require('./routes/apiRoutes.js')
const { initEnhancedParentTelegramBot } = require('./controller/enhancedParentTelegramBot.js');
const performanceMonitor = require('./utils/performanceMonitor.js');
const { sessionMiddleware, sessionHealthCheck } = require('./middleware/session.js');
const { cacheMiddleware, schoolCacheMiddleware, realTimeCacheMiddleware } = require('./middleware/cache.js');
const realTimeCacheService = require('./services/realTimeCache.js');
const { envValidationMiddleware, checkEnvironmentOnStartup } = require('./middleware/envValidation.js');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const db = require('./database/mysql.js');

const app = express()

// File upload middleware must be FIRST to handle multipart/form-data
app.use(fileUpload({
  useTempFiles: false,
  createParentPath: true,
  parseNested: true,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  abortOnLimit: true,
  responseOnLimit: 'File size limit has been reached'
}));



app.use(cookieParser());

// Redis session management
app.use(sessionMiddleware);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://xoolhub.com',
      // 'https://www.xoolhub.com',
      // 'http://localhost:3000', // For development
      // 'http://localhost:3001'  // For development
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  maxAge: 86400 // 24 hours
};

// ✅ Enhanced CORS configuration:
app.use(cors(corsOptions));

// Additional security headers
app.use((req, res, next) => {
  // Set additional CORS headers
  res.header('Access-Control-Allow-Origin', req.headers.origin || 'https://xoolhub.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Middleware to parse JSON and form data (skip for multipart/form-data)
app.use((req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    return next(); // Skip JSON/URL encoding for multipart requests
  }
  express.json({ limit: '10mb' })(req, res, next);
});

app.use((req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    return next(); // Skip URL encoding for multipart requests
  }
  express.urlencoded({ extended: true, limit: '10mb' })(req, res, next);
});

// Request timeout middleware
app.use((req, res, next) => {
  // Set timeout for all requests
  req.setTimeout(30000, () => {
    res.status(408).json({
      status: 'error',
      message: 'Request timeout'
    });
  });
  
  // Set response timeout
  res.setTimeout(30000, () => {
    res.status(408).json({
      status: 'error',
      message: 'Response timeout'
    });
  });
  
  next();
});

// In app.js or your API routes middleware
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'REST API working successfully!',
  });
});

// Environment validation middleware
app.use(envValidationMiddleware);

// Apply caching middleware to API routes
app.use('/api/', cacheMiddleware(3600)); // 1 hour cache for general API
app.use('/api/schools/', schoolCacheMiddleware(7200)); // 2 hours cache for school data
app.use('/api/dashboard/', realTimeCacheMiddleware(300)); // 5 minutes cache for dashboard data

// All routes go here
app.use('/api/', api);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// General error handler
app.use((err, req, res, next) => {
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    message: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  // Check environment variables on startup
  checkEnvironmentOnStartup();
  
  console.log(`Server is running on port ${port}`);
  
  // Initialize services silently
  try {
    const { cache } = require('./database/fileCache.js');
    await cache.healthCheck();
  } catch (e) {
    // Silent initialization
  }
  
  try {
    realTimeCacheService.start();
  } catch (e) {
    // Silent initialization
  }
  
  try { 
    if (initEnhancedParentTelegramBot) {
      initEnhancedParentTelegramBot();
    }
  } catch (e) { 
    // Silent initialization
  }
  
  try {
    performanceMonitor.startMonitoring();
  } catch (e) {
    // Silent initialization
  }
});

module.exports = app;
