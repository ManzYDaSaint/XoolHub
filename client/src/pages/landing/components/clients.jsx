import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Building2, Users, Award, Globe, Shield } from 'lucide-react';
import Logo from '../schools/logo.png';

// Sample data for schools with enhanced information
const sampleSchools = [
  { logo: Logo, name: "St. Mary's Academy", type: "Private School", students: "500+" },
  { logo: Logo, name: "Lincoln High School", type: "Public School", students: "800+" },
  { logo: Logo, name: "International Academy", type: "International School", students: "300+" },
  { logo: Logo, name: "Tech Prep Institute", type: "Vocational School", students: "400+" },
  { logo: Logo, name: "Community College", type: "Higher Education", students: "1200+" },
  { logo: Logo, name: "Elementary Plus", type: "Elementary School", students: "250+" },
  { logo: Logo, name: "STEM Academy", type: "Specialized School", students: "350+" },
  { logo: Logo, name: "Arts & Sciences", type: "Arts School", students: "200+" },
  { logo: Logo, name: "Business Institute", type: "Business School", students: "600+" },
  { logo: Logo, name: "Medical Academy", type: "Medical School", students: "450+" },
  { logo: Logo, name: "Engineering College", type: "Engineering School", students: "700+" },
  { logo: Logo, name: "Liberal Arts", type: "Liberal Arts College", students: "550+" },
];

const Schools = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 2 }
      },
    ],
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Trusted Platform</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Trusted By Over {sampleSchools.length}+ Schools
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of educational institutions worldwide that have transformed their operations with XoolHub
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Building2, label: "Schools", value: "500+", color: "from-blue-500 to-indigo-600" },
              { icon: Users, label: "Students", value: "50K+", color: "from-purple-500 to-pink-600" },
              { icon: Award, label: "Countries", value: "25+", color: "from-green-500 to-emerald-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Schools Slider */}
          <div className="relative">
            {/* Left Overlay */}
            <div
              className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(255,255,255,0.9) 0%, transparent 100%)"
              }}
            />
            {/* Right Overlay */}
            <div
              className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to left, rgba(255,255,255,0.9) 0%, transparent 100%)"
              }}
            />

            <Slider {...settings} className="schools-slider">
              {sampleSchools.map((school, index) => (
                <motion.div
                  key={index}
                  className="px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                        <img src={school.logo} className="w-full h-full object-contain" alt={school.name} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{school.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">{school.type}</p>
                        <p className="text-xs text-blue-600 font-medium">{school.students} students</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg">
              <Globe className="h-5 w-5" />
              <span className="font-semibold">Join the global community of educators</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Schools;
