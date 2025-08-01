import { LocateFixed, Mail, MessageCircle, Phone, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import Input from "../../components/input/input";
import api from "../../services/apiServices";
import { useSelector, useDispatch } from "react-redux";
import { setContactData } from "../../helpers/examination/examSlice";
import toast, { Toaster } from 'react-hot-toast';

const ContactPage = () => {
  const [school, setSchool] = useState();
  const [submitted, setSubmitted] = useState(false);
  const contactData = useSelector((state) => state.exam.contactData);
  const dispatch = useDispatch();

  const fetchStudents = async () => {
    try {
      const res = await api.getAdmin();
      const data = res.data.checker || [];

      setSchool(data);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // New Lines

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
          name: '',
          email: '',
          message: ''
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
    <div className="p-8 bg-gray-100 min-h-screen mt-5 plans">
      <Toaster />
      <div className="mt-20 mb-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700 pt-20">
          Let's Get In Touch.
        </h2>
        <p>
          Get in touch with us so that we might talk more about your thoughts
          and suggestions <br /> so that we might help improve and tailor this
          system to your needs.
        </p>
        <div className="plan-cards">
          <div className="plan-card">
            <div className="inner-card">
              <Phone size={25} className="inner-icon" />
              <div className="inner-container">
                <h6>Phone:</h6>
                <p className="text-gray-600">{school?.phone}</p>
              </div>
            </div>
          </div>
          <div className="plan-card">
            <div className="inner-card">
              <Mail size={25} className="inner-icon" />
              <div className="inner-container">
                <h6>Email:</h6>
                <p className="text-gray-600">{school?.email_address}</p>
              </div>
            </div>
          </div>
          <div className="plan-card">
            <div className="inner-card">
              <LocateFixed size={25} className="inner-icon" />
              <div className="inner-container">
                <h6>Address:</h6>
                <p className="text-gray-600">{school?.address}</p>
              </div>
            </div>
          </div>
          <div className="plan-card">
            <div className="inner-card">
              <MessageCircle size={25} className="inner-icon" />
              <div className="inner-container">
                <h6>WhatsApp:</h6>
                <p className="text-gray-600">{school?.whatsapp}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2 className="text-2xl font-semibold text-gray-700 pt-20">
          CONTACT US
        </h2>
        <p>
          Feel free to contact us on any information that you <br /> wanna
          communicate about the system.
        </p>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-600">
              Your message has been sent successfully. We will get back to you
              soon.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name:
              </label>
              <Input
                type="text"
                name={"name"}
                placeholder="Full Name"
                value={contactData.name}
                onChange={handleChange}
                autoComplete={"off"}
                icon={User}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address:
              </label>
              <Input
                type="text"
                name={"email"}
                placeholder="mail@example.com"
                value={contactData.email}
                onChange={handleChange}
                autoComplete={"off"}
                icon={Mail}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={contactData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your message"
                rows="5"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
