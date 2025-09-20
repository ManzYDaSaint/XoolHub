import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Users, Shield, Zap, ArrowRight, Gift, Percent } from 'lucide-react';
import Navbar from '../landing/components/navbar';
import Footer from '../landing/components/footer';
import SEO from '../../components/SEO';
import api from '../../services/apiServices';
import toast from 'react-hot-toast';

const PilotProgramLanding = () => {
  const [pilotPlans, setPilotPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPilotPlans();
  }, []); 

  const fetchPilotPlans = async () => {
    try {
      const response = await api.getPublicPricingPlans();
      if (response.data.success) {
        setPilotPlans(response.data.plans);
      }
    } catch (error) {
      console.error('Error fetching pilot plans:', error);
      toast.error('failed to load pilot plans');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const benefits = [
    {
      icon: <Percent className="h-8 w-8 text-green-600" />,
      title: "50% Off for 1 Year",
      description: "Save thousands with our exclusive pilot program pricing"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Risk-Free Trial",
      description: "Start with a small initial payment, no long-term commitment"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Priority Support",
      description: "Get dedicated support and training from our team"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Early Access",
      description: "Be among the first to experience new features"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "XoolHub Pilot Program",
    "description": "Join our exclusive pilot program and get 50% off for a full year",
    "url": "https://xoolhub.com/pilot-program",
    "offers": [
      {
        "@type": "Offer",
        "name": "Pilot Starter",
        "price": "75000",
        "priceCurrency": "MK",
        "description": "50% off Starter plan for pilot schools"
      },
      {
        "@type": "Offer", 
        "name": "Pilot Professional",
        "price": "125000",
        "priceCurrency": "MK",
        "description": "50% off Professional plan for pilot schools"
      },
      {
        "@type": "Offer",
        "name": "Pilot Enterprise", 
        "price": "187500",
        "priceCurrency": "MK",
        "description": "50% off Enterprise plan for pilot schools"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="XoolHub Pilot Program - 50% Off for 1 Year | Early Adopter Program"
        description="Join our exclusive pilot program and get 50% off XoolHub for a full year. Limited time offer for early adopters. Start with a small initial payment."
        keywords="pilot program, school management system, 50% discount, early adopter, XoolHub"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden top-20 mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-6"
              >
                <Gift className="h-5 w-5 mr-2" />
                Limited Time Offer - 50% Off for 1 Year
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Join Our
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Pilot Program</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Be among the first schools to experience XoolHub at an exclusive 50% discount. 
                Start with a small initial payment and save thousands over the year.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="#pricing"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                >
                  View Pilot Plans
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#apply"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Apply Now
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Join Our Pilot Program?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get exclusive benefits and be part of shaping the future of school management
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Pilot Program Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                50% off regular pricing for the entire year. Start with a small initial payment.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {pilotPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                      index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''
                    }`}
                  >
                    {index === 1 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {plan.original_plan_name} - Pilot Edition
                      </p>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">
                          MK {formatPrice(plan.pilot_price)}
                        </span>
                        <span className="text-gray-600 ml-2">/term</span>
                      </div>
                      
                      <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                        <span className="line-through mr-2">MK {formatPrice(plan.price)}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Save {formatPrice(plan.pilot_discount_percentage)}%
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        Up to {plan.max_students} students
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {(Array.isArray(plan.features) ? plan.features : (plan.features || '').split(', ')).slice(0, 6).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                      <div className="text-center">
                        <span className="text-sm text-gray-500">+ {(Array.isArray(plan.features) ? plan.features : (plan.features || '').split(', ')).length - 6} more features</span>
                      </div>
                    </div>

                    <a
                      href="#apply"
                      className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center ${
                        index === 1
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                          : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      Apply for Pilot Program
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Application Section */}
        <section id="apply" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Apply for Pilot Program
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </motion.div>

            <PilotApplicationForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "What is the pilot program?",
                  answer: "Our pilot program offers schools 50% off XoolHub for an entire year. It's designed for early adopters who want to experience our platform at a reduced cost while helping us improve the system."
                },
                {
                  question: "How much do I need to pay initially?",
                  answer: "The initial payment varies by plan, but it's significantly less than the full term price. For example, the Pilot Starter plan requires only MK 25,000 initially instead of the full MK 75,000."
                },
                {
                  question: "What happens after the pilot year?",
                  answer: "After the pilot year, you can choose to continue with regular pricing, upgrade to a higher plan, or discontinue the service. We'll work with you to find the best solution for your school."
                },
                {
                  question: "Is there a long-term commitment?",
                  answer: "No, there's no long-term commitment during the pilot program. You can cancel at any time, though we hope you'll love the platform and continue using it."
                },
                {
                  question: "What support do I get during the pilot?",
                  answer: "Pilot schools receive priority support, dedicated onboarding assistance, and direct access to our development team for feedback and feature requests."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

// Pilot Application Form Component
const PilotApplicationForm = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    contactEmail: '',
    contactPhone: '',
    schoolSize: '',
    currentSystem: '',
    motivation: '',
    expectedStudents: '',
    preferredPlanId: ''
  });
  const [loading, setLoading] = useState(false);
  const [pilotPlans, setPilotPlans] = useState([]);

  useEffect(() => {
    fetchPilotPlans();
  }, []);

  const fetchPilotPlans = async () => {
    try {
      setLoading(true);
      const response = await api.getPublicPricingPlans();
      if (response.data.success) {
        setPilotPlans(response.data.plans);
      }
    } catch (error) {
      console.error('Error fetching pilot plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const response = await api.submitPilotApplication(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          schoolName: '',
          contactEmail: '',
          contactPhone: '', 
          schoolSize: '',
          currentSystem: '',
          motivation: '',
          expectedStudents: '',
          preferredPlanId: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      
      // Check if it's a validation error with a specific message
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('failed to submit application. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white p-8 rounded-2xl shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              School Name *
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your school name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              School Size *
            </label>
            <select
              name="schoolSize"
              value={formData.schoolSize}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select school size</option>
              <option value="small">small (1-100 students)</option>
              <option value="medium">medium (101-300 students)</option>
              <option value="large">large (300+ students)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current System
            </label>
            <input
              type="text"
              name="currentSystem"
              value={formData.currentSystem}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What system do you currently use?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expected Students
            </label>
            <input
              type="number"
              name="expectedStudents"
              value={formData.expectedStudents}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Number of students"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Plan *
          </label>
          <select
            name="preferredPlanId"
            value={formData.preferredPlanId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select preferred plan</option>
            {pilotPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - MK {new Intl.NumberFormat('en-US').format(plan.pilot_price)}/term
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Why do you want to join the pilot program? *
          </label>
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your school and why you're interested in joining our pilot program..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting Application...
            </>
          ) : (
            <>
              Submit Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default PilotProgramLanding;
