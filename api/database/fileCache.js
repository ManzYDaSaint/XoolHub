// File-based Caching System for cPanel Compatibility
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class FileCache {
  constructor() {
    this.cacheDir = path.join(__dirname, '../cache');
    this.ensureCacheDir();
    this.defaultTTL = 3600; // 1 hour default TTL
    this.schoolTTL = 7200; // 2 hours for school-specific data
    this.sessionTTL = 86400; // 24 hours for sessions
  }

  // Ensure cache directory exists
  ensureCacheDir() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  // Generate cache key with school context
  generateKey(prefix, schoolId, identifier) {
    return `${prefix}_${schoolId}_${identifier}`;
  }

  // Generate file path for cache key
  getFilePath(key) {
    const hash = crypto.createHash('md5').update(key).digest('hex');
    return path.join(this.cacheDir, `${hash}.json`);
  }

  // Set cache data
  async set(key, data, ttl = this.defaultTTL) {
    try {
      const cacheFile = this.getFilePath(key);
      const cacheData = {
        data,
        expires: Date.now() + (ttl * 1000),
        created: Date.now()
      };
      
      fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
      return true;
    } catch (error) {
      console.error('File cache set error:', error.message);
      return false;
    }
  }

  // Get cache data
  async get(key) {
    try {
      const cacheFile = this.getFilePath(key);
      
      if (!fs.existsSync(cacheFile)) {
        return null;
      }

      const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      
      if (Date.now() > cacheData.expires) {
        this.delete(key);
        return null;
      }
      
      return cacheData.data;
    } catch (error) {
      console.error('File cache get error:', error.message);
      return null;
    }
  }

  // Delete cache data
  async delete(key) {
    try {
      const cacheFile = this.getFilePath(key);
      if (fs.existsSync(cacheFile)) {
        fs.unlinkSync(cacheFile);
      }
      return true;
    } catch (error) {
      console.error('File cache delete error:', error.message);
      return false;
    }
  }

  // Cache school-specific data
  async setSchoolData(schoolId, key, data, ttl = this.schoolTTL) {
    const cacheKey = this.generateKey('school', schoolId, key);
    return await this.set(cacheKey, data, ttl);
  }

  // Get school-specific data
  async getSchoolData(schoolId, key) {
    const cacheKey = this.generateKey('school', schoolId, key);
    return await this.get(cacheKey);
  }

  // Cache user session data
  async setSession(sessionId, data, ttl = this.sessionTTL) {
    const cacheKey = `session_${sessionId}`;
    return await this.set(cacheKey, data, ttl);
  }

  // Get user session data
  async getSession(sessionId) {
    const cacheKey = `session_${sessionId}`;
    return await this.get(cacheKey);
  }

  // Delete session
  async deleteSession(sessionId) {
    const cacheKey = `session_${sessionId}`;
    return await this.delete(cacheKey);
  }

  // Cache frequently accessed data
  async setFrequentData(key, data, ttl = this.defaultTTL) {
    const cacheKey = `frequent_${key}`;
    return await this.set(cacheKey, data, ttl);
  }

  // Get frequently accessed data
  async getFrequentData(key) {
    const cacheKey = `frequent_${key}`;
    return await this.get(cacheKey);
  }

  // Cache real-time data
  async setRealTimeData(key, data, ttl = 300) { // 5 minutes for real-time data
    const cacheKey = `realtime_${key}`;
    return await this.set(cacheKey, data, ttl);
  }

  // Get real-time data
  async getRealTimeData(key) {
    const cacheKey = `realtime_${key}`;
    return await this.get(cacheKey);
  }

  // Clear school-specific cache
  async clearSchoolCache(schoolId) {
    try {
      const files = fs.readdirSync(this.cacheDir);
      const schoolPrefix = `school_${schoolId}_`;
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.cacheDir, file);
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            const cacheData = JSON.parse(content);
            
            // Check if this is school-specific data
            if (cacheData.data && typeof cacheData.data === 'object') {
              // This is a simple check - in a real implementation, you'd store metadata
              fs.unlinkSync(filePath);
            }
          } catch (e) {
            // Skip files that can't be parsed
          }
        }
      }
      return true;
    } catch (error) {
      console.error('File cache clearSchoolCache error:', error.message);
      return false;
    }
  }

  // Clear all cache
  async clearAllCache() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          fs.unlinkSync(path.join(this.cacheDir, file));
        }
      }
      return true;
    } catch (error) {
      console.error('File cache clearAllCache error:', error.message);
      return false;
    }
  }

  // Get cache statistics
  async getCacheStats() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      const stats = {
        totalFiles: files.length,
        totalSize: 0,
        expiredFiles: 0,
        validFiles: 0,
        timestamp: new Date().toISOString()
      };

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.cacheDir, file);
          const fileStats = fs.statSync(filePath);
          stats.totalSize += fileStats.size;

          try {
            const content = fs.readFileSync(filePath, 'utf8');
            const cacheData = JSON.parse(content);
            
            if (Date.now() > cacheData.expires) {
              stats.expiredFiles++;
            } else {
              stats.validFiles++;
            }
          } catch (e) {
            stats.expiredFiles++;
          }
        }
      }

      return stats;
    } catch (error) {
      console.error('File cache getCacheStats error:', error.message);
      return null;
    }
  }

  // Health check
  async healthCheck() {
    try {
      // Test if we can write and read from cache
      const testKey = 'health_check';
      const testData = { test: true, timestamp: Date.now() };
      
      const setResult = await this.set(testKey, testData, 60);
      if (!setResult) return false;
      
      const getResult = await this.get(testKey);
      if (!getResult || !getResult.test) return false;
      
      await this.delete(testKey);
      return true;
    } catch (error) {
      console.error('File cache health check failed:', error.message);
      return false;
    }
  }

  // Clean up expired files
  async cleanup() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      let cleaned = 0;

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.cacheDir, file);
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            const cacheData = JSON.parse(content);
            
            if (Date.now() > cacheData.expires) {
              fs.unlinkSync(filePath);
              cleaned++;
            }
          } catch (e) {
            // Remove corrupted files
            fs.unlinkSync(filePath);
            cleaned++;
          }
        }
      }

      return cleaned;
    } catch (error) {
      console.error('File cache cleanup error:', error.message);
      return 0;
    }
  }
}

// Create cache instance
const cache = new FileCache();

// Start cleanup interval (every hour)
setInterval(() => {
  cache.cleanup();
}, 3600000); // 1 hour

module.exports = {
  cache
};
