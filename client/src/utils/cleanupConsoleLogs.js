// Console log cleanup utility for production
// This file can be used to identify and clean up console logs

const consoleLogPatterns = {
  // Debug logs to remove
  debugLogs: [
    /console\.log\([^)]*\);/g,
    /console\.info\([^)]*\);/g,
    /console\.debug\([^)]*\);/g,
  ],
  
  // Logs to keep (error handling, security, critical)
  keepLogs: [
    /console\.error\([^)]*\);/g,
    /console\.warn\([^)]*\);/g,
  ],
  
  // Specific patterns to remove
  removePatterns: [
    /console\.log\([^)]*res\.data[^)]*\);/g,
    /console\.log\([^)]*response[^)]*\);/g,
    /console\.log\([^)]*data[^)]*\);/g,
    /console\.log\([^)]*result[^)]*\);/g,
    /console\.log\([^)]*e\.target\.value[^)]*\);/g,
    /console\.log\([^)]*applications[^)]*\);/g,
    /console\.log\([^)]*email[^)]*\);/g,
  ]
};

export default consoleLogPatterns;
