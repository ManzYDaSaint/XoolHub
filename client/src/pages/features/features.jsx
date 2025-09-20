import React from "react";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";
import SEO from "../../components/SEO";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  DollarSign, 
  BarChart3, 
  Shield, 
  Smartphone,
  School,
  Clock,
  FileText,
  Bot
} from "lucide-react";

const Features = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "XoolHub Features - complete School Management Solution",
    "description": "Discover all the powerful features of XoolHub school management system including student management, attendance tracking, parent communication, and more.",
    "url": "https://xoolhub.com/features",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "XoolHub",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "description": "Comprehensive multi-school information management system",
      "featureList": [
        "Student Information Management",
        "Multi-User Portal System", 
        "Attendance Tracking",
        "parent-teacher Communication",
        "Fee Management",
        "Academic Management",
        "Report Generation",
        "Disciplinary Records",
        "Multi-School Support",
        "Mobile Responsive Design"
      ]
    }
  };

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Multi-User Portal System",
      description: "Comprehensive portals for administrators, teachers, parents, bursars, and students with role-based access control.",
      benefits: ["Secure access control", "Customized dashboards", "Role-specific features"]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      title: "Student Information Management",
      description: "complete student lifecycle management from enrollment to graduation with academic history tracking.",
      benefits: ["Student profiles", "Academic records", "Promotion system"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Class & Academic Management",
      description: "Manage classes, subjects, terms, academic years, and examination systems including JCE and MSCE.",
      benefits: ["Class scheduling", "Subject management", "Examination system"]
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Attendance Tracking",
      description: "Real-time attendance marking with present/absent/late status and automated parent notifications.",
      benefits: ["Daily attendance", "Automated reports", "parent notifications"]
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-teal-600" />,
      title: "parent-teacher Communication",
      description: "Seamless communication through Telegram bots with conversation management and real-time notifications.",
      benefits: ["Telegram integration", "Real-time messaging", "Conversation history"]
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-600" />,
      title: "Financial Management",
      description: "Comprehensive fee management, payment tracking, expense management, and financial reporting.",
      benefits: ["Fee collection", "Payment tracking", "Financial reports"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      title: "Report Generation",
      description: "Detailed academic and financial reports with PDF generation and analytics dashboard.",
      benefits: ["Academic reports", "Financial analytics", "PDF export"]
    },
    {
      icon: <FileText className="w-8 h-8 text-red-600" />,
      title: "Disciplinary Records",
      description: "Manage disciplinary incidents with severity levels, follow-up tracking, and parent notifications.",
      benefits: ["Incident tracking", "Severity levels", "Follow-up system"]
    },
    {
      icon: <School className="w-8 h-8 text-pink-600" />,
      title: "Multi-School Support",
      description: "Manage multiple schools from a single platform with school-specific configurations and oversight.",
      benefits: ["Multi-tenant architecture", "School isolation", "Centralized management"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-cyan-600" />,
      title: "Mobile Responsive Design",
      description: "Fully responsive interface that works perfectly on all devices including smartphones and tablets.",
      benefits: ["Mobile-first design", "Cross-platform compatibility", "Touch-friendly interface"]
    },
    {
      icon: <Bot className="w-8 h-8 text-emerald-600" />,
      title: "Telegram Bot Integration",
      description: "Advanced Telegram bot features for attendance marking, parent communication, and notifications.",
      benefits: ["Mobile attendance", "Push notifications", "Bot automation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-gray-600" />,
      title: "Security & Data Protection",
      description: "Enterprise-grade security with JWT authentication, encrypted data, and compliance with data protection regulations.",
      benefits: ["JWT authentication", "Data encryption", "GDPR compliance"]
    }
  ];

  return (
    <>
      <SEO 
        title="Features - complete School Management Solution"
        description="Discover all the powerful features of XoolHub school management system including student management, attendance tracking, parent communication, fee management, and multi-school support."
        keywords="school management system features, student information system, attendance tracking, parent portal, teacher portal, school communication, fee management, academic management, school reports, multi-school platform, education software features, school ERP features"
        url="/features"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Powerful Features for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Modern Schools</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                XoolHub provides everything you need to manage your school efficiently. 
                From student records to parent communication, we've got you covered.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your free trial today and experience the power of XoolHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/register" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Features;
