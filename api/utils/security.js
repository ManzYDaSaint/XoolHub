const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Advanced encryption utilities
class SecurityUtils {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.keyLength = 32;
    this.ivLength = 16;
    this.tagLength = 16;
    this.saltRounds = 12;
  }

  // Generate cryptographically secure random string
  generateSecureToken(length = 64) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Generate secure random bytes
  generateSecureBytes(length) {
    return crypto.randomBytes(length);
  }

  // Encrypt sensitive data
  encrypt(text, key) {
    try {
      const iv = crypto.randomBytes(this.ivLength);
      const cipher = crypto.createCipher(this.algorithm, key);
      cipher.setAAD(Buffer.from('xoolhub-password-reset', 'utf8'));
      
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const tag = cipher.getAuthTag();
      
      return {
        encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex')
      };
    } catch (error) {
      throw new Error('Encryption failed: ' + error.message);
    }
  }

  // Decrypt sensitive data
  decrypt(encryptedData, key) {
    try {
      const decipher = crypto.createDecipher(this.algorithm, key);
      decipher.setAAD(Buffer.from('xoolhub-password-reset', 'utf8'));
      decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
      
      let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error('Decryption failed: ' + error.message);
    }
  }

  // Hash password with advanced security
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new Error('Password hashing failed: ' + error.message);
    }
  }

  // Verify password with timing attack protection
  async verifyPassword(password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      // Always hash to prevent timing attacks
      await bcrypt.hash('dummy', 10);
      return false;
    }
  }

  // Generate secure JWT token
  generateJWT(payload, expiresIn = '15m') {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
      issuer: 'xoolhub',
      audience: 'password-reset'
    });
  }

  // Verify JWT token
  verifyJWT(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET, {
        issuer: 'xoolhub',
        audience: 'password-reset'
      });
    } catch (error) {
      throw new Error('Invalid token: ' + error.message);
    }
  }

  // Generate secure reset token with metadata
  generateResetToken(email, ip) {
    const payload = {
      email,
      ip,
      timestamp: Date.now(),
      nonce: this.generateSecureToken(16)
    };
    
    const token = this.generateSecureToken(64);
    const signature = this.generateSignature(token, payload);
    
    return {
      token,
      signature,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    };
  }

  // Generate signature for token verification
  generateSignature(token, payload) {
    const data = token + JSON.stringify(payload);
    const secret = process.env.JWT_SECRET || 'default-secret-for-testing';
    return crypto.createHmac('sha256', secret)
      .update(data)
      .digest('hex');
  }

  // Verify token signature
  verifyTokenSignature(token, payload, signature) {
    const expectedSignature = this.generateSignature(token, payload);
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  // Generate secure session ID
  generateSessionId() {
    return this.generateSecureToken(32);
  }

  // Hash sensitive data for logging
  hashForLogging(data) {
    return crypto.createHash('sha256')
      .update(data + process.env.LOGGING_SALT)
      .digest('hex')
      .substring(0, 16);
  }

  // Generate secure random password
  generateSecurePassword(length = 16) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
  }

  // Validate password strength
  validatePasswordStrength(password) {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      noCommon: !this.isCommonPassword(password),
      noSequential: !this.hasSequentialChars(password),
      noRepeated: !this.hasRepeatedChars(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    const strength = score >= 6 ? 'strong' : score >= 4 ? 'medium' : 'weak';
    
    // Require at least 4 checks to be valid, including basic requirements
    const basicRequirements = checks.length && checks.lowercase && checks.uppercase && checks.number;
    
    return {
      valid: basicRequirements && score >= 4,
      strength,
      score,
      checks
    };
  }

  // Check for common passwords
  isCommonPassword(password) {
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', 'admin', 'letmein', 'welcome', 'monkey',
      '1234567890', 'password1', 'qwerty123', 'dragon', 'master'
    ];
    
    return commonPasswords.includes(password.toLowerCase());
  }

  // Check for sequential characters
  hasSequentialChars(password) {
    const sequences = ['abcdefghijklmnopqrstuvwxyz', '0123456789', 'qwertyuiop'];
    const lowerPassword = password.toLowerCase();
    
    for (const sequence of sequences) {
      for (let i = 0; i <= sequence.length - 3; i++) {
        if (lowerPassword.includes(sequence.substring(i, i + 3))) {
          return true;
        }
      }
    }
    
    return false;
  }

  // Check for repeated characters
  hasRepeatedChars(password) {
    const repeated = /(.)\1{2,}/;
    return repeated.test(password);
  }

  // Generate secure CAPTCHA token
  generateCaptchaToken() {
    const challenge = this.generateSecureToken(8);
    const answer = this.hashForLogging(challenge);
    return { challenge, answer };
  }

  // Verify CAPTCHA token
  verifyCaptchaToken(challenge, answer) {
    const expectedAnswer = this.hashForLogging(challenge);
    return crypto.timingSafeEqual(
      Buffer.from(answer, 'hex'),
      Buffer.from(expectedAnswer, 'hex')
    );
  }

  // Generate secure nonce
  generateNonce() {
    return this.generateSecureToken(16);
  }

  // Create secure hash for data integrity
  createIntegrityHash(data) {
    return crypto.createHash('sha256')
      .update(JSON.stringify(data))
      .digest('hex');
  }

  // Verify data integrity
  verifyIntegrityHash(data, hash) {
    const expectedHash = this.createIntegrityHash(data);
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(expectedHash, 'hex')
    );
  }
}

// Security monitoring and alerting
class SecurityMonitor {
  constructor() {
    this.suspiciousActivities = new Map();
    this.alertThresholds = {
      failedAttempts: 5,
      suspiciousIPs: 3,
      rateLimitViolations: 10
    };
  }

  // Log security event
  logSecurityEvent(event, details) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      event,
      details,
      severity: this.getSeverity(event)
    };
    
    console.log(`[SECURITY] ${timestamp} - ${event}:`, details);
    
    // Check for suspicious patterns
    this.checkSuspiciousActivity(event, details);
    
    return logEntry;
  }

  // Get event severity
  getSeverity(event) {
    const highSeverityEvents = [
      'BRUTE_FORCE_ATTEMPT',
      'MULTIPLE_FAILED_ATTEMPTS',
      'SUSPICIOUS_IP_ACTIVITY',
      'TOKEN_MANIPULATION',
      'RATE_LIMIT_VIOLATION'
    ];
    
    return highSeverityEvents.includes(event) ? 'HIGH' : 'MEDIUM';
  }

  // Check for suspicious activity patterns
  checkSuspiciousActivity(event, details) {
    const ip = details.ip;
    const email = details.email;
    
    if (!this.suspiciousActivities.has(ip)) {
      this.suspiciousActivities.set(ip, {
        events: [],
        count: 0,
        firstSeen: Date.now()
      });
    }
    
    const activity = this.suspiciousActivities.get(ip);
    activity.events.push({ event, timestamp: Date.now(), details });
    activity.count++;
    
    // Alert if threshold exceeded
    if (activity.count >= this.alertThresholds.failedAttempts) {
      this.triggerSecurityAlert('SUSPICIOUS_IP_ACTIVITY', {
        ip,
        count: activity.count,
        events: activity.events
      });
    }
  }

  // Trigger security alert
  triggerSecurityAlert(alertType, details) {
    const alert = {
      type: alertType,
      timestamp: new Date().toISOString(),
      details,
      severity: 'HIGH'
    };
    
    console.error(`[SECURITY ALERT] ${alertType}:`, details);
    
    // In production, send to monitoring service
    // this.sendToMonitoringService(alert);
  }

  // Clean up old activities
  cleanup() {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    for (const [ip, activity] of this.suspiciousActivities.entries()) {
      if (now - activity.firstSeen > maxAge) {
        this.suspiciousActivities.delete(ip);
      }
    }
  }
}

// Initialize security utilities
const securityUtils = new SecurityUtils();
const securityMonitor = new SecurityMonitor();

// Cleanup old activities every hour
setInterval(() => securityMonitor.cleanup(), 60 * 60 * 1000);

module.exports = {
  securityUtils,
  securityMonitor,
  SecurityUtils,
  SecurityMonitor
};
