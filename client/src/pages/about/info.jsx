import React, { useState, useEffect } from "react";
import { Users, Globe, Layers, School, GraduationCap, User } from "lucide-react";
import { Link } from 'react-router-dom';
import api from "../../services/apiServices";

const AboutUs = () => {
  const [schools, setSchools] = useState();
  const [teachers, setTeachers] = useState();
  const [students, setStudents] = useState();

  const fetchSchools = async () => {
    try {
      const res = await api.countXuls();
      const data = res.data.count;
      setSchools(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const fetchTeachers = async () => {
    try {
      const res = await api.countAllTeacher();
      const data = res.data.count;
      setTeachers(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const fetchStudents = async () => {
    try {
      const res = await api.countAllStudent();
      const data = res.data.count;
      setStudents(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const formatPrice = (price) => {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Format as '1M', '2.5M', etc.
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Format as '50K', '350K', etc.
    }
    return price.toString(); // Return the original price for smaller values
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-5 plans aboutUS">
      <div className="text-center mt-5">
        <h2>ABOUT US</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our Multi-School Management System is dedicated to transforming how
          educational institutions operate by offering <br /> seamless,
          efficient, and innovative solutions. We empower schools to manage
          their <br />
          administrative and academic tasks with ease, enabling them to focus on
          providing quality education.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 container">
        <div className="bg-white shadow-lg p-6 text-center">
          <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3
            className="text-xl font-semibold text-gray-800 mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Collaborative Environment
          </h3>
          <p className="text-gray-600">
            Foster seamless communication between administrators, teachers,
            parents, and students with our integrated tools.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 text-center">
          <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3
            className="text-xl font-semibold text-gray-800 mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Global Reach
          </h3>
          <p className="text-gray-600">
            Manage multiple schools across regions with a single platform that
            adapts to your institution's unique needs.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 text-center">
          <Layers className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3
            className="text-xl font-semibold text-gray-800 mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Customizable Solutions
          </h3>
          <p className="text-gray-600">
            Tailor the platform to suit your school's specific requirements,
            ensuring maximum efficiency and satisfaction.
          </p>
        </div>
      </section>

      <section className="text-center container mission">
        <div className="text-center mt-12">
          <h2>OUR MISSION</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            To empower educational institutions with cutting-edge technology
            that simplifies operations, enhances <br />
            communication, and fosters growth for students and educators alike.
          </p>
        </div>
        <Link to={'/login'}>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
        </Link>
      </section>

      <hr />
      <div className="mt-20 mb-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700 pt-20">
          Xool<span className="color">Hub</span> By Numbers
        </h2>
        <p>
          Ever since the system was lauched to the public, we have managed to
          come up with <br /> these numbers and counting. You can be among
          these numbers and lets build together.
        </p>
        <div className="plan-cards">
          <div className="plan-card">
            <div className="inner-card">
              <School size={45} className="inner-icon" />
              <div className="inner-container">
                <h6 className="text-4xl">{formatPrice(Number(schools))}</h6>
                <p className="text-gray-600">Registered Schools</p>
              </div>
            </div>
          </div>
          <div className="plan-card">
            <div className="inner-card">
              <User size={45} className="inner-icon" />
              <div className="inner-container">
                <h6 className="text-4xl">{formatPrice(Number(teachers))}</h6>
                <p className="text-gray-600">Active Teachers</p>
              </div>
            </div>
          </div>
          <div className="plan-card">
            <div className="inner-card">
              <GraduationCap size={45} className="inner-icon" />
              <div className="inner-container">
                <h6 className="text-4xl">{formatPrice(Number(students))}</h6>
                <p className="text-gray-600">Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
