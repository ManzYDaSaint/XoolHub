const requiredEnvVars = [
  'MYSQL_HOST',
  'MYSQL_USER', 
  'MYSQL_DATABASE',
  'JWT_SECRET',
  'PORT'
];

const optionalEnvVars = [
  'MYSQL_PASSWORD',
  'MYSQL_PORT',
  'RESEND_API_KEY',
  'FRONTEND_URL',
  'TELEGRAM_PARENT_BOT_TOKEN',
  'TELEGRAM_TEACHER_BOT_TOKEN',
  'WHATSAPP_TOKEN',
  'WHATSAPP_PHONE_NUMBER_ID',
  'BLACKLISTED_IPS',
  'WHITELISTED_IPS',
  'LOGGING_SALT'
];

// Validate environment variables
const validateEnvironment = () => {
  const missing = [];
  const warnings = [];

  // Check required variables
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  // Check optional variables and warn if missing
  optionalEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(varName);
    }
  });

  // Check for weak JWT secret
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    warnings.push('JWT_SECRET should be at least 32 characters long for security');
  }

  // Check for default/weak passwords
  if (process.env.MYSQL_PASSWORD === 'password' || process.env.MYSQL_PASSWORD === '123456') {
    warnings.push('MYSQL_PASSWORD appears to be weak - consider using a stronger password');
  }

  // Check for development URLs in production
  if (process.env.NODE_ENV === 'production') {
    if (process.env.FRONTEND_URL && process.env.FRONTEND_URL.includes('localhost')) {
      warnings.push('FRONTEND_URL should not contain localhost in production');
    }
  }

  return { missing, warnings };
};

// Environment validation middleware
const envValidationMiddleware = (req, res, next) => {
  const { missing, warnings } = validateEnvironment();

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    return res.status(500).json({
      success: false,
      message: 'Server configuration error - missing required environment variables',
      missing: missing
    });
  }

  next();
};

// Startup environment check
const checkEnvironmentOnStartup = () => {
  const { missing, warnings } = validateEnvironment();

  if (missing.length > 0) {
    console.error('❌ Server startup failed - missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    process.exit(1);
  }

  if (warnings.length > 0) {
    warnings.forEach(warning => {
      console.warn(`   - ${warning}`);
    });
  }

  console.log('✅ Environment validation passed');
};

// Validate specific environment variable
const validateEnvVar = (varName, type = 'string', required = true) => {
  const value = process.env[varName];
  
  if (required && !value) {
    throw new Error(`Required environment variable ${varName} is not set`);
  }

  if (value) {
    switch (type) {
      case 'number':
        if (isNaN(Number(value))) {
          throw new Error(`Environment variable ${varName} must be a number`);
        }
        break;
      case 'boolean':
        if (!['true', 'false', '1', '0'].includes(value.toLowerCase())) {
          throw new Error(`Environment variable ${varName} must be a boolean`);
        }
        break;
      case 'url':
        try {
          new URL(value);
        } catch {
          throw new Error(`Environment variable ${varName} must be a valid URL`);
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error(`Environment variable ${varName} must be a valid email`);
        }
        break;
    }
  }

  return value;
};

// Get validated environment variables
const getValidatedEnv = () => {
  return {
    // Database
    mysql: {
      host: validateEnvVar('MYSQL_HOST'),
      user: validateEnvVar('MYSQL_USER'),
      password: validateEnvVar('MYSQL_PASSWORD', 'string', false) || '', // Allow empty password
      database: validateEnvVar('MYSQL_DATABASE'),
      port: validateEnvVar('MYSQL_PORT', 'number', false) || 3306
    },
    
    // JWT
    jwt: {
      secret: validateEnvVar('JWT_SECRET'),
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },
    
    // Server
    server: {
      port: validateEnvVar('PORT', 'number', false) || 5000,
      nodeEnv: process.env.NODE_ENV || 'development'
    },
    
    // External services
    resend: {
      apiKey: validateEnvVar('RESEND_API_KEY', 'string', false)
    },
    
    telegram: {
      parentBotToken: validateEnvVar('TELEGRAM_PARENT_BOT_TOKEN', 'string', false),
      teacherBotToken: validateEnvVar('TELEGRAM_TEACHER_BOT_TOKEN', 'string', false)
    },
    
    whatsapp: {
      token: validateEnvVar('WHATSAPP_TOKEN', 'string', false),
      phoneNumberId: validateEnvVar('WHATSAPP_PHONE_NUMBER_ID', 'string', false)
    },
    
    // URLs
    frontendUrl: validateEnvVar('FRONTEND_URL', 'url', false) || 'http://localhost:3000',
    
    // Security
    security: {
      blacklistedIPs: process.env.BLACKLISTED_IPS ? process.env.BLACKLISTED_IPS.split(',') : [],
      whitelistedIPs: process.env.WHITELISTED_IPS ? process.env.WHITELISTED_IPS.split(',') : [],
      loggingSalt: validateEnvVar('LOGGING_SALT', 'string', false) || 'default-salt'
    }
  };
};

module.exports = {
  validateEnvironment,
  envValidationMiddleware,
  checkEnvironmentOnStartup,
  validateEnvVar,
  getValidatedEnv,
  requiredEnvVars,
  optionalEnvVars
};
