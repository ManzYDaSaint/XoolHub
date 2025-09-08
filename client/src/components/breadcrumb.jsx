import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (pathname) => {
    const breadcrumbNames = {
      'about': 'About',
      'features': 'Features',
      'pricing': 'Pricing',
      'contact': 'Contact',
      'faq': 'FAQ',
      'login': 'Login',
      'register': 'Register',
      'forgot': 'Forgot Password',
      'administrator': 'Administrator Portal',
      'tdashboard': 'Teacher Portal',
      'parent': 'Parent Portal',
      'bursar': 'Bursar Portal',
      'super': 'Super Admin Portal',
      'policy': 'Privacy Policy',
      'terms': 'Terms of Service',
      'feedback': 'Feedback',
      'referral': 'Referral Program',
      'dashboard': 'Dashboard',
      'fees': 'Fees',
      'academics': 'Academics',
      'events': 'Events'
    };

    return breadcrumbNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
  };

  const generateBreadcrumbSchema = () => {
    const breadcrumbs = [
      { name: 'Home', url: 'https://xoolhub.com/' }
    ];

    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      breadcrumbs.push({
        name: getBreadcrumbName(pathname),
        url: `https://xoolhub.com${currentPath}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  };

  // Don't show breadcrumb on home page
  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <>
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Visual Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-3 text-sm">
            <li>
              <Link 
                to="/" 
                className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>
            
            {pathnames.map((pathname, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              
              return (
                <li key={pathname} className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  {isLast ? (
                    <span className="text-gray-900 font-medium">
                      {getBreadcrumbName(pathname)}
                    </span>
                  ) : (
                    <Link 
                      to={routeTo}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {getBreadcrumbName(pathname)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;