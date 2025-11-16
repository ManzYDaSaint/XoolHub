// Client-side input sanitization utilities

// Sanitize string input
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  return str
    .replace(/[<>"'%;()&+]/g, '') // Remove potentially dangerous characters
    .replace(/script/gi, '') // Remove script tags
    .replace(/javascript/gi, '') // Remove javascript
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
};

// Sanitize email input
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._-]/g, '') // Keep only valid email characters
    .substring(0, 255);
};

// Sanitize phone number
export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return '';
  
  return phone
    .replace(/[^0-9+\-\s()]/g, '') // Keep only valid phone characters
    .trim()
    .substring(0, 20);
};

// Sanitize name input
export const sanitizeName = (name) => {
  if (typeof name !== 'string') return '';
  
  return name
    .replace(/[^a-zA-Z\s]/g, '') // Keep only letters and spaces
    .trim()
    .substring(0, 100);
};

// Sanitize number input
export const sanitizeNumber = (num, min = 0, max = 999999) => {
  const parsed = parseFloat(num);
  if (isNaN(parsed)) return min;
  
  return Math.max(min, Math.min(max, parsed));
};

// Sanitize object recursively
export const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[0-9\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

// Validate password strength
export const validatePassword = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  const strength = score >= 4 ? 'strong' : score >= 3 ? 'medium' : 'weak';
  
  return {
    valid: checks.length && checks.lowercase && checks.uppercase && checks.number,
    strength,
    score,
    checks
  };
};

// Sanitize form data before submission
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    switch (key.toLowerCase()) {
      case 'email':
        sanitized[key] = sanitizeEmail(value);
        break;
      case 'phone':
        sanitized[key] = sanitizePhone(value);
        break;
      case 'name':
      case 'firstname':
      case 'lastname':
      case 'schoolname':
        sanitized[key] = sanitizeName(value);
        break;
      case 'amount':
      case 'price':
      case 'score':
        sanitized[key] = sanitizeNumber(value);
        break;
      default:
        sanitized[key] = sanitizeString(value);
    }
  }
  
  return sanitized;
};

// Prevent XSS in form inputs
export const preventXSS = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Sanitize API request data (validation removed)
export const prepareApiData = (data) => {
  const sanitized = sanitizeFormData(data);
  
  // Validation removed - only sanitization remains
  return sanitized;
};

const inputSanitizer = {
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  sanitizeName,
  sanitizeNumber,
  sanitizeObject,
  isValidEmail,
  isValidPhone,
  validatePassword,
  sanitizeFormData,
  preventXSS,
  prepareApiData
};

export default inputSanitizer;
