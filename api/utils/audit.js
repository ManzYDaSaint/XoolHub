const fs = require('fs').promises;
const path = require('path');
const { securityUtils, securityMonitor } = require('./security');

// Advanced audit logging system
class AuditLogger {
  constructor() {
    this.logDir = path.join(__dirname, '../logs');
    this.maxLogSize = 10 * 1024 * 1024; // 10MB
    this.maxLogFiles = 5;
    this.ensureLogDirectory();
  }

  async ensureLogDirectory() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
    } catch (error) {
      console.error('failed to create log directory:', error);
    }
  }

  // Log password reset events
  async logPasswordResetEvent(event, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data: this.sanitizeLogData(data),
      sessionId: data.sessionId || this.generateSessionId(),
      correlationId: data.correlationId || this.generateCorrelationId()
    };

    await this.writeToLog('password-reset', logEntry);
    
    // Also log to security monitor
    securityMonitor.logSecurityEvent(event, data);
  }

  // Log security events
  async logSecurityEvent(event, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data: this.sanitizeLogData(data),
      severity: this.getEventSeverity(event),
      sessionId: data.sessionId,
      correlationId: data.correlationId
    };

    await this.writeToLog('security', logEntry);
  }

  // Log system events
  async logSystemEvent(event, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data: this.sanitizeLogData(data),
      level: 'INFO'
    };

    await this.writeToLog('system', logEntry);
  }

  // Write to log file with rotation
  async writeToLog(logType, logEntry) {
    try {
      const logFile = path.join(this.logDir, `${logType}-${new Date().toISOString().split('T')[0]}.log`);
      
      // Check if log file exists and its size
      let stats;
      try {
        stats = await fs.stat(logFile);
      } catch (error) {
        stats = { size: 0 };
      }
      
      // Rotate log if too large
      if (stats.size > this.maxLogSize) {
        await this.rotateLogFile(logFile);
      }
      
      // Write log entry
      const logLine = JSON.stringify(logEntry) + '\n';
      await fs.appendFile(logFile, logLine);
      
    } catch (error) {
      console.error('failed to write log:', error);
    }
  }

  // Rotate log files
  async rotateLogFile(logFile) {
    try {
      const logDir = path.dirname(logFile);
      const baseName = path.basename(logFile, '.log');
      const ext = path.extname(logFile);
      
      // Move existing files
      for (let i = this.maxLogFiles - 1; i > 0; i--) {
        const oldFile = path.join(logDir, `${baseName}.${i}${ext}`);
        const newFile = path.join(logDir, `${baseName}.${i + 1}${ext}`);
        
        try {
          await fs.rename(oldFile, newFile);
        } catch (error) {
          // File doesn't exist, continue
        }
      }
      
      // Move current file
      const rotatedFile = path.join(logDir, `${baseName}.1${ext}`);
      await fs.rename(logFile, rotatedFile);
      
    } catch (error) {
      console.error('failed to rotate log file:', error);
    }
  }

  // Sanitize log data
  sanitizeLogData(data) {
    const sanitized = { ...data };
    
    // Remove sensitive information
    if (sanitized.password) {
      sanitized.password = '[REDACTED]';
    }
    
    if (sanitized.token) {
      sanitized.token = sanitized.token.substring(0, 8) + '...';
    }
    
    if (sanitized.email) {
      sanitized.email = this.maskEmail(sanitized.email);
    }
    
    if (sanitized.ip) {
      sanitized.ip = this.maskIP(sanitized.ip);
    }
    
    return sanitized;
  }

  // Mask email for logging
  maskEmail(email) {
    const [local, domain] = email.split('@');
    if (local.length <= 2) {
      return `${local[0]}*@${domain}`;
    }
    return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
  }

  // Mask IP for logging
  maskIP(ip) {
    if (ip.includes(':')) {
      // IPv6
      const parts = ip.split(':');
      return parts.slice(0, 2).join(':') + '::****';
    } else {
      // IPv4
      const parts = ip.split('.');
      return parts.slice(0, 2).join('.') + '.***';
    }
  }

  // Get event severity
  getEventSeverity(event) {
    const highSeverityEvents = [
      'BRUTE_FORCE_ATTEMPT',
      'MULTIPLE_FAILED_ATTEMPTS',
      'SUSPICIOUS_IP_ACTIVITY',
      'TOKEN_MANIPULATION',
      'RATE_LIMIT_VIOLATION',
      'UNAUTHORIZED_ACCESS'
    ];
    
    return highSeverityEvents.includes(event) ? 'HIGH' : 'MEDIUM';
  }

  // Generate session ID
  generateSessionId() {
    return securityUtils.generateSecureToken(32);
  }

  // Generate correlation ID
  generateCorrelationId() {
    return securityUtils.generateSecureToken(16);
  }

  // Query audit logs
  async queryAuditLogs(filters = {}) {
    try {
      const logFiles = await fs.readdir(this.logDir);
      const results = [];
      
      for (const file of logFiles) {
        if (file.startsWith('password-reset-') && file.endsWith('.log')) {
          const filePath = path.join(this.logDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          const lines = content.trim().split('\n');
          
          for (const line of lines) {
            try {
              const logEntry = JSON.parse(line);
              
              // Apply filters
              if (this.matchesFilters(logEntry, filters)) {
                results.push(logEntry);
              }
            } catch (error) {
              // Skip invalid JSON lines
            }
          }
        }
      }
      
      return results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
    } catch (error) {
      console.error('failed to query audit logs:', error);
      return [];
    }
  }

  // Check if log entry matches filters
  matchesFilters(logEntry, filters) {
    if (filters.event && logEntry.event !== filters.event) {
      return false;
    }
    
    if (filters.startDate && new Date(logEntry.timestamp) < new Date(filters.startDate)) {
      return false;
    }
    
    if (filters.endDate && new Date(logEntry.timestamp) > new Date(filters.endDate)) {
      return false;
    }
    
    if (filters.severity && logEntry.severity !== filters.severity) {
      return false;
    }
    
    return true;
  }

  // Generate audit report
  async generateAuditReport(startDate, endDate) {
    const filters = { startDate, endDate };
    const logs = await this.queryAuditLogs(filters);
    
    const report = {
      period: { startDate, endDate },
      totalEvents: logs.length,
      eventsByType: {},
      eventsBySeverity: {},
      topIPs: {},
      topEmails: {},
      securityIncidents: []
    };
    
    // Analyze logs
    for (const log of logs) {
      // Count by event type
      report.eventsByType[log.event] = (report.eventsByType[log.event] || 0) + 1;
      
      // Count by severity
      if (log.severity) {
        report.eventsBySeverity[log.severity] = (report.eventsBySeverity[log.severity] || 0) + 1;
      }
      
      // Count IPs
      if (log.data.ip) {
        report.topIPs[log.data.ip] = (report.topIPs[log.data.ip] || 0) + 1;
      }
      
      // Count emails
      if (log.data.email) {
        report.topEmails[log.data.email] = (report.topEmails[log.data.email] || 0) + 1;
      }
      
      // Security incidents
      if (log.severity === 'HIGH') {
        report.securityIncidents.push(log);
      }
    }
    
    return report;
  }
}

// Initialize audit logger
const auditLogger = new AuditLogger();

// Audit event types
const AUDIT_EVENTS = {
  PASSWORD_RESET_REQUESTED: 'PASSWORD_RESET_REQUESTED',
  PASSWORD_RESET_EMAIL_SENT: 'PASSWORD_RESET_EMAIL_SENT',
  PASSWORD_RESET_LINK_CLICKED: 'PASSWORD_RESET_LINK_CLICKED',
  PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS',
  PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED',
  PASSWORD_RESET_TOKEN_EXPIRED: 'PASSWORD_RESET_TOKEN_EXPIRED',
  PASSWORD_RESET_TOKEN_INVALID: 'PASSWORD_RESET_TOKEN_INVALID',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  BRUTE_FORCE_ATTEMPT: 'BRUTE_FORCE_ATTEMPT',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
  SECURITY_VIOLATION: 'SECURITY_VIOLATION'
};

module.exports = {
  auditLogger,
  AUDIT_EVENTS
};
