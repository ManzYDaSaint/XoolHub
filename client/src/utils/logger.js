// Production-ready logging utility
class Logger {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  // Only log errors in production, everything in development
  error(message, ...args) {
    if (!this.isProduction || this.isProduction) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  // Only log warnings in production
  warn(message, ...args) {
    if (!this.isProduction) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  // Only log info in development
  info(message, ...args) {
    if (!this.isProduction) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  // Only log debug in development
  debug(message, ...args) {
    if (!this.isProduction) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  // Always log critical errors (security, authentication, etc.)
  critical(message, ...args) {
    console.error(`[CRITICAL] ${message}`, ...args);
  }

  // Log API errors for monitoring
  apiError(endpoint, error, ...args) {
    console.error(`[API_ERROR] ${endpoint}:`, error.message || error, ...args);
  }

  // Log security events
  security(event, details, ...args) {
    console.warn(`[SECURITY] ${event}:`, details, ...args);
  }
}

const logger = new Logger();
export default logger;
