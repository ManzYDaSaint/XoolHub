// src/App.js
import { Link } from "react-router-dom";
import {
  AlarmClockPlus,
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle,
  Video,
  Sparkles,
  TrendingUp,
  Shield,
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
import SEO from "../../components/SEO";
import { motion } from "framer-motion";

function Landing() {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            {/* Pilot Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row md:inline-flex items-center space-x-2 text-sm bg-white/80 backdrop-blur-md border-2 border-white/90 rounded-full px-4 py-2 shadow-lg">
                <span className="flex md:w-auto rounded-full bg-gradient-to-r from-blue-700 to-purple-700 px-4 py-1 text-xs text-white font-semibold">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Pilot
                  <ArrowRight className="h-3 w-3 ml-1 md:hidden" />
                </span>
                <span className="text-gray-700 font-medium">We've released this version for testing and feedback!</span>
                <ArrowRight className="h-4 w-4 hidden md:inline text-blue-600" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gray-900">Your Ultimate </span>
              <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Multi-School
              </span>
              <br />
              <span className="text-gray-900">Management Solution.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Focus on your school's success by teaching and providing education.{" "}
              <span className="font-semibold text-gray-800">Let us handle the system</span> and provide the right tools you need without the hassle.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={"/register"}>
                  <CustomBtn>Start Your Free Trial</CustomBtn>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <HeaderBtn>
                  <Video className="h-5 w-5 mr-2" />
                  Watch Demo
                </HeaderBtn>
              </motion.div>
            </motion.div>

            {/* Modern Hero Showcase */}
            <ModernHeroShowcase />
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

      {/* Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="inline-flex"><HeaderBtn>Why Choose Us</HeaderBtn></p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: BadgeDollarSign,
                title: "Cost Efficiency",
                description: "Reduces operational costs by eliminating the need for in-house IT staff, hardware upgrades and paper-based processes.",
                color: "from-green-500 to-emerald-500",
                delay: 0.2
              },
              {
                icon: AlarmClockPlus,
                title: "Time Savings",
                description: "Most of our Automation features help free up staff time for core educational tasks.",
                color: "from-blue-500 to-indigo-500",
                delay: 0.4
              },
              {
                icon: BriefcaseBusiness,
                title: "Ease Administration",
                description: "Reduces administrative workload by automating tasks and streamlining processes.",
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

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="features">
            <FeatureSection />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="Testimonials">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="pricing">
            <SubscriptionOptions />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Main Heading */}
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Transform the Way You <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Manage Schools
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-700 font-medium mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Experience seamless administration, real-time insights, and{" "}
              <span className="font-semibold text-gray-800">effortless collaboration</span>—all in one powerful platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={"/register"}>
                  <CustomBtn>Try For Free</CustomBtn>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <HeaderBtn>See XoolHub In Action</HeaderBtn>
              </motion.div>
            </motion.div>

            {/* Features List */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {[
                { icon: CheckCircle, text: "One-Term free trial", color: "from-green-500 to-emerald-500" },
                { icon: Shield, text: "No credit card required", color: "from-blue-500 to-indigo-500" },
                { icon: TrendingUp, text: "Setup in under 24 hours", color: "from-purple-500 to-pink-500" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-700 font-semibold text-center text-lg">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-16 pt-8 border-t border-gray-200/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <p className="text-sm text-gray-500 mb-4 font-medium">Trusted by educational institutions worldwide</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-300 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-20 h-8 bg-gray-300 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;
