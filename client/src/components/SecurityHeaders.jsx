import { useEffect } from 'react';

const SecurityHeaders = () => {
  useEffect(() => {
    // Add security headers to meta tags
    const addSecurityMeta = () => {
      // Remove existing security meta tags
      const existingTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"], meta[http-equiv="X-Content-Type-Options"], meta[http-equiv="X-XSS-Protection"]');
      existingTags.forEach(tag => tag.remove());

      // Add Content Security Policy
      const csp = document.createElement('meta');
      csp.setAttribute('http-equiv', 'Content-Security-Policy');
      csp.setAttribute('content', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://api.xoolhub.com; frame-src 'none'; object-src 'none';");
      document.head.appendChild(csp);

      // Add X-Content-Type-Options
      const contentType = document.createElement('meta');
      contentType.setAttribute('http-equiv', 'X-Content-Type-Options');
      contentType.setAttribute('content', 'nosniff');
      document.head.appendChild(contentType);

      // Note: X-Frame-Options cannot be set via meta tags
      // It must be set as an HTTP header on the server side

      // Add X-XSS-Protection
      const xssProtection = document.createElement('meta');
      xssProtection.setAttribute('http-equiv', 'X-XSS-Protection');
      xssProtection.setAttribute('content', '1; mode=block');
      document.head.appendChild(xssProtection);

      // Add Referrer Policy
      const referrerPolicy = document.createElement('meta');
      referrerPolicy.setAttribute('name', 'referrer');
      referrerPolicy.setAttribute('content', 'strict-origin-when-cross-origin');
      document.head.appendChild(referrerPolicy);
    };

    addSecurityMeta();

    // Prevent right-click context menu (optional security measure)
    const preventContextMenu = (e) => {
      e.preventDefault();
    };

    // Prevent F12, Ctrl+Shift+I, Ctrl+U (optional security measure)
    const preventDevTools = (e) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('keydown', preventDevTools);

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventDevTools);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SecurityHeaders;
