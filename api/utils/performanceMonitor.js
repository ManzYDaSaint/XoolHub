// Performance Monitoring for Multi-School Support
// This module provides monitoring capabilities for database connections and performance

const db = require('../database/mysql.js');

class PerformanceMonitor {
  constructor() {
    this.connectionStats = {
      totalConnections: 0,
      activeConnections: 0,
      queuedConnections: 0,
      rejectedConnections: 0
    };
    this.queryStats = {
      totalQueries: 0,
      slowQueries: 0,
      averageQueryTime: 0
    };
    this.schoolStats = {
      totalSchools: 0,
      activeSchools: 0,
      totalStudents: 0,
      totalTeachers: 0
    };
  }

  // Monitor database connection pool status
  async getConnectionPoolStatus() {
    try {
      const [rows] = await db.execute(`
        SELECT 
          VARIABLE_NAME,
          VARIABLE_VALUE
        FROM information_schema.GLOBAL_STATUS 
        WHERE VARIABLE_NAME IN (
          'Threads_connected',
          'Threads_running',
          'Max_used_connections',
          'Connections'
        )
      `);
      
      const status = {};
      rows.forEach(row => {
        status[row.VARIABLE_NAME] = parseInt(row.VARIABLE_VALUE);
      });
      
      return {
        ...status,
        connectionUtilization: status.Threads_connected / 50 * 100, // Based on our 50 connection limit
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting connection pool status:', error);
      return { error: error.message };
    }
  }

  // Get school capacity statistics
  async getSchoolCapacityStats() {
    try {
      const [rows] = await db.execute(`
        SELECT 
          s.id,
          s.name,
          COUNT(DISTINCT st.id) as student_count,
          COUNT(DISTINCT t.id) as teacher_count,
          COUNT(DISTINCT c.id) as class_count,
          s.created_at as school_created
        FROM schools s
        LEFT JOIN students st ON s.id = st.school_id
        LEFT JOIN teachers t ON s.id = t.school_id
        LEFT JOIN classes c ON s.id = c.school_id
        GROUP BY s.id, s.name, s.created_at
        ORDER BY student_count DESC
      `);
      
      const totalStats = {
        totalSchools: rows.length,
        totalStudents: rows.reduce((sum, row) => sum + row.student_count, 0),
        totalTeachers: rows.reduce((sum, row) => sum + row.teacher_count, 0),
        totalClasses: rows.reduce((sum, row) => sum + row.class_count, 0),
        averageStudentsPerSchool: 0,
        largestSchool: null,
        smallestSchool: null
      };
      
      if (rows.length > 0) {
        totalStats.averageStudentsPerSchool = Math.round(totalStats.totalStudents / rows.length);
        totalStats.largestSchool = rows[0];
        totalStats.smallestSchool = rows[rows.length - 1];
      }
      
      return {
        schools: rows,
        totals: totalStats,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting school capacity stats:', error);
      return { error: error.message };
    }
  }

  // Monitor query performance
  async getQueryPerformanceStats() {
    try {
      const [rows] = await db.execute(`
        SELECT 
          COUNT(*) as total_queries,
          AVG(query_time) as avg_query_time,
          MAX(query_time) as max_query_time,
          COUNT(CASE WHEN query_time > 1 THEN 1 END) as slow_queries
        FROM mysql.slow_log 
        WHERE start_time > DATE_SUB(NOW(), INTERVAL 1 HOUR)
      `);
      
      return {
        ...rows[0],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      // Slow log might not be enabled, return basic stats
      return {
        total_queries: 'N/A (slow log not enabled)',
        avg_query_time: 'N/A',
        max_query_time: 'N/A',
        slow_queries: 'N/A',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get system health status
  async getSystemHealth() {
    try {
      const [connectionStatus] = await this.getConnectionPoolStatus();
      const [capacityStats] = await this.getSchoolCapacityStats();
      const [queryStats] = await this.getQueryPerformanceStats();
      
      // Determine health status
      let healthStatus = 'healthy';
      let warnings = [];
      
      if (connectionStatus.connectionUtilization > 80) {
        healthStatus = 'warning';
        warnings.push('High connection pool utilization');
      }
      
      if (connectionStatus.connectionUtilization > 95) {
        healthStatus = 'critical';
        warnings.push('Connection pool near capacity');
      }
      
      if (capacityStats.totals.totalSchools > 40) {
        healthStatus = 'warning';
        warnings.push('Approaching maximum recommended school capacity');
      }
      
      return {
        status: healthStatus,
        warnings,
        connectionPool: connectionStatus,
        capacity: capacityStats,
        queries: queryStats,
        recommendations: this.getRecommendations(connectionStatus, capacityStats),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get performance recommendations
  getRecommendations(connectionStatus, capacityStats) {
    const recommendations = [];
    
    if (connectionStatus.connectionUtilization > 80) {
      recommendations.push('Consider increasing connection pool size or adding read replicas');
    }
    
    if (capacityStats.totals.totalSchools > 30) {
      recommendations.push('Consider implementing database sharding for better performance');
    }
    
    if (capacityStats.totals.totalStudents > 5000) {
      recommendations.push('Consider adding caching layer (Redis) for frequently accessed data');
    }
    
    if (capacityStats.totals.totalSchools > 20) {
      recommendations.push('Consider implementing load balancing for application servers');
    }
    
    return recommendations;
  }

  // Log performance metrics
  logPerformanceMetrics() {
    setInterval(async () => {
      try {
        const health = await this.getSystemHealth();
        
        if (health.warnings && health.warnings.length > 0) {
          console.warn(`[PERFORMANCE WARNINGS] ${health.warnings.join(', ')}`);
        }
      } catch (error) {
        console.error('[PERFORMANCE MONITOR] Error:', error.message);
      }
    }, 300000); // Log every 5 minutes
  }

  // Start monitoring
  startMonitoring() {
    this.logPerformanceMetrics();
  }
}

module.exports = new PerformanceMonitor();
