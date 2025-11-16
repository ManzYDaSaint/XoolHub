import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Building2, Users, Award, Globe, Shield, Loader2 } from 'lucide-react';
import Logo from '../schools/logo.png';
import apiServices from '../../../services/apiServices';

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalStudents: 0,
    totalCountries: 0
  });

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await apiServices.getXuls();
        
        if (response.data.success) {
          const schoolsData = response.data.school;
          setSchools(schoolsData);
          
          // Calculate stats from real data
          const totalSchools = schoolsData.length;
          
          setStats({
            totalSchools,
          });
        } else {
          setError('failed to fetch schools data');
        }
      } catch (err) {
        // Error fetching schools data
        setError('Error loading schools data');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Fetch Students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await apiServices.statStudents();
        
        if (response.data.success) {
          const studentsData = response.data.gotter;
          setStudents(studentsData?.ount || 0);
        } else {
          setError('failed to fetch students data');
        }
      } catch (err) {
        // Error fetching students data
        setError('Error loading students data');
      }
    };

    fetchStudents();
  }, []);

  // Debug log - only in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Students data:', students);
  }


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiServices.statCountry();
        
        if (response.data.success) {
          const cuntData = response.data.cott;
          setCountry(cuntData.cunt || 0);
        } else {
          setError('failed to fetch countries data');
        }
      } catch (err) {
        // Error fetching countries data
        setError('Error loading countries data');
      }
    };

    fetchCountries();
  }, []);

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
    vertical: false,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: true,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 5, adaptiveHeight: true }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 4, adaptiveHeight: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3, adaptiveHeight: true }
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 2, adaptiveHeight: true }
      },
    ],
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Custom styles for slider */}
      <style>{`
        .schools-slider .slick-track {
          display: flex !important;
          align-items: stretch;
        }
        .schools-slider .slick-slide {
          height: auto;
          display: flex !important;
        }
        .schools-slider .slick-slide > div {
          height: 100%;
          width: 100%;
        }
        .schools-slider .slick-list {
          overflow: hidden;
        }
        .schools-slider .slick-slide.slick-active {
          display: flex !important;
        }
      `}</style>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
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
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin mr-3" />
                  Loading Schools...
                </div>
              ) : error ? (
                "Trusted By Schools Worldwide"
              ) : (
                `Trusted By ${stats.totalSchools}+ Schools`
              )}
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
              { 
                icon: Building2, 
                label: "Schools", 
                value: loading ? "..." : error ? "500+" : `${stats.totalSchools}+`, 
                color: "from-blue-500 to-indigo-600" 
              },
              { 
                icon: Users, 
                label: "Students", 
                value: loading ? "..." : error ? "50K+" : (() => {
                  const studentCount = Number(students) || 0;
                  if (studentCount >= 1000) {
                    return `${Math.floor(studentCount / 1000)}K+`;
                  } else {
                    return `${studentCount}+`;
                  }
                })(), 
                color: "from-purple-500 to-pink-600" 
              },
              { 
                icon: Award, 
                label: "Countries", 
                value: loading ? "..." : error ? "25+" : `${country || 0}+`, 
                color: "from-green-500 to-emerald-600" 
              }
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

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">Loading schools...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Unable to load schools data</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : schools.length > 0 ? (
              <div className="w-full">
                <div className="mb-4 text-sm text-gray-600">
                  Showing {schools.length} schools
                </div>
                <Slider {...settings} className="schools-slider">
                  {schools.map((school, index) => (
                    <div key={school.id || index} className="px-3">
                      <motion.div
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 group h-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="flex flex-col items-center text-center space-y-3 h-full">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                            <img 
                              src={school.logo || Logo} 
                              className="w-full h-full object-contain" 
                              alt={school.name || 'School'} 
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h4 className="font-semibold text-gray-900 text-xs mb-1 line-clamp-2">
                              {school.name || 'School Name'}
                            </h4>
                            <p className="text-xs text-gray-600 mb-1 line-clamp-1">
                              {school.type || 'Educational Institution'}
                            </p>
                            <p className="text-xs text-blue-600 font-medium">
                              {school.country || 'Global'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-gray-600">No schools data available</p>
                </div>
              </div>
            )}
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
