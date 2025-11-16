// Caching Middleware for Multi-School Support (File-based)
const { cache } = require('../database/fileCache.js');

// Cache middleware for frequently accessed data
const cacheMiddleware = (ttl = 3600) => {
  return async (req, res, next) => {
    try {
      // Generate cache key based on route and parameters
      const schoolId = req.user?.school_id || req.body?.school_id || req.query?.school_id || 'global';
      const route = req.originalUrl;
      const method = req.method;
      const params = JSON.stringify(req.query);
      
      const cacheKey = `${method}:${route}:${schoolId}:${params}`;
      
      // Try to get data from cache
      const cachedData = await cache.getFrequentData(cacheKey);
      
      if (cachedData) {
        return res.json({
          status: 'success',
          data: cachedData,
          cached: true,
          timestamp: new Date().toISOString()
        });
      }
      
      // Store original res.json method
      const originalJson = res.json;
      
      // Override res.json to cache the response
      res.json = function(data) {
        // Cache the response if it's successful
        if (data.status === 'success' && data.data) {
          cache.setFrequentData(cacheKey, data.data, ttl)
            .catch(err => {
              console.error('Cache set error:', err.message);
            });
        }
        
        // Call original json method
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Cache middleware error:', error.message);
      next(); // Continue without caching if Redis fails
    }
  };
};

// School-specific cache middleware
const schoolCacheMiddleware = (ttl = 7200) => {
  return async (req, res, next) => {
    try {
      const schoolId = req.user?.school_id || req.body?.school_id || req.query?.school_id;
      
      if (!schoolId) {
        return next();
      }
      
      const route = req.originalUrl;
      const method = req.method;
      const params = JSON.stringify(req.query);
      
      const cacheKey = `${method}:${route}:${params}`;
      
      // Try to get school-specific data from cache
      const cachedData = await cache.getSchoolData(schoolId, cacheKey);
      
      if (cachedData) {
        return res.json({
          status: 'success',
          data: cachedData,
          cached: true,
          school_id: schoolId,
          timestamp: new Date().toISOString()
        });
      }
      
      // Store original res.json method
      const originalJson = res.json;
      
      // Override res.json to cache the response
      res.json = function(data) {
        // Cache the response if it's successful
        if (data.status === 'success' && data.data) {
          cache.setSchoolData(schoolId, cacheKey, data.data, ttl)
            .catch(err => {
              console.error('School cache set error:', err.message);
            });
        }
        
        // Call original json method
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('School cache middleware error:', error.message);
      next(); // Continue without caching if Redis fails
    }
  };
};

// Real-time data cache middleware
const realTimeCacheMiddleware = (ttl = 300) => {
  return async (req, res, next) => {
    try {
      const schoolId = req.user?.school_id || req.body?.school_id || req.query?.school_id || 'global';
      const route = req.originalUrl;
      const method = req.method;
      const params = JSON.stringify(req.query);
      
      const cacheKey = `${method}:${route}:${schoolId}:${params}`;
      
      // Try to get real-time data from cache
      const cachedData = await cache.getRealTimeData(cacheKey);
      
      if (cachedData) {
        return res.json({
          status: 'success',
          data: cachedData,
          cached: true,
          realtime: true,
          timestamp: new Date().toISOString()
        });
      }
      
      // Store original res.json method
      const originalJson = res.json;
      
      // Override res.json to cache the response
      res.json = function(data) {
        // Cache the response if it's successful
        if (data.status === 'success' && data.data) {
          cache.setRealTimeData(cacheKey, data.data, ttl)
            .catch(err => {
              console.error('Real-time cache set error:', err.message);
            });
        }
        
        // Call original json method
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Real-time cache middleware error:', error.message);
      next(); // Continue without caching if Redis fails
    }
  };
};

// Cache invalidation middleware
const invalidateCache = (pattern) => {
  return async (req, res, next) => {
    try {
      const schoolId = req.user?.school_id || req.body?.school_id || req.query?.school_id;
      
      // Store original res.json method
      const originalJson = res.json;
      
      // Override res.json to invalidate cache after successful operations
      res.json = function(data) {
        // Invalidate cache if operation was successful
        if (data.status === 'success') {
          if (schoolId) {
            // Invalidate school-specific cache
            cache.clearSchoolCache(schoolId)
              .catch(err => {
                console.error('Cache invalidation error:', err.message);
              });
          } else {
            // Invalidate global cache
            cache.clearAllCache()
              .catch(err => {
                console.error('Global cache invalidation error:', err.message);
              });
          }
        }
        
        // Call original json method
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Cache invalidation middleware error:', error.message);
      next(); // Continue without cache invalidation if Redis fails
    }
  };
};

// Cache statistics middleware
const cacheStatsMiddleware = async (req, res, next) => {
  try {
    const stats = await cache.getCacheStats();
    req.cacheStats = stats;
    next();
  } catch (error) {
    console.error('Cache stats middleware error:', error.message);
    next();
  }
};

module.exports = {
  cacheMiddleware,
  schoolCacheMiddleware,
  realTimeCacheMiddleware,
  invalidateCache,
  cacheStatsMiddleware
};
