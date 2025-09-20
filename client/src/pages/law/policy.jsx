import React, { useState, useEffect, useMemo } from "react";
import { 
  Lock, 
  Eye, 
  Database, 
  Bell, 
  Trash2, 
  Globe, 
  MessageCircle,
  ChevronRight,
  Info,
  Shield,
  User,
  GraduationCap,
  AlertTriangle,
  Clock,
  Mail,
  Scroll,
  CheckCircle,
  Users,
  Settings
} from "lucide-react";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = useMemo(() => [
    { id: "introduction", title: "Introduction", icon: Lock },
    { id: "information-collection", title: "Information We Collect", icon: Eye },
    { id: "data-usage", title: "How We Use Your Data", icon: Database },
    { id: "data-sharing", title: "Information Sharing", icon: Users },
    { id: "student-privacy", title: "Student Privacy Rights", icon: GraduationCap },
    { id: "data-security", title: "Data Security", icon: Shield },
    { id: "data-retention", title: "Data Retention", icon: Trash2 },
    { id: "international-transfers", title: "International Transfers", icon: Globe },
    { id: "your-rights", title: "Your Rights", icon: User },
    { id: "cookies-tracking", title: "Cookies & Tracking", icon: Settings },
    { id: "policy-changes", title: "Policy Changes", icon: AlertTriangle },
    { id: "contact", title: "Contact Us", icon: MessageCircle }
  ], []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Track which section is currently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    };

    let timeoutId;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setActiveSection(entry.target.id);
          }, 100);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8 pt-40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Scroll className="mr-2 text-blue-600" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(section.id);
                          }}
                          className={`w-full text-left flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            activeSection === section.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {section.title}
                          <ChevronRight className="ml-auto h-3 w-3" />
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-white/20 p-3 rounded-xl mr-4">
                        <Lock className="h-8 w-8" />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold">Privacy Policy</h1>
                        <p className="text-blue-100 mt-2">XoolHub Educational Management System</p>
                      </div>
                    </div>
                    <div className="flex items-center text-blue-100">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-12">
                    {/* Introduction */}
                    <section id="introduction" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                          <Lock className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">1. Introduction</h2>
                      </div>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-6">
                          At <strong>XoolHub</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational management platform.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-blue-800 font-medium mb-2">Your Privacy Matters</p>
                              <p className="text-blue-700 text-sm">
                                We comply with applicable privacy laws including FERPA, COPPA, and GDPR. This policy applies to all users of our platform, including students, parents, teachers, and administrators.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Information Collection */}
                    <section id="information-collection" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                          <Eye className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">2. Information We Collect</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="h-5 w-5 text-blue-500 mr-2" />
                            Personal Information
                          </h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Name, email address, phone number, and contact information
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Account credentials and authentication information
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Profile information and preferences
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Communication records and support interactions
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <GraduationCap className="h-5 w-5 text-purple-500 mr-2" />
                            Educational Data
                          </h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Student academic records and grades
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Attendance records and behavioral data
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Class schedules and course information
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              parent and guardian contact information
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Database className="h-5 w-5 text-green-500 mr-2" />
                            Technical Information
                          </h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Device information and browser details
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              IP address and location data
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Usage patterns and platform interactions
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Cookies and similar tracking technologies
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Data Usage */}
                    <section id="data-usage" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                          <Database className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">3. How We Use Your Data</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                            Service Provision
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Provide and maintain our educational platform</li>
                            <li>• Process transactions and manage subscriptions</li>
                            <li>• Deliver educational content and resources</li>
                            <li>• Facilitate communication between users</li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Bell className="h-5 w-5 text-orange-500 mr-2" />
                            Communication
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Send important updates and notifications</li>
                            <li>• Provide customer support and assistance</li>
                            <li>• Share educational resources and announcements</li>
                            <li>• Respond to inquiries and feedback</li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Settings className="h-5 w-5 text-green-500 mr-2" />
                            Platform Improvement
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Analyze usage patterns to improve our services</li>
                            <li>• Develop new features and functionality</li>
                            <li>• Conduct research and analytics</li>
                            <li>• Ensure platform security and performance</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Data Sharing */}
                    <section id="data-sharing" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">4. Information Sharing</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                            Educational Partners
                          </h3>
                          <p className="text-gray-700 mb-4">
                            We may share information with schools, districts, and educational institutions to provide our services.
                          </p>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Student academic progress and records</li>
                            <li>• Attendance and behavioral information</li>
                            <li>• parent and guardian contact details</li>
                            <li>• Administrative and reporting data</li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="h-5 w-5 text-green-500 mr-2" />
                            Service Providers
                          </h3>
                          <p className="text-gray-700 mb-4">
                            We work with trusted third-party service providers who help us operate our platform.
                          </p>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Cloud hosting and data storage providers</li>
                            <li>• Payment processing services</li>
                            <li>• Communication and notification services</li>
                            <li>• Analytics and security providers</li>
                          </ul>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                            Legal Requirements
                          </h3>
                          <p className="text-gray-700 mb-4">
                            We may disclose information when required by law or to protect our rights and safety.
                          </p>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Court orders and legal processes</li>
                            <li>• Law enforcement requests</li>
                            <li>• Safety and security concerns</li>
                            <li>• Regulatory compliance requirements</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Student Privacy Rights */}
                    <section id="student-privacy" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                          <GraduationCap className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">5. Student Privacy Rights</h2>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start">
                          <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Special Protections for Students</h3>
                            <p className="text-gray-700 mb-4">
                              We provide enhanced privacy protections for student data in compliance with educational privacy laws.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">FERPA Compliance</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  <li>• Parental access to student records</li>
                                  <li>• Limited disclosure of educational records</li>
                                  <li>• Right to review and correct records</li>
                                  <li>• Consent requirements for data sharing</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">COPPA Compliance</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  <li>• Parental consent for data collection</li>
                                  <li>• Limited data collection from children</li>
                                  <li>• Secure handling of child data</li>
                                  <li>• Right to delete child information</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Data Security */}
                    <section id="data-security" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                          <Shield className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">6. Data Security</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="h-5 w-5 text-green-600 mr-2" />
                            Security Measures
                          </h3>
                          <p className="text-gray-700 mb-4">
                            We implement industry-standard security measures to protect your data.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Encryption</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• End-to-end encryption</li>
                                <li>• Secure data transmission</li>
                                <li>• Encrypted data storage</li>
                              </ul>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Access Controls</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Multi-factor authentication</li>
                                <li>• Role-based permissions</li>
                                <li>• Regular access reviews</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Database className="h-5 w-5 text-blue-500 mr-2" />
                            Data Protection
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Regular security audits and assessments</li>
                            <li>• Secure backup and recovery procedures</li>
                            <li>• Incident response and breach notification</li>
                            <li>• Employee training and awareness programs</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Data Retention */}
                    <section id="data-retention" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-red-100 p-3 rounded-xl mr-4">
                          <Trash2 className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">7. Data Retention</h2>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          We retain your information for as long as necessary to provide our services and comply with legal obligations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">active Accounts</h4>
                            <p className="text-sm text-gray-600">Data retained while account is active and for 3 years after closure</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Legal Requirements</h4>
                            <p className="text-sm text-gray-600">Some data may be retained longer for compliance purposes</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* International Transfers */}
                    <section id="international-transfers" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                          <Globe className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">8. International Data Transfers</h2>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          We may transfer your information to countries other than your own. We ensure appropriate safeguards are in place.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Transfer Safeguards</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Standard contractual clauses</li>
                            <li>• Adequacy decisions by relevant authorities</li>
                            <li>• Binding corporate rules</li>
                            <li>• Certification schemes</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Your Rights */}
                    <section id="your-rights" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                          <User className="h-6 w-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">9. Your Rights</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Eye className="h-5 w-5 text-blue-500 mr-2" />
                            Access and Control
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">Your Rights</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Access your personal data</li>
                                <li>• Correct inaccurate information</li>
                                <li>• Delete your data</li>
                                <li>• Restrict processing</li>
                                <li>• Data portability</li>
                                <li>• Object to processing</li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">How to Exercise</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Contact us directly</li>
                                <li>• Use account settings</li>
                                <li>• Submit a request form</li>
                                <li>• Contact your school administrator</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Cookies and Tracking */}
                    <section id="cookies-tracking" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-orange-100 p-3 rounded-xl mr-4">
                          <Settings className="h-6 w-6 text-orange-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">10. Cookies & Tracking</h2>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          We use cookies and similar technologies to enhance your experience and analyze platform usage.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Essential Cookies</h4>
                            <p className="text-sm text-gray-600">Required for platform functionality</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Analytics Cookies</h4>
                            <p className="text-sm text-gray-600">Help us improve our services</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Preference Cookies</h4>
                            <p className="text-sm text-gray-600">Remember your settings</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Policy Changes */}
                    <section id="policy-changes" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                          <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">11. Policy Changes</h2>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          We may update this Privacy Policy periodically. We will notify you of any material changes.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Material Changes</h4>
                            <p className="text-sm text-blue-800">30 days advance notice required</p>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-900 mb-2">Minor Updates</h4>
                            <p className="text-sm text-green-800">Effective immediately upon posting</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Contact Information */}
                    <section id="contact" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                          <MessageCircle className="h-6 w-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">12. Contact Us</h2>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Privacy Inquiries</h3>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <Mail className="h-5 w-5 text-purple-600 mr-3" />
                                <div>
                                  <p className="font-medium text-gray-900">Privacy Officer</p>
                                  <p className="text-sm text-gray-600">privacy@xoolhub.com</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="h-5 w-5 text-purple-600 mr-3 flex items-center justify-center">
                                  <span className="text-xs">📞</span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">Phone Support</p>
                                  <p className="text-sm text-gray-600">+265 886 563 330</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="h-5 w-5 text-purple-600 mr-3 flex items-center justify-center">
                                  <span className="text-xs">🕒</span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">Business Hours</p>
                                  <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM CAT</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Data Protection</h3>
                            <div className="space-y-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">Data Protection Officer</h4>
                                <p className="text-sm text-gray-600">dpo@xoolhub.com</p>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">Security Concerns</h4>
                                <p className="text-sm text-gray-600">security@xoolhub.com</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
