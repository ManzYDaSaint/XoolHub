import Slider from "react-slick"
import React from "react"
import { QuoteIcon, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
import { useState } from "react"
import api from "../../../services/apiServices"
import { useEffect } from "react"
import HeaderBtn from "./ui/headerBtn"

const Testimonials = () => {
  const [testimonials, setTestimony] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchData = async () => {
    try {
      const res = await api.getFeedbackRating();
      const data = Array.isArray(res.data.rating) ? res.data.rating : [];
      setTestimony(data);
    } catch (error) {
      console.error('Error fetching individual:', error);
      setTestimony([]); // fallback to empty array on error
    }
  }

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 8000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  // Custom arrow components
  const CustomPrevArrow = ({ onClick }) => (
    <motion.button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white transition-all duration-300 hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronLeft size={20} />
    </motion.button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <motion.button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white transition-all duration-300 hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronRight size={20} />
    </motion.button>
  );

  return (
    <section
      className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      id="testimonials"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="inline-flex"><HeaderBtn>Testimonials</HeaderBtn></p>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What Our Users Say
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover how our platform has transformed the educational experience for students, teachers, and administrators
          </motion.p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative">
          <Slider
            {...settings}
            className="testimonial-slider"
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {testimonials.map((testi, index) => (
              <div key={index} className="px-4">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative border border-white/20"
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <QuoteIcon className="text-white" size={20} />
                  </motion.div>

                  {/* Rating Stars */}
                  <motion.div
                    className="flex justify-center space-x-2 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + star * 0.1 }}
                      >
                        <Star
                          size={28}
                          className={`${testi.rating >= star
                              ? "text-yellow-400 fill-current drop-shadow-sm"
                              : "text-gray-300"
                            } transition-all duration-300`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center italic font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    "{testi.commenti}"
                  </motion.p>

                  {/* Author Info */}
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {testi.name[0]}
                    </div>
                    <div className="ml-6 text-center">
                      <p className="text-lg font-semibold text-gray-900 mb-1">{testi.name}</p>
                      <p className="text-sm text-gray-600 font-medium">{testi.optioni}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </Slider>

          {/* Custom Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials