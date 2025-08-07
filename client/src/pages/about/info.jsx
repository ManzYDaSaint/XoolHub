import React from "react";
import {
  Users,
  Globe,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeaderBtn from "../landing/components/ui/headerBtn";

const AboutUs = () => {

  return (
    <div className="p-8 bg-gray-100 min-h-screen plans aboutUS">
      <div className="text-center mt-28">
        <h5 className="inline-flex pb-5">
          <HeaderBtn>ABOUT US</HeaderBtn>
        </h5>
        <p className="text-md pb-8 text-gray-600 leading-relaxed">
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

      <section className="text-center pb-16 pt-16">
        <div className="text-center mt-12">
          <h5 className="inline-flex pb-5">
            <HeaderBtn>OUR MISSION</HeaderBtn>
          </h5>
          <p className="text-sm md:text-lg text-gray-600 py-4 leading-relaxed">
            To empower educational institutions with cutting-edge technology
            that simplifies operations, enhances <br />
            communication, and fosters growth for students and educators alike.
          </p>
        </div>
        <Link to={"/login"}>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
