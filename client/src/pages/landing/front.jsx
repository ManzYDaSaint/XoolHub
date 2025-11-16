// src/App.js
import { Link } from "react-router-dom";
import {
  AlarmClockPlus,
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle,
  TrendingUp,
  Shield,
  Video,
  Gift,
} from "lucide-react";
import CustomBtn from "./components/ui/button";
import Schools from "./components/clients";
import Navbar from "./components/navbar";
import HeaderBtn from "./components/ui/headerBtn"; 
import FeatureSection from "./components/feature";
import Testimonials from "./components/testimony";
import SubscriptionOptions from "./components/subscription";
import Footer from "./components/footer";
import PilotBanner from "./components/banner";
import ModernHeroShowcase from "./components/ModernHeroShowcase";
import ParentPortalShowcase from "./components/ParentPortalShowcase";
import SEO from "../../components/SEO";
import { motion } from "framer-motion";
import { trackEvent } from "../../utils/analytics";

function Landing() {
  const track = (eventName, props = {}) => {
    try {
      trackEvent(eventName, props);
    } catch (_) {}
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "XoolHub",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "description": "Comprehensive multi-school information management system designed to streamline student data, classes, subjects, attendance tracking, and parent-teacher communication for educational institutions.",
    "url": "https://xoolhub.com",
    "author": {
      "@type": "Organization",
      "name": "XoolHub",
      "url": "https://xoolhub.com",
      "logo": "https://xoolhub.com/logo.png"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MK",
      "description": "Free trial available",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    },
    "featureList": [
      "Student Information Management",
      "Multi-User Portal System",
      "Class Scheduling",
      "Multi-School Support",
      "Attendance Tracking",
      "parent-teacher Communication",
      "Fee Management",
      "Report Generation",
      "Disciplinary Records",
      "Telegram Bot Integration",
      "Mobile Responsive Design",
      "Security & Data Protection"
    ],
    "screenshot": "https://xoolhub.com/logo.png",
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SEO 
        title="Multi-School Information Management System"
        description="Transform your school administration with XoolHub - the ultimate multi-school management platform. Streamline student data, scheduling, attendance, and more. Start your free trial today!"
        keywords="school management system, multi-school platform, student information system, class scheduling, attendance tracking, school administration software, education management, school ERP, student database, academic management, parent portal, teacher portal, school communication, Telegram bot, school fees management, disciplinary records, school reports, education software, student tracking, academic records, school automation, digital school management, school administration, education technology, school management software, student information management, class management, school data management, education platform, school system, academic tracking, school analytics, parent communication, teacher management, school operations, education solutions, school productivity, digital education, school efficiency, education innovation, school modernization, academic administration, student lifecycle management, school workflow, education automation, school digitalization, academic excellence, school performance, education transformation, school optimization, student success, academic achievement, school growth, education advancement, school development, academic progress, school improvement, education enhancement, school innovation, academic innovation, student development, school advancement, education progress, school evolution, academic evolution, student growth, school transformation, education revolution, school revolution, academic revolution, student revolution, school breakthrough, education breakthrough, academic breakthrough, student breakthrough, school milestone, education milestone, academic milestone, student milestone, school achievement, education achievement, academic achievement, student achievement, school success, education success, academic success, student success"
        url="/"
        structuredData={structuredData}
      />
      <PilotBanner />
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section - simplified */}
      <section className="relative py-20 px-4 overflow-hidden top-20 mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
          <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-6"
              >
                <Gift className="h-5 w-5 mr-2" />
                Limited Time Offer - 50% Off for 1 Year
              </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              All‑in‑one <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> School Management </span> for admins, teachers, and parents
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Save time on administration, improve fee collection, and keep parents in the loop—without IT hassle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to={"/register"} aria-label="Start free trial" onClick={() => track('cta_register_click')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to={"/contact"} aria-label="Request a demo" onClick={() => track('cta_demo_click')} className="border-2 border-blue-600 text-blue-700 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                <Video className="h-6 w-6 mr-2" />
                Request a demo
              </Link>
            </motion.div>

            <div className="mt-3">
              <Link to={"https://youtu.be/ZehgVCsKzIE?si=A9_VPuKA_pw1WGWd"} onClick={() => track('cta_watch_overview')} className="text-blue-700 hover:text-blue-800 underline underline-offset-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                Watch Demo Video
              </Link>
            </div>

            <div className="mt-10">
              <ModernHeroShowcase />
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500 font-medium">Trusted by schools and education partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="Trustees">
            <Schools />
          </div> 
        </div>
      </section>

      {/* Why Choose Us - concise benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex"><HeaderBtn>Why Choose Us</HeaderBtn></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: BadgeDollarSign,
                title: "Cut admin workload",
                description: "Automate routine tasks and free staff for core educational work.",
                color: "from-green-500 to-emerald-500",
                delay: 0.2
              },
              {
                icon: AlarmClockPlus,
                title: "Faster operations",
                description: "Complete daily workflows in minutes with smart defaults.",
                color: "from-blue-500 to-indigo-500",
                delay: 0.4
              },
              {
                icon: BriefcaseBusiness,
                title: "Clear oversight",
                description: "Get real-time insights across classes, fees, and communication.",
                color: "from-purple-500 to-pink-500",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="text-white" size={40} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - enhanced timeline */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex"><HeaderBtn>How It Works</HeaderBtn></div>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Go from setup to daily operations and clear results—fast.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 rounded"></div>

            {[ 
              { num: 1, title: "Create an account", desc: "Create an account and add your school and staff.", icon: AlarmClockPlus, bullets: ["Guided onboarding"], color: "from-blue-600 to-indigo-600" },
              { num: 2, title: "Run daily operations", desc: "Attendace, Assessments, and Fees. etc", icon: CheckCircle, bullets: ["Smart defaults", "Mobile-friendly"], color: "from-indigo-600 to-purple-600" },
              { num: 3, title: "See results instantly", desc: "Track payments, engagement, and academic progress. etc", icon: TrendingUp, bullets: ["Real-time dashboards", "Exportable reports"], color: "from-purple-600 to-pink-600" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative grid md:grid-cols-2 gap-6 items-center mb-10 md:mb-14 ${index % 2 === 0 ? '' : 'md:direction-rtl'}`}
              >
                <div className={`order-2 md:order-${index % 2 === 0 ? '1' : '2'} md:direction-ltr`}>
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow`}>{step.num}</div>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow`}>
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.desc}</p>
                    <ul className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`order-1 md:order-${index % 2 === 0 ? '2' : '1'} md:direction-ltr`}> 
                  <div className="relative flex md:justify-center">
                    <div className={`hidden md:flex absolute top-6 ${index % 2 === 0 ? '-left-3' : '-right-3'} w-6 h-6 rounded-full bg-white border-2 border-indigo-300`}></div>
                    <div className="w-full md:w-5/6 h-28 sm:h-32 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-sm">
                      Visual placeholder
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to={"/register"} className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
              Get started now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (full list) */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="features">
            <FeatureSection />
          </div>
        </div>
      </section>

      {/* Parent Portal Showcase */}
      <ParentPortalShowcase />

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="Testimonials">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Security / Support - elevated design */}
      <section id="security" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex"><HeaderBtn>Security & Support</HeaderBtn></div>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Enterprise-grade protection and hands-on guidance—so you can focus on learning outcomes.</p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
              <div className="p-[1px]">
                <div className="rounded-3xl bg-white">
                  <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                      {/* Left: Security highlights */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Built-in protection by design</h3>
                        <p className="text-gray-600 mb-6">Role-based access controls, encrypted data at rest and in transit, and reliable daily backups.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { icon: Shield, label: "Encryption at rest & transit" },
                            { icon: CheckCircle, label: "Role-based access control" },
                            { icon: CheckCircle, label: "Daily automated backups" },
                            { icon: CheckCircle, label: "Audit-friendly logs" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-800">{item.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {['Data isolation', 'Secure hosting', 'Regular updates'].map((b, i) => (
                            <span key={i} className="inline-flex items-center text-xs font-semibold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">{b}</span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Support details */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Dedicated support every step</h3>
                        <p className="text-gray-600 mb-6">From onboarding to roll-out and beyond—we train your team and stay available.</p>
                        <div className="space-y-3">
                          {[
                            { title: 'Guided onboarding', desc: 'We configure terms, classes, and roles with you.' },
                            { title: 'Teacher & bursar training', desc: 'Live sessions and quick-start guides.' },
                            { title: 'Priority helpdesk', desc: 'Fast responses via email and WhatsApp.' }
                          ].map((s, i) => (
                            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                              <p className="font-semibold text-gray-900">{s.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                          <Link to={'/contact'} className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                            Talk to support
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 relative bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <SubscriptionOptions />
          </div>
        </div>
      </section>

      {/* CTA Section - simplified */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Main Heading */}
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Transform the way you manage your school
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl text-gray-700 font-medium mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Experience seamless administration, real-time insights, and effortless collaboration—all in one platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={"/register"}>
                  <CustomBtn>Try For Free</CustomBtn>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={"/contact"}>
                  <HeaderBtn>Request Demo</HeaderBtn>
                </Link>
              </motion.div>
            </motion.div>
            {/* Quick assurances */}
            <motion.div 
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { icon: CheckCircle, text: "One-term free trial" },
                { icon: Shield, text: "No credit card required" },
                { icon: TrendingUp, text: "Setup in under 24 hours" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{feature.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ - concise */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-flex"><HeaderBtn>FAQs</HeaderBtn></div>
          </div>
          <div className="space-y-4">
            {[
              { q: "How long does setup take?", a: "Most schools are ready within 24 hours with our guided onboarding." },
              { q: "Can we migrate existing data?", a: "Yes. We support CSV imports for students, classes, and fees." },
              { q: "How is data secured?", a: "Role-based access, encryption in transit and at rest, and daily backups." },
              { q: "Do teachers/parents need training?", a: "The UI is simple. We also provide quick-start guides and support." }
            ].map((item, i) => (
              <div key={i} className="p-4 md:p-5 rounded-xl bg-white border border-slate-200">
                <p className="font-semibold text-gray-900">{item.q}</p>
                <p className="text-gray-700 mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;
