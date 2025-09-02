const express = require('express')
const cors = require('cors')
const api = require('./routes/apiRoutes.js')
const whatsAppController = require('./controller/whatsAppController.js');
const { initParentTelegramBot } = require('./controller/parentTelegramBot.js');
const { initTeacherTelegramBot } = require('./controller/teacherTelegramBot.js');
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
app.use('/webhook', whatsAppController);

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

// Function to setup database tables automatically
async function setupDatabaseTables() {
  const tables = [
    { name: 'conversation', file: 'conversation_tables.sql' },
    { name: 'attendance', file: 'attendance_tables.sql' }
  ];

  for (const table of tables) {
    try {
      const SQL_FILE = path.join(__dirname, 'database', table.file);
      
      if (!fs.existsSync(SQL_FILE)) {
        console.log(`⚠️  ${table.name} tables SQL file not found, skipping setup`);
        continue;
      }

      const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      console.log(`🔧 Setting up ${table.name} feature database tables...`);

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        try {
          await db.query(statement);
        } catch (error) {
          if (error.code === 'ER_TABLE_EXISTS_ERROR') {
            // Table already exists, this is fine
          } else {
            console.error(`❌ Error setting up ${table.name} tables:`, error.message);
            break;
          }
        }
      }
      
      console.log(`✅ ${table.name} tables setup completed`);
    } catch (error) {
      console.error(`❌ Failed to setup ${table.name} tables:`, error.message);
    }
  }
}

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  
  // Setup database tables automatically
  await setupDatabaseTables();
  
  // Initialize Parent Telegram Bot (if token is configured)
  try { 
    initParentTelegramBot && initParentTelegramBot(); 
    console.log('✅ Parent Telegram Bot initialized');
  } catch (e) { 
    console.error('❌ Parent bot init error:', e); 
  }
  
  // Initialize Teacher Telegram Bot (if token is configured)
  try { 
    initTeacherTelegramBot && initTeacherTelegramBot(); 
    console.log('✅ Teacher Telegram Bot initialized');
  } catch (e) { 
    console.error('❌ Teacher bot init error:', e); 
  }
  
  console.log('🚀 XoolHub is ready!');
});

module.exports = app;
