// Real-time Data Caching Service for Multi-School Support (File-based)
const { cache } = require('../database/fileCache.js');
const db = require('../database/mysql.js');

class RealTimeCacheService {
  constructor() {
    this.cachePrefix = 'realtime';
    this.defaultTTL = 300; // 5 minutes for real-time data
    this.updateInterval = 60000; // 1 minute update interval
    this.isRunning = false;
  }

  // Start real-time caching service
  start() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    // Update real-time data every minute
    this.updateIntervalId = setInterval(() => {
      this.updateRealTimeData();
    }, this.updateInterval);

    // Initial data load
    this.updateRealTimeData();
  }

  // Stop real-time caching service
  stop() {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
  }

  // Update real-time data for all schools
  async updateRealTimeData() {
    try {
      // Get all schools
      const [schools] = await db.execute('SELECT id, name FROM schools WHERE status = "activated"');
      
      // Update data for each school
      const updatePromises = schools.map(school => this.updateSchoolRealTimeData(school));
      await Promise.all(updatePromises);
      
      // Update global real-time data
      await this.updateGlobalRealTimeData();
    } catch (error) {
      // Silent error handling
    }
  }

  // Update real-time data for a specific school
  async updateSchoolRealTimeData(school) {
    try {
      const schoolId = school.id;
      
      // Get school statistics
      const [studentCount] = await db.execute(
        'SELECT COUNT(*) as count FROM students WHERE school_id = ?',
        [schoolId]
      );
      
      const [teacherCount] = await db.execute(
        'SELECT COUNT(*) as count FROM teachers WHERE school_id = ?',
        [schoolId]
      );
      
      const [classCount] = await db.execute(
        'SELECT COUNT(*) as count FROM classes WHERE school_id = ?',
        [schoolId]
      );
      
      // Get recent activity (last 24 hours)
      const [recentActivity] = await db.execute(`
        SELECT 
          'student' as type,
          COUNT(*) as count,
          DATE(created_at) as date
        FROM students 
        WHERE school_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        GROUP BY DATE(created_at)
        UNION ALL
        SELECT 
          'teacher' as type,
          COUNT(*) as count,
          DATE(created_at) as date
        FROM teachers 
        WHERE school_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        GROUP BY DATE(created_at)
      `, [schoolId, schoolId]);
      
      // Get attendance data for today
      const [attendanceData] = await db.execute(`
        SELECT 
          COUNT(*) as total_attendance,
          SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present_count,
          SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent_count,
          SUM(CASE WHEN status = 'Late' THEN 1 ELSE 0 END) as late_count
        FROM attendance a
        JOIN students s ON a.studentid = s.id
        WHERE s.school_id = ? AND a.date = CURDATE()
      `, [schoolId]);
      
      // Compile real-time data
      const realTimeData = {
        school_id: schoolId,
        school_name: school.name,
        statistics: {
          students: studentCount[0].count,
          teachers: teacherCount[0].count,
          classes: classCount[0].count
        },
        recent_activity: recentActivity,
        attendance: {
          total: attendanceData[0]?.total_attendance || 0,
          present: attendanceData[0]?.present_count || 0,
          absent: attendanceData[0]?.absent_count || 0,
          late: attendanceData[0]?.late_count || 0,
          attendance_rate: attendanceData[0]?.total_attendance > 0 
            ? ((attendanceData[0].present_count / attendanceData[0].total_attendance) * 100).toFixed(2)
            : 0
        },
        last_updated: new Date().toISOString()
      };
      
      // Cache the data
      await cache.setRealTimeData(`school_${schoolId}`, realTimeData, this.defaultTTL);
      
    } catch (error) {
      // Silent error handling
    }
  }

  // Update global real-time data
  async updateGlobalRealTimeData() {
    try {
      // Get global statistics
      const [totalSchools] = await db.execute('SELECT COUNT(*) as count FROM schools');
      const [totalStudents] = await db.execute('SELECT COUNT(*) as count FROM students');
      const [totalTeachers] = await db.execute('SELECT COUNT(*) as count FROM teachers');
      const [totalClasses] = await db.execute('SELECT COUNT(*) as count FROM class');
      
      // Get system performance metrics
      const [connectionStats] = await db.execute(`
        SELECT 
          VARIABLE_NAME,
          VARIABLE_VALUE
        FROM information_schema.GLOBAL_STATUS 
        WHERE VARIABLE_NAME IN (
          'Threads_connected',
          'Threads_running',
          'Max_used_connections'
        )
      `);
      
      const performanceMetrics = {};
      connectionStats.forEach(row => {
        performanceMetrics[row.VARIABLE_NAME] = parseInt(row.VARIABLE_VALUE);
      });
      
      // Get recent system activity
      const [recentActivity] = await db.execute(`
        SELECT 
          'school' as type,
          COUNT(*) as count,
          DATE(created_at) as date
        FROM schools 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        GROUP BY DATE(created_at)
      `);
      
      // Compile global real-time data
      const globalRealTimeData = {
        system_statistics: {
          schools: totalSchools[0].count,
          students: totalStudents[0].count,
          teachers: totalTeachers[0].count,
          classes: totalClasses[0].count
        },
        performance_metrics: performanceMetrics,
        recent_activity: recentActivity,
        last_updated: new Date().toISOString()
      };
      
      // Cache the data
      await cache.setRealTimeData('global', globalRealTimeData, this.defaultTTL);
      
    } catch (error) {
      // Silent error handling
    }
  }

  // Get real-time data for a specific school
  async getSchoolRealTimeData(schoolId) {
    try {
      const data = await cache.getRealTimeData(`school_${schoolId}`);
      if (data) {
        return data;
      }
      
      // If not in cache, get fresh data
      const [school] = await db.execute('SELECT id, name FROM schools WHERE id = ?', [schoolId]);
      if (school.length > 0) {
        await this.updateSchoolRealTimeData(school[0]);
        return await cache.getRealTimeData(`school_${schoolId}`);
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  // Get global real-time data
  async getGlobalRealTimeData() {
    try {
      const data = await cache.getRealTimeData('global');
      if (data) {
        return data;
      }
      
      // If not in cache, get fresh data
      await this.updateGlobalRealTimeData();
      return await cache.getRealTimeData('global');
    } catch (error) {
      return null;
    }
  }

  // Get real-time dashboard data
  async getDashboardData(schoolId = null) {
    try {
      if (schoolId) {
        return await this.getSchoolRealTimeData(schoolId);
      } else {
        return await this.getGlobalRealTimeData();
      }
    } catch (error) {
      return null;
    }
  }

  // Clear real-time cache
  async clearCache(schoolId = null) {
    try {
      if (schoolId) {
        await cache.setRealTimeData(`school_${schoolId}`, null, 0);
      } else {
        await cache.setRealTimeData('global', null, 0);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get cache statistics
  async getCacheStats() {
    try {
      const stats = await cache.getCacheStats();
      return {
        ...stats,
        service_running: this.isRunning,
        update_interval: this.updateInterval,
        default_ttl: this.defaultTTL
      };
    } catch (error) {
      return null;
    }
  }
}

// Create singleton instance
const realTimeCacheService = new RealTimeCacheService();

module.exports = realTimeCacheService;
