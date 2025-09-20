const express = require('express')
const cors = require('cors')
const api = require('./routes/apiRoutes.js')
const { initEnhancedParentTelegramBot } = require('./controller/enhancedParentTelegramBot.js');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const db = require('./database/mysql.js');

const app = express()
app.use(fileUpload());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
};

// ✅ Just this is enough:
app.use(cors(corsOptions));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  
  // Initialize Enhanced parent Telegram Bot (if token is configured)
  try { 
    initEnhancedParentTelegramBot && initEnhancedParentTelegramBot(); 
    console.log('✅ AI-Enhanced parent Telegram Bot initialized');
  } catch (e) { 
    console.error('❌ Enhanced parent bot init error:', e); 
  }
  
  console.log('🚀 XoolHub is ready!');
});

module.exports = app;
