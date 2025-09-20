const { auditLogger } = require('../utils/audit');
const { securityMonitor } = require('../utils/security');

// Security monitoring and management controller
class SecurityController {
  
  // Get security dashboard data
  async getSecurityDashboard(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const filters = { startDate, endDate };
      
      // Get audit logs
      const auditLogs = await auditLogger.queryAuditLogs(filters);
      
      // Generate security report
      const report = await auditLogger.generateAuditReport(startDate, endDate);
      
      // Get security metrics
      const metrics = this.calculateSecurityMetrics(auditLogs);
      
      res.json({
        success: true,
        data: {
          report,
          metrics,
          recentEvents: auditLogs.slice(0, 50), // Last 50 events
          summary: {
            totalEvents: auditLogs.length,
            securityIncidents: report.securityIncidents.length,
            topThreats: this.getTopThreats(auditLogs),
            riskLevel: this.calculateRiskLevel(metrics)
          }
        }
      });
      
    } catch (error) {
      console.error('Security dashboard error:', error);
      res.status(500).json({
        success: false,
        message: 'failed to load security dashboard'
      });
    }
  }
  
  // Get security alerts
  async getSecurityAlerts(req, res) {
    try {
      const { severity = 'HIGH', limit = 100 } = req.query;
      
      const filters = { severity };
      const alerts = await auditLogger.queryAuditLogs(filters);
      
      res.json({
        success: true,
        data: {
          alerts: alerts.slice(0, parseInt(limit)),
          count: alerts.length
        }
      });
      
    } catch (error) {
      console.error('Security alerts error:', error);
      res.status(500).json({
        success: false,
        message: 'failed to load security alerts'
      });
    }
  }
  
  // Get password reset analytics
  async getPasswordResetAnalytics(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const filters = { startDate, endDate };
      
      const logs = await auditLogger.queryAuditLogs(filters);
      const passwordResetEvents = logs.filter(log => 
        log.event.includes('PASSWORD_RESET')
      );
      
      const analytics = {
        totalRequests: passwordResetEvents.filter(e => e.event === 'PASSWORD_RESET_REQUESTED').length,
        successfulResets: passwordResetEvents.filter(e => e.event === 'PASSWORD_RESET_SUCCESS').length,
        failedAttempts: passwordResetEvents.filter(e => e.event === 'PASSWORD_RESET_FAILED').length,
        rateLimitViolations: passwordResetEvents.filter(e => e.event === 'RATE_LIMIT_EXCEEDED').length,
        securityViolations: passwordResetEvents.filter(e => e.event === 'SECURITY_VIOLATION').length,
        successRate: 0,
        failureReasons: {},
        hourlyDistribution: {},
        topIPs: {},
        topEmails: {}
      };
      
      // Calculate success rate
      if (analytics.totalRequests > 0) {
        analytics.successRate = (analytics.successfulResets / analytics.totalRequests) * 100;
      }
      
      // Analyze failure reasons
      passwordResetEvents
        .filter(e => e.event === 'PASSWORD_RESET_FAILED')
        .forEach(event => {
          const reason = event.data.reason || 'Unknown';
          analytics.failureReasons[reason] = (analytics.failureReasons[reason] || 0) + 1;
        });
      
      // Analyze hourly distribution
      passwordResetEvents.forEach(event => {
        const hour = new Date(event.timestamp).getHours();
        analytics.hourlyDistribution[hour] = (analytics.hourlyDistribution[hour] || 0) + 1;
      });
      
      // Analyze top IPs and emails
      passwordResetEvents.forEach(event => {
        if (event.data.ip) {
          analytics.topIPs[event.data.ip] = (analytics.topIPs[event.data.ip] || 0) + 1;
        }
        if (event.data.email) {
          analytics.topEmails[event.data.email] = (analytics.topEmails[event.data.email] || 0) + 1;
        }
      });
      
      res.json({
        success: true,
        data: analytics
      });
      
    } catch (error) {
      console.error('Password reset analytics error:', error);
      res.status(500).json({
        success: false,
        message: 'failed to load password reset analytics'
      });
    }
  }
  
  // Get security incidents
  async getSecurityIncidents(req, res) {
    try {
      const { startDate, endDate, severity = 'HIGH' } = req.query;
      const filters = { startDate, endDate, severity };
      
      const incidents = await auditLogger.queryAuditLogs(filters);
      
      res.json({
        success: true,
        data: {
          incidents: incidents.map(incident => ({
            id: incident.correlationId || incident.sessionId,
            timestamp: incident.timestamp,
            event: incident.event,
            severity: incident.severity,
            ip: incident.data.ip,
            email: incident.data.email,
            reason: incident.data.reason,
            details: incident.data
          })),
          count: incidents.length
        }
      });
      
    } catch (error) {
      console.error('Security incidents error:', error);
      res.status(500).json({
        success: false,
        message: 'failed to load security incidents'
      });
    }
  }
  
  // Block suspicious IP
  async blockSuspiciousIP(req, res) {
    try {
      const { ip, reason, duration = 24 } = req.body;
      
      if (!ip) {
        return res.status(400).json({
          success: false,
          message: 'IP address is required'
        });
      }
      
      // Log the blocking action
      await auditLogger.logSecurityEvent('IP_BLOCKED', {
        ip,
        reason,
        duration,
        blockedBy: req.user?.id || 'system',
        timestamp: new Date().toISOString()
      });
      
      res.json({
        success: true,
        message: `IP ${ip} has been blocked for ${duration} hours`,
        data: { ip, reason, duration }
      });
      
    } catch (error) {
      console.error('Block IP error:', error);
      res.status(500).json({
        success: false,
        message: 'failed to block IP address'
      });
    }
  }
  
  // Get security metrics
  calculateSecurityMetrics(logs) {
    const metrics = {
      totalEvents: logs.length,
      highSeverityEvents: logs.filter(log => log.severity === 'HIGH').length,
      mediumSeverityEvents: logs.filter(log => log.severity === 'MEDIUM').length,
      failedAttempts: logs.filter(log => log.event === 'PASSWORD_RESET_FAILED').length,
      rateLimitViolations: logs.filter(log => log.event === 'RATE_LIMIT_EXCEEDED').length,
      securityViolations: logs.filter(log => log.event === 'SECURITY_VIOLATION').length,
      uniqueIPs: new Set(logs.map(log => log.data.ip)).size,
      uniqueEmails: new Set(logs.map(log => log.data.email)).size
    };
    
    return metrics;
  }
  
  // Get top threats
  getTopThreats(logs) {
    const threats = {};
    
    logs.forEach(log => {
      if (log.severity === 'HIGH') {
        const threat = log.event;
        threats[threat] = (threats[threat] || 0) + 1;
      }
    });
    
    return Object.entries(threats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([threat, count]) => ({ threat, count }));
  }
  
  // Calculate risk level
  calculateRiskLevel(metrics) {
    const riskScore = 
      (metrics.highSeverityEvents * 3) +
      (metrics.mediumSeverityEvents * 2) +
      (metrics.failedAttempts * 1) +
      (metrics.rateLimitViolations * 2) +
      (metrics.securityViolations * 5);
    
    if (riskScore >= 50) return 'CRITICAL';
    if (riskScore >= 25) return 'HIGH';
    if (riskScore >= 10) return 'MEDIUM';
    return 'LOW';
  }
  
  // Export security data
  async exportSecurityData(req, res) {
    try {
      const { startDate, endDate, format = 'json' } = req.query;
      const filters = { startDate, endDate };
      
      const logs = await auditLogger.queryAuditLogs(filters);
      
      if (format === 'csv') {
        const csv = this.convertToCSV(logs);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="security-data.csv"');
        res.send(csv);
      } else {
        res.json({
          success: true,
          data: logs
        });
      }
      
    } catch (error) {
      console.error('Export security data error:', error);
      res.status(500).json({
        success: false,
        message: 'failed to export security data'
      });
    }
  }
  
  // Convert logs to CSV
  convertToCSV(logs) {
    const headers = ['timestamp', 'event', 'severity', 'ip', 'email', 'reason', 'details'];
    const csvRows = [headers.join(',')];
    
    logs.forEach(log => {
      const row = [
        log.timestamp,
        log.event,
        log.severity || '',
        log.data.ip || '',
        log.data.email || '',
        log.data.reason || '',
        JSON.stringify(log.data).replace(/,/g, ';')
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
  }
}

const securityController = new SecurityController();

module.exports = {
  getSecurityDashboard: securityController.getSecurityDashboard.bind(securityController),
  getSecurityAlerts: securityController.getSecurityAlerts.bind(securityController),
  getPasswordResetAnalytics: securityController.getPasswordResetAnalytics.bind(securityController),
  getSecurityIncidents: securityController.getSecurityIncidents.bind(securityController),
  blockSuspiciousIP: securityController.blockSuspiciousIP.bind(securityController),
  exportSecurityData: securityController.exportSecurityData.bind(securityController)
};
