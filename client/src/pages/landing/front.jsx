// src/App.js
import React, { Suspense, lazy } from "react";
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
  Clock,
  Globe,
} from "lucide-react";

import Navbar from "./components/navbar";
import HeaderBtn from "./components/ui/headerBtn"; 
import FeatureSection from "./components/feature";
import Testimonials from "./components/testimony";
import SubscriptionOptions from "./components/subscription";
import Footer from "./components/footer";
import PilotBanner from "./components/banner";
import SEO from "../../components/SEO";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "../../utils/analytics";

// lazy-load heavy showcases/clients
const Schools = lazy(() => import("./components/clients"));
const ModernHeroShowcase = lazy(() => import("./components/ModernHeroShowcase"));
const ParentPortalShowcase = lazy(() => import("./components/ParentPortalShowcase"));

// determine if user prefers reduced motion and use that to lower animation intensity
function Landing() {
   const track = (eventName, props = {}) => {
     try {
       trackEvent(eventName, props);
     } catch (_) {}
   };
   // move hook inside component (hooks must be called inside component)
   const prefersReducedMotion = useReducedMotion();
 
   // helper to return motion props only when animations are allowed
   const getMotionProps = (initial, animate, transition) => {
     return prefersReducedMotion ? {} : { initial, animate, transition };
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

  const steps = [
    {
      num: 1,
      title: "Simple Setup & Onboarding",
      desc: "Get your school up and running in no time. Our intuitive setup wizard guides you through every step, from creating your account to configuring your school settings.",
      icon: AlarmClockPlus,
      bullets: ["Guided onboarding"],
    },
    {
      num: 2,
      title: "Effortless Daily Management",
      desc: "Handle attendance, grading, scheduling and communication all from one central dashboard. Empower your teachers and staff to focus on what matters most: Education.",
      icon: CheckCircle,
      bullets: ["Attendance tracking", "Grading", "Scheduling", "Communication"],
    },
    { 
      num: 3,
      title: "Parent Portal & Communication",
      desc: "Keep everyone connected. Dedicated portals allow parents to track progress and receive announcements, updates, and notifications.",
      icon: TrendingUp,
      bullets: ["Parent portal", "Communication", "Announcements"],
    },
    {
      num: 4,
      title: "Reporting & Analytics",
      desc: "Gain valuable insights with powerful, easy to generate reports. Track student performance, attendance trends, and administrative data to make informed decisions.",
      icon: TrendingUp,
      bullets: ["Student performance", "Attendance trends", "Informed decisions"],
    },
  ];


  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-white text-blue-600 px-3 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-600">Skip to main content</a>
      <main id="main-content" role="main" className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
       <section aria-labelledby="hero-heading" className="relative py-20 px-4 overflow-hidden top-20 mb-20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto text-center">
           <motion.div
                 {...getMotionProps({ scale: 0.9 }, { scale: 1 }, { duration: 0.6, delay: 0.2 })}
                 className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-6"
               >
                 <Gift className="h-5 w-5 mr-2" aria-hidden="true" />
                 Limited Time Offer - 50% Off for 1 Year
               </motion.div>
             <motion.h1 id="hero-heading"
               className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900"
               {...getMotionProps({ opacity: 0, y: -20 }, { opacity: 1, y: 0 }, { duration: 0.5 })}
             >
               All‑in‑one <span className="sm:bg-gradient-to-r sm:from-blue-600 sm:to-purple-600 sm:bg-clip-text sm:text-transparent text-gray-900"> School Management </span> for admins, teachers, and parents
             </motion.h1>

             <motion.p
               className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
               {...getMotionProps({ opacity: 0, y: -10 }, { opacity: 1, y: 0 }, { duration: 0.5, delay: 0.1 })}
             >
               Save time on administration, improve fee collection, and keep parents in the loop—without IT hassle.
             </motion.p>

             <motion.div
               {...getMotionProps({ opacity: 0, y: 10 }, { opacity: 1, y: 0 }, { duration: 0.4, delay: 0.2 })}
               className="flex flex-col sm:flex-row gap-4 justify-center"
             >
               <Link to={"/register"} aria-label="Start free trial" onClick={() => track('cta_register_click')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                 Start free trial
                 <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
               </Link>
               <Link to={"/contact"} aria-label="Request a demo" onClick={() => track('cta_demo_click')} className="border-2 border-blue-600 text-blue-700 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                 <Video className="h-6 w-6 mr-2" aria-hidden="true" />
                 Request a demo
               </Link>
             </motion.div>

             <div className="mt-3">
               <a href="https://youtu.be/ZehgVCsKzIE?si=A9_VPuKA_pw1WGWd" target="_blank" rel="noopener noreferrer" onClick={() => track('cta_watch_overview')} className="text-blue-700 hover:text-blue-800 underline underline-offset-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2" aria-label="Watch demo video (opens in new tab)">
                 Watch Demo Video
               </a>
             </div>

             <div className="mt-10">
               <Suspense fallback={<div className="py-12 text-center">Loading showcase…</div>}>
                 <ModernHeroShowcase />
               </Suspense>
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
             <Suspense fallback={<div className="py-8 text-center text-sm text-gray-500">Loading partners…</div>}>
               <Schools />
             </Suspense>
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
             <motion.h2 
                         className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 mt-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight"
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                     >
                         Built for schools <br className="hidden md:block" />that lead.
                     </motion.h2>
             <p className="text-lg text-slate-600 max-w-6xl mx-auto text-balance">
               Modern schools demand excellence. Our platform streamines administration while empowering educators to focus on what truly matters.
             </p>
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
                 {...getMotionProps({ opacity: 0, y: 30 }, { opacity: 1, y: 0 }, { duration: 0.8, delay: feature.delay })}
                 whileHover={prefersReducedMotion ? {} : { y: -10 }}
               >
                 <div role="group" aria-labelledby={`feature-${index}-title`} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                   <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                     <feature.icon className="text-white" size={40} aria-hidden="true" />
                   </div>
                   <h3 id={`feature-${index}-title`} className="text-xl md:text-2xl font-bold mb-4 sm:bg-gradient-to-r sm:from-blue-700 sm:to-purple-700 sm:bg-clip-text sm:text-transparent text-gray-900">
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
       <section className="py-24 bg-white">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         {/* Header */}
         <div className="text-center mb-20">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
           >
             <div className="inline-flex"><HeaderBtn>How It Works</HeaderBtn></div>
           <motion.h2 
                         className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 mt-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight"
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                     >
                         Go from setup to daily operations <br className="hidden md:block" /> and clear results—fast.
                     </motion.h2>
             <p className="text-lg text-slate-600 max-w-2xl mx-auto text-balance">
               A streamlined journey that takes you from initial setup through daily operations to powerful insights—all in four simple steps.
             </p>
           </motion.div>
         </div>

         {/* Timeline */}
         <ol aria-label="Onboarding steps" className="space-y-0 max-w-4xl mx-auto list-none md:pl-6">
           {steps.map((step, index) => (
             <motion.li
               key={index}
               {...getMotionProps({ opacity: 0, x: -20 }, { opacity: 1, x: 0 }, { duration: 0.5, delay: index * 0.1 })}
               viewport={{ once: true, margin: "-100px" }}
               className="relative"
             >
               <div className="flex gap-8">
                 {/* Left Column - Step Number & Connector */}
                 <div className="flex flex-col items-center w-20">
                   {/* Step Circle */}
                   <div className="relative z-10 mb-8">
                     <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-lg" aria-hidden="true">
                       {step.num}
                     </div>
                   </div>

                   {/* Connecting Line */}
                   {index < steps.length - 1 && (
                     <div className="w-1 h-32 bg-gradient-to-b from-indigo-200 to-slate-100 rounded-full" aria-hidden="true" />
                   )}
                 </div>

                 {/* Right Column - Content */}
                 <div className="pb-16 flex-1 pt-2">
                   <div className="space-y-4">
                     <div>
                       <h3 className="text-2xl font-bold text-slate-900 mb-3">
                         {step.title}
                       </h3>
                       <p className="text-slate-600 leading-relaxed text-base mb-6">
                         {step.desc}
                       </p>
                     </div>

                     {/* Bullets with Icon */}
                     <div className="space-y-2.5">
                       {step.bullets.map((bullet, i) => (
                         <div key={i} className="flex items-center gap-3 text-slate-700">
                           <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 border border-blue-200" aria-hidden="true">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                           </div>
                           <span className="text-sm font-medium">{bullet}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             </motion.li>
           ))}
         </ol>

         {/* CTA */}
         <motion.div 
             className="text-center mt-16"
             {...getMotionProps(itemVariants.hidden, itemVariants.visible, itemVariants.visible.transition)}
         >
             <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl p-8 border border-white/30 max-w-4xl mx-auto">
               <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                 Ready to Transform Your <br className="hidden md:block" /> School?
               </h3>
               <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
               Join hundreds of schools that have simplified their daily operations and enhanced community engagement. Get started today with a personalised Demo
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                 <motion.div {...getMotionProps({}, {}, {})} whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }} whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}>
                   <Link to={"/contact"} className="inline-flex border-2 border-purple-600 text-purple-600 px-8 py-2 rounded-xl font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2" aria-label="Request a free demo" onClick={() => track('cta_request_demo_click')}>
                     Request a Free Demo
                     <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                   </Link>
                 </motion.div>
               </div>

             {/* Trust Indicators */}
             <div className="mt-8 pt-6 border-t border-gray-200">
                 <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                   <div className="flex items-center space-x-2">
                     <Shield className="h-4 w-4 text-green-500" aria-hidden="true" />
                     <span>Secure & Private</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <Clock className="h-4 w-4 text-blue-500" aria-hidden="true" />
                     <span>24/7 Support</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <Globe className="h-4 w-4 text-purple-500" aria-hidden="true" />
                     <span>Multi-School Support</span>
                   </div>
                 </div>
               </div>

             </div>
           </motion.div>
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
       <Suspense fallback={<div className="py-12 text-center">Loading parent portal…</div>}>
         <ParentPortalShowcase />
       </Suspense>

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
                                 <item.icon className="w-5 h-5 text-white" aria-hidden="true" />
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
                           <Link to={'/contact'} className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2" aria-label="Talk to support">
                             Talk to support
                             <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
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
       </main>
    </>
   );
 }
 
 export default Landing;
