"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Gift,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Heart,
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";
import HeaderBtn from "./ui/headerBtn";

export default function ReferralPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [ 
    {
      question: "How does the referral program work?",
      answer:
        "Share your unique referral code with friends. When they sign up and make their first purchase, you both earn rewards!",
    },
    {
      question: "When do I receive my rewards?",
      answer:
        "Rewards are credited to your account within 24-48 hours after your referral completes their qualifying action.",
    },
    {
      question: "Is there a limit to how many people I can refer?",
      answer:
        "No! You can refer as many people as you'd like. The more you refer, the more you earn.",
    },
    {
      question:
        "What happens if my referral doesn't complete the required action?",
      answer:
        "Both you and your referral need to complete the qualifying actions to receive rewards. Incomplete referrals won't earn rewards.",
    },
    {
      question: "Can I refer someone who already has an account?",
      answer:
        "Referral rewards are only available for new users who haven't previously registered on our platform.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <motion.span
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200/50 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
              >
                <Gift className="w-4 h-4 mr-2" />
                Referral Program
                  <Sparkles className="w-4 h-4 ml-2" />
                </motion.span>
              </motion.div>

              <motion.h1 
                className="text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Share the Love,{" "}
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Earn Rewards
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Invite your friends and family to join our platform. When they
                sign up and make their first purchase, you both get rewarded
                with exclusive benefits and cash bonuses.
              </motion.p>

              {/* Enhanced Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  { number: "50", label: "Rewards", icon: Gift, color: "from-blue-500 to-cyan-500" },
                  { number: "16", label: "Happy referrers", icon: Heart, color: "from-pink-500 to-rose-500" },
                  { number: "5 Schools", label: "System Customization", icon: Target, color: "from-purple-500 to-indigo-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    </motion.div>
                    <motion.div 
                      className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                onClick={() => {
                  "/register";
                }}
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Start Referring Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="inline-flex mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <HeaderBtn>How It Works</HeaderBtn>
              </motion.div>
              <motion.p 
                className="text-slate-600 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Getting started with our referral program is simple. Follow
                these easy steps to start earning rewards.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Share Your Code",
                  description: "Copy your unique referral code and share it with friends via email, social media, or messaging apps.",
                  icon: Share2,
                  color: "from-blue-600 to-purple-600",
                  delay: 0.3
                },
                {
                  step: "2", 
                  title: "Friend Signs Up",
                  description: "Your friend when creating an account, should activate the referral code and makes their first purchase within a day.",
                  icon: Users,
                  color: "from-green-600 to-blue-600",
                  delay: 0.4
                },
                {
                  step: "3",
                  title: "You Both Earn", 
                  description: "Once your friend completes their first purchase, you both receive your rewards automatically.",
                  icon: DollarSign,
                  color: "from-purple-600 to-pink-600",
                  delay: 0.5
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: step.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div 
                    className="relative mb-8"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <step.icon className="w-10 h-10 text-white" />
                </div>
                    <motion.div 
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-slate-900 mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rewards Section */}
        <section id="rewards" className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-20 w-80 h-80 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="inline-flex mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <HeaderBtn>Reward Tiers</HeaderBtn>
              </motion.h2>
              <motion.p 
                className="text-slate-600 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                The more you refer, the more you earn. Unlock higher tiers and
                exclusive benefits.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  tier: "Bronze",
                  referrals: "1-3 referrals",
                  icon: Star,
                  iconColor: "text-slate-600",
                  iconBg: "bg-slate-100",
                  borderColor: "border-slate-200",
                  bgColor: "bg-slate-50/50",
                  title: "10% discount",
                  description: "You will get 10% discount on your next purchase",
                  delay: 0.3,
                  isPopular: false
                },
                {
                  tier: "Silver",
                  referrals: "4-6 referrals", 
                  icon: TrendingUp,
                  iconColor: "text-blue-600",
                  iconBg: "bg-blue-100",
                  borderColor: "border-blue-200",
                  bgColor: "bg-blue-50/50",
                  title: "15% Referral Bonus",
                  description: "You will get 15% of the total amount the referral purchases",
                  delay: 0.4,
                  isPopular: true
                },
                {
                  tier: "Gold",
                  referrals: "7+ referrals",
                  icon: Award,
                  iconColor: "text-yellow-600", 
                  iconBg: "bg-yellow-100",
                  borderColor: "border-yellow-200",
                  bgColor: "bg-yellow-50/50",
                  title: "Lifetime discount & Bonus",
                  description: "You will get 10% discount on every purchase and 15% Referral Bonus",
                  delay: 0.5,
                  isPopular: false
                }
              ].map((tier, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden border-2 ${tier.borderColor} ${tier.bgColor} rounded-2xl hover:shadow-xl transition-all duration-300 py-8 px-6 group`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: tier.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {tier.isPopular && (
                    <motion.div 
                      className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: tier.delay + 0.2 }}
                      viewport={{ once: true }}
                    >
                      Most Popular
                    </motion.div>
                  )}
                  
                  <div className={`text-center ${tier.isPopular ? 'pt-8' : 'pb-2'}`}>
                    <motion.div 
                      className={`w-16 h-16 ${tier.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <tier.icon className={`w-8 h-8 ${tier.iconColor}`} />
                    </motion.div>
                    
                    <motion.h5 
                      className="text-2xl font-bold text-slate-900 mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {tier.tier}
                    </motion.h5>
                    <p className="text-slate-600 font-medium mb-6">{tier.referrals}</p>
              </div>

                <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-slate-900 mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {tier.title}
                    </motion.div>
                    <p className="text-slate-600 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Your Progress Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="inline-flex mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <HeaderBtn>Referrals Progress</HeaderBtn>
              </motion.h2>
              <motion.p 
                className="text-slate-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Track referral success and earnings
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  icon: Users,
                  iconColor: "text-blue-600",
                  iconBg: "bg-blue-100",
                  value: "12",
                  label: "Total Referrals",
                  delay: 0.3
                },
                {
                  icon: CheckCircle,
                  iconColor: "text-green-600", 
                  iconBg: "bg-green-100",
                  value: "8",
                  label: "Successful",
                  delay: 0.4
                },
                {
                  icon: DollarSign,
                  iconColor: "text-purple-600",
                  iconBg: "bg-purple-100", 
                  value: "MK820,000",
                  label: "Total Earned",
                  delay: 0.5
                },
                {
                  icon: Zap,
                  iconColor: "text-yellow-600",
                  iconBg: "bg-yellow-100",
                  value: "Silver",
                  label: "Hot Tier",
                  delay: 0.6
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: stat.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <motion.div 
                    className="p-6 text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 ${stat.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                    </motion.div>
                    <motion.div 
                      className="text-2xl font-bold text-slate-900 mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-20 w-80 h-80 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="inline-flex mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <HeaderBtn>Frequently Asked Questions</HeaderBtn>
              </motion.h2>
              <motion.p 
                className="text-slate-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Everything you need to know about our referral program
              </motion.p>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {faqData.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="cursor-pointer px-6 py-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <motion.h5 
                        className="text-lg font-semibold text-slate-900"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.question}
                      </motion.h5>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {openFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: openFaq === index ? 1 : 0, 
                      height: openFaq === index ? "auto" : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 rounded-b-xl border-l-4 border-blue-500">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
