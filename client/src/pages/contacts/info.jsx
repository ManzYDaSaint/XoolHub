import { Send, CheckCircle, Mail, User, MessageCircle, LocateFixed, Phone } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/input/input";
import api from "../../services/apiServices";
import { useSelector, useDispatch } from "react-redux";
import { setContactData } from "../../helpers/examination/examSlice";
import toast, { Toaster } from "react-hot-toast";
import HeaderBtn from "../landing/components/ui/headerBtn";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const contactData = useSelector((state) => state.exam.contactData);
  const dispatch = useDispatch();


  const handleSubmit = async (data) => {
    try {
      const res = await api.insertContacts(data);
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(
        setContactData({
          name: "",
          email: "",
          message: "",
        })
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setContactData({
        ...contactData,
        [name]: value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    handleSubmit(contactData);
  };

  // New Lines

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <Toaster />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center pt-24 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <HeaderBtn>Let's Get In Touch</HeaderBtn>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in touch with us so that we might talk more about your thoughts
            and suggestions so that we might help improve and tailor this
            system to your needs.
          </motion.p>

          {/* Contact Cards */}
          <motion.div 
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              {
                icon: Phone,
                title: "Phone",
                value: "0886 563 330",
                color: "from-green-500 to-emerald-500",
                bgColor: "bg-green-100",
                delay: 0.4
              }, 
              {  
                icon: Mail,
                title: "Email",
                value: "admin@xoolhub.com",
                color: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-100",
                delay: 0.5
              },
              {
                icon: LocateFixed,
                title: "Address",
                value: "Mchinji",
                color: "from-purple-500 to-pink-500",
                bgColor: "bg-purple-100",
                delay: 0.6
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                value: "0886 563 330",
                color: "from-green-500 to-teal-500",
                bgColor: "bg-green-100",
                delay: 0.7
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: contact.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="flex flex-row gap-4 bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl rounded-2xl p-6 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`w-16 h-16 ${contact.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <contact.icon 
                      size={32} 
                      className={`bg-gradient-to-r ${contact.color} bg-clip-text text-transparent`} 
                    />
                  </motion.div>
                  <div className="text-left flex-1">
                    <motion.h6 
                      className="text-lg font-semibold text-slate-800 mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.title}:
                    </motion.h6>
                    <motion.p 
                      className="text-slate-600 text-base font-medium"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.value}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div 
          className="text-center pt-20 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="inline-flex"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <HeaderBtn>Contact US</HeaderBtn>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Feel free to contact us on any information that you want to
            communicate about the system.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl rounded-3xl p-8"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {submitted ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold text-green-600 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Thank You!
                </motion.h2>
                <motion.p 
                  className="text-slate-600 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Your message has been sent successfully. We will get back to you
                  soon.
                </motion.p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={onSubmit} 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <motion.label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    Full Name:
                  </motion.label>
                  <Input
                    type="text"
                    name={"name"}
                    placeholder="Full Name"
                    value={contactData.name}
                    onChange={handleChange}
                    autoComplete={"off"}
                    icon={User}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <motion.label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    Email Address:
                  </motion.label>
                  <Input
                    type="text"
                    name={"email"}
                    placeholder="mail@example.com"
                    value={contactData.email}
                    onChange={handleChange}
                    autoComplete={"off"}
                    icon={Mail}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <motion.label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    Message:
                  </motion.label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={contactData.message}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                    placeholder="Enter your message"
                    rows="5"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
