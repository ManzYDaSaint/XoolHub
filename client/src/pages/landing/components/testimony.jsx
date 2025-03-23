import Slider from "react-slick"
import React from "react"
import { QuoteIcon, Star } from 'lucide-react'
import { motion } from "framer-motion"
import { useState } from "react"
import api from "../../../services/apiServices"
import { useEffect } from "react"

const Testimonials = () => {
  const [testimonials, setTestimony] = useState([]);

  const fetchData = async() => {
    try {
      const res = await api.getFeedbackRating();
      const data = res.data.rating;
      setTestimony(data);
    } catch (error) {
      console.error('Error fetching individual:', error);
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
    speed: 500,
    autoplaySpeed: 15000,
    cssEase: "linear",
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

  return (
    <section
      className="testimonials bg-gradient-to-br from-purple-600 to-blue-500 py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      id="testimonials"
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-2xl text-uppercase text-white text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)", fontFamily: "'Poppins', sans-serif" }}
        >
          What Our Clients Say
        </motion.h2>
        <motion.h5
          className="text-xl md:text-2xl font-semibold text-white text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hear from our happy clients
        </motion.h5>
        <motion.p
          className="text-lg text-white text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here are some of our customers who have <br className="hidden md:inline" /> experienced the power of our
          platform.
        </motion.p>
        <div className="slider-container">
          <Slider {...settings} className="testimonial-slider">
            {testimonials.map((testi, index) => (
              <div key={index} className="px-4">
                <motion.div
                  className="testimonial-card bg-white rounded-lg shadow-xl p-10 md:p-10 relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <QuoteIcon className="text-4xl text-purple-500 mb-4" />
                  <div className="flex justify-center space-x-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer transition-colors duration-200 ${
                  testi.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
                  <p className="text-sm feedback text-gray-700 text-lg md:text-xl mb-6 w-100">{testi.commenti}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testi.name[0]}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm name text-gray-900 font-semibold m-0 p-0 text-left">{testi.name}</p>
                      <p className="text-sm role text-gray-600 m-0 p-0 text-left">{testi.optioni}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Testimonials