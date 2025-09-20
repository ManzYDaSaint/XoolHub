import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Youtube, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { setSubscribeData } from "../../../helpers/examination/examSlice.jsx";
import api from "../../../services/apiServices.jsx";
import { toast, Toaster } from "react-hot-toast";
import logo from "../../../logo.png";
import GoToTop from "../../../components/GoToTop";

const Footer = () => {
  const subscribeData = useSelector((state) => state.exam.subscribeData);
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      const res = await api.addSubscribe(data);
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      dispatch(
        setSubscribeData({
          email: "",
        })
      );
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setSubscribeData({
        ...subscribeData,
        [name]: value,
      })
    );
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(subscribeData);
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <Toaster />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/5 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row lg:justify-between gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Brand & Description */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src={logo} 
                  alt="logo" 
                  className="h-8 md:h-14 w-auto" 
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  XoolHub
                </motion.span>
              </motion.div>
              <motion.p 
                className="text-white/90 max-w-xs text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Empowering collaboration, learning, and innovation. Join the XoolHub
                community and unlock your potential.
              </motion.p>
            </motion.div>

            {/* Links */}
            <motion.div 
              className="flex flex-1 flex-wrap gap-8 justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Product",
                  links: [
                    { name: "Features", href: "#Features" },
                    { name: "Pricing", href: "#Pricing" },
                    { name: "Integrations", to: "/integrations" },
                    { name: "Demo", href: "#Demo" }
                  ]
                },
                {
                  title: "Company",
                  links: [
                    { name: "About", to: "/about" },
                    { name: "Referral Program", to: "/referral" },
                    { name: "Blog", to: "/blog" },
                    { name: "Contact", to: "/contact" }
                  ]
                },
                {
                  title: "Support",
                  links: [
                    { name: "Help Center", to: "/faq" },
                    { name: "Terms of Service", to: "/terms" },
                    { name: "Privacy Policy", to: "/policy" }
                  ]
                }
              ].map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.h4 
                    className="font-semibold mb-4 text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.title}
                  </motion.h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        {link.to ? (
                          <Link
                            to={link.to}
                            className="text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                          >
                            <span>{link.name}</span>
                            <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                          >
                            <span>{link.name}</span>
                            <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                          </a>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div 
              className="flex-1 flex flex-col gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.h4 
                  className="font-semibold mb-4 text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Stay up to date
                </motion.h4>
                <motion.form 
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={onSubmit}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.input
                    type="email"
                    name="email"
                    value={subscribeData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="flex-1 rounded-xl px-4 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mail className="h-4 w-4" />
                    Subscribe
                  </motion.button>
                </motion.form>
              </div>
              
              <div>
                <motion.p 
                  className="text-gray-300 mb-4 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Follow us for updates
                </motion.p>
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {[
                    {
                      href: "https://web.facebook.com/profile.php?id=61567929397021",
                      icon: Facebook,
                      label: "Facebook",
                      color: "hover:text-blue-400"
                    },
                    {
                      href: "https://www.youtube.com/channel/UCGv3JywxpoPt7GOj3Xj4ApA",
                      icon: Youtube,
                      label: "Youtube",
                      color: "hover:text-red-400"
                    },
                    {
                      href: "https://x.com/XoolHubOfficial",
                      icon: Twitter,
                      label: "Twitter",
                      color: "hover:text-cyan-400"
                    }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`text-gray-400 ${social.color} transition-all duration-300 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-110 hover:shadow-lg`}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <social.icon size={22} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Footer Bottom */}
        <motion.div 
          className="border-t border-white/20 mt-12 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-white/80 text-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            &copy; {new Date().getFullYear()} XoolHub. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Go to Top Button */}
      <GoToTop />
    </footer>
  );
};

export default Footer;
