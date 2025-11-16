// Production configuration
export const productionConfig = {
  // Disable console logs in production
  disableConsoleLogs: process.env.NODE_ENV === 'production',
  
  // Error reporting configuration
  errorReporting: {
    enabled: true,
    level: 'error', // Only log errors in production
    excludePatterns: [
      /Network Error/,
      /Request failed/,
      /timeout/
    ]
  },
  
  // Performance monitoring
  performance: {
    enabled: true,
    logSlowQueries: true,
    slowQueryThreshold: 2000 // ms
  },
  
  // Security logging
  security: {
    enabled: true,
    logAuthAttempts: true,
    logApiErrors: true,
    logSecurityEvents: true
  }
};

// Console log replacement for production
if (process.env.NODE_ENV === 'production') {
  // Replace console.log with no-op in production
  const originalConsole = { ...console };
  
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
  
  // Keep error and warn for production monitoring
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
}
