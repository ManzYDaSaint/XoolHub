import React, { useState, useEffect, useMemo } from "react";
import { 
  Scroll, 
  Book, 
  Users, 
  Shield, 
  Scale, 
  Lock, 
  AlertTriangle,  
  Mail, 
  ChevronRight,
  Info,
  GraduationCap,
  CreditCard,
  Clock,
  FileText
} from "lucide-react";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = useMemo(() => [
    { id: "introduction", title: "Introduction", icon: Book },
    { id: "definitions", title: "Definitions", icon: FileText },
    { id: "user-responsibilities", title: "User Responsibilities", icon: Users },
    { id: "data-protection", title: "Data Protection & Privacy", icon: Shield },
    { id: "student-privacy", title: "Student Privacy Rights", icon: GraduationCap },
    { id: "intellectual-property", title: "Intellectual Property", icon: Scale },
    { id: "payment-terms", title: "Payment Terms", icon: CreditCard },
    { id: "service-availability", title: "Service Availability", icon: Clock },
    { id: "termination", title: "Termination", icon: AlertTriangle },
    { id: "liability", title: "Limitation of Liability", icon: Lock },
    { id: "changes", title: "Changes to Terms", icon: Info },
    { id: "contact", title: "Contact Information", icon: Mail }
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
                        <Scroll className="h-8 w-8" />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold">Terms of Service</h1>
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
                          <Book className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">1. Introduction</h2>
                      </div>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-6">
                          Welcome to <strong>XoolHub</strong>, a comprehensive educational management system designed to streamline school operations, enhance learning experiences, and connect educational communities. By accessing or using our platform, you agree to be bound by these Terms of Service.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-blue-800 font-medium mb-2">Important Notice</p>
                              <p className="text-blue-700 text-sm">
                                These terms govern your use of our educational platform, including student information systems, parent portals, teacher tools, and administrative features. Please read them carefully.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Definitions */}
                    <section id="definitions" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">2. Definitions</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h3 className="font-semibold text-gray-900 mb-3">"Service" or "Platform"</h3>
                          <p className="text-gray-700 text-sm">Refers to the XoolHub educational management system, including all features, tools, and services provided.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h3 className="font-semibold text-gray-900 mb-3">"User" or "You"</h3>
                          <p className="text-gray-700 text-sm">Any individual or entity accessing or using our platform, including students, parents, teachers, and administrators.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h3 className="font-semibold text-gray-900 mb-3">"Educational Data"</h3>
                          <p className="text-gray-700 text-sm">Student records, academic information, attendance data, and other educational content processed through our platform.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h3 className="font-semibold text-gray-900 mb-3">"School" or "Institution"</h3>
                          <p className="text-gray-700 text-sm">Educational institutions that have subscribed to and are using our platform for their operations.</p>
                        </div>
                      </div>
                    </section>

                    {/* User Responsibilities */}
                    <section id="user-responsibilities" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">3. User Responsibilities</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Users className="h-5 w-5 text-green-500 mr-2" />
                            Account Management
                          </h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Provide accurate, complete, and up-to-date information during account creation
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Maintain the confidentiality of your login credentials and account information
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Notify us immediately of any unauthorized access or security breaches
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Update your information promptly when changes occur
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="h-5 w-5 text-blue-500 mr-2" />
                            Acceptable Use
                          </h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Use the platform only for legitimate educational purposes
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Do not engage in any illegal, harmful, or unauthorized activities
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Do not attempt to circumvent security measures or access restricted areas
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Do not share inappropriate content or engage in harassment
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Data Protection */}
                    <section id="data-protection" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                          <Shield className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">4. Data Protection & Privacy</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="h-5 w-5 text-blue-600 mr-2" />
                            Data Security
                          </h3>
                          <p className="text-gray-700 mb-4">
                            We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.
                          </p>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• End-to-end encryption for sensitive data transmission</li>
                            <li>• Regular security updates and vulnerability assessments</li>
                            <li>• Access controls and authentication protocols</li>
                            <li>• Secure data backup and recovery procedures</li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="h-5 w-5 text-green-600 mr-2" />
                            Privacy Rights
                          </h3>
                          <p className="text-gray-700 mb-4">
                            We respect your privacy and comply with applicable data protection laws, including FERPA, COPPA, and GDPR.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">Your Rights</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Access your personal data</li>
                                <li>• Request data correction</li>
                                <li>• Request data deletion</li>
                                <li>• Data portability</li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">Our Commitments</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Transparent data practices</li>
                                <li>• Minimal data collection</li>
                                <li>• Secure data storage</li>
                                <li>• No unauthorized sharing</li>
                              </ul>
                            </div>
                          </div>
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

                    {/* Intellectual Property */}
                    <section id="intellectual-property" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-red-100 p-3 rounded-xl mr-4">
                          <Scale className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">6. Intellectual Property Rights</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">Platform Ownership</h3>
                          <p className="text-gray-700 mb-4">
                            XoolHub and all its features, content, and functionality are owned by us and protected by intellectual property laws.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-2xl mb-2">©</div>
                              <h4 className="font-medium text-gray-900">Copyright</h4>
                              <p className="text-sm text-gray-600">Original content and code</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-2xl mb-2">™</div>
                              <h4 className="font-medium text-gray-900">Trademark</h4>
                              <p className="text-sm text-gray-600">Brand names and logos</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-2xl mb-2">⚡</div>
                              <h4 className="font-medium text-gray-900">Trade Secrets</h4>
                              <p className="text-sm text-gray-600">Proprietary algorithms</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">User Content</h3>
                          <p className="text-gray-700">
                            You retain ownership of content you create and share through our platform, while granting us necessary licenses to provide our services.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Payment Terms */}
                    <section id="payment-terms" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                          <CreditCard className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">7. Payment Terms</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">Subscription Fees</h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Subscription fees are billed in advance on a monthly or annual basis</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>All fees are non-refundable unless otherwise specified</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>We may change pricing with 30 days' notice</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Service Availability */}
                    <section id="service-availability" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-orange-100 p-3 rounded-xl mr-4">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">8. Service Availability</h2>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          We strive to maintain high service availability but cannot guarantee uninterrupted access.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Uptime Commitment</h4>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-green-800">Target Uptime</span>
                                <span className="text-lg font-bold text-green-600">99.5%</span>
                              </div>
                              <p className="text-xs text-green-700">Monthly availability target</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Maintenance Windows</h4>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Scheduled Maintenance</p>
                                <p>Weekends: 2-6 AM CAT</p>
                                <p>Emergency: As needed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Termination */}
                    <section id="termination" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-red-100 p-3 rounded-xl mr-4">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">9. Termination</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">Account Termination</h3>
                          <p className="text-gray-700 mb-4">
                            We may suspend or terminate your account for violations of these terms or other reasons.
                          </p>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Immediate termination for serious violations</li>
                            <li>• 30-day notice for other terminations</li>
                            <li>• Data export options before termination</li>
                            <li>• Appeal process for disputed terminations</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section id="liability" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-gray-100 p-3 rounded-xl mr-4">
                          <Lock className="h-6 w-6 text-gray-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">10. Limitation of Liability</h2>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          Our liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-yellow-800 font-medium mb-1">Important Legal Notice</p>
                              <p className="text-yellow-700 text-sm">
                                This limitation does not apply to damages caused by our gross negligence or willful misconduct.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Changes to Terms */}
                    <section id="changes" className="scroll-mt-24">
                      <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                          <Info className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">11. Changes to Terms</h2>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          We may update these terms periodically. Material changes will be communicated with advance notice.
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
                          <Mail className="h-6 w-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">12. Contact Information</h2>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Get in Touch</h3>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <Mail className="h-5 w-5 text-purple-600 mr-3" />
                                <div>
                                  <p className="font-medium text-gray-900">Email Support</p>
                                  <p className="text-sm text-gray-600">support@xoolhub.com</p>
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
                            <h3 className="font-semibold text-gray-900 mb-4">Legal Inquiries</h3>
                            <div className="space-y-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">Terms Questions</h4>
                                <p className="text-sm text-gray-600">legal@xoolhub.com</p>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">Privacy Concerns</h4>
                                <p className="text-sm text-gray-600">privacy@xoolhub.com</p>
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

export default TermsOfService;
