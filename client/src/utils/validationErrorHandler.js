import { toast } from 'react-hot-toast';

/**
 * Handles validation errors by displaying them as toast notifications
 * @param {Object} error - The error object from API response
 * @param {string} fallbackMessage - Fallback message if no specific errors found
 */
export const handleValidationErrors = (error, fallbackMessage = "An error occurred. Please try again.") => {
  // Handle axios error responses with validation errors
  if (error.response && error.response.data && error.response.data.errors) {
    const validationErrors = error.response.data.errors;
    validationErrors.forEach((validationError, index) => {
      setTimeout(() => {
        toast.error(`${validationError.field}: ${validationError.message}`, {
          duration: 5000,
          position: 'top-right',
          style: {
            background: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '400px',
          },
        });
      }, index * 200); // Stagger the toasts by 200ms
    });
  } else if (error.response && error.response.data && error.response.data.message) {
    // Handle single error message
    toast.error(error.response.data.message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#fee2e2',
        color: '#dc2626',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
      },
    });
  } else {
    toast.error(fallbackMessage);
  }
};

/**
 * Handles validation errors from successful API responses (when success: false)
 * @param {Object} response - The API response object
 * @param {string} fallbackMessage - Fallback message if no specific errors found
 */
export const handleResponseValidationErrors = (response, fallbackMessage = "An error occurred. Please try again.") => {
  if (response.errors && Array.isArray(response.errors)) {
    // Show each validation error as a separate toast
    response.errors.forEach((error, index) => {
      setTimeout(() => {
        toast.error(`${error.field}: ${error.message}`, {
          duration: 5000,
          position: 'top-right',
          style: {
            background: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '400px',
          },
        });
      }, index * 200); // Stagger the toasts by 200ms
    });
  } else if (response.message) {
    toast.error(response.message);
  } else {
    toast.error(fallbackMessage);
  }
};

/**
 * Shows a success toast with custom styling
 * @param {string} message - Success message to display
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      maxWidth: '400px',
    },
  });
};

/**
 * Shows a general error toast with custom styling
 * @param {string} message - Error message to display
 */
export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#fee2e2',
      color: '#dc2626',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      maxWidth: '400px',
    },
  });
};
