/**
 * Demo utility to show how validation errors will be displayed
 * This file demonstrates the toast notification system for validation errors
 */

import { handleValidationErrors, handleResponseValidationErrors } from './validationErrorHandler';

// Example validation error response from the API
const exampleValidationResponse = {
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "schoolName",
      "message": "School name must be between 2 and 200 characters"
    },
    {
      "field": "phone",
      "message": "Please provide a valid phone number"
    },
    {
      "field": "password",
      "message": "Password must be between 8 and 128 characters"
    },
    {
      "field": "password",
      "message": "Password must contain uppercase, lowercase, number, and special character"
    },
    {
      "field": "name",
      "message": "Name must be between 2 and 100 characters"
    },
    {
      "field": "name",
      "message": "Name can only contain letters and spaces"
    },
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
};

// Example of how to use the validation error handlers
export const demonstrateValidationErrors = () => {
  console.log('Demonstrating validation error handling...');
  
  // This would be called when handling a response with validation errors
  handleResponseValidationErrors(exampleValidationResponse);
  
  console.log('Each validation error will be displayed as a separate toast notification with:');
  console.log('- Field name and error message');
  console.log('- Staggered timing (200ms between each toast)');
  console.log('- Custom styling (red background, white text)');
  console.log('- 5-second duration');
  console.log('- Top-right positioning');
};

// Example of how errors would be handled in a try-catch block
export const simulateApiError = () => {
  const mockError = {
    response: {
      data: exampleValidationResponse
    }
  };
  
  console.log('Simulating API error with validation errors...');
  handleValidationErrors(mockError);
};

export default {
  demonstrateValidationErrors,
  simulateApiError,
  exampleValidationResponse
};
