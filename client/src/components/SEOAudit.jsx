import React, { useEffect, useState } from 'react';

const SEOAudit = () => {
  const [auditResults, setAuditResults] = useState({
    title: false,
    description: false,
    canonical: false,
    ogTags: false,
    twitterCards: false,
    structuredData: false,
    images: false,
    performance: false
  });

  useEffect(() => {
    const runSEOAudit = () => {
      const results = {
        title: document.title && document.title.length > 10 && document.title.length < 60,
        description: document.querySelector('meta[name="description"]')?.content?.length > 120 && document.querySelector('meta[name="description"]')?.content?.length < 160,
        canonical: !!document.querySelector('link[rel="canonical"]'),
        ogTags: !!document.querySelector('meta[property="og:title"]') && !!document.querySelector('meta[property="og:description"]'),
        twitterCards: !!document.querySelector('meta[name="twitter:card"]'),
        structuredData: !!document.querySelector('script[type="application/ld+json"]'),
        images: Array.from(document.querySelectorAll('img')).every(img => img.alt && img.alt.length > 0),
        performance: performance.now() < 3000 // Basic performance check
      };
      
      setAuditResults(results);
    };

    // Run audit after component mounts
    setTimeout(runSEOAudit, 1000);
  }, []);

  const getScore = () => {
    const total = Object.keys(auditResults).length;
    const passed = Object.values(auditResults).filter(Boolean).length;
    return Math.round((passed / total) * 100);
  };

  const score = getScore();

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">SEO Audit</h3>
        <span className={`text-xs px-2 py-1 rounded ${
          score >= 80 ? 'bg-green-100 text-green-800' : 
          score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {score}%
        </span>
      </div>
      
      <div className="space-y-1 text-xs">
        {Object.entries(auditResults).map(([key, passed]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className={passed ? 'text-green-600' : 'text-red-600'}>
              {passed ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p>Last checked: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default SEOAudit;
