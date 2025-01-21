import React from "react";
import { Users, Globe, Layers } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">About Us</h1>

        <section className="mb-12 text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Our Multi-School Management System is dedicated to transforming how educational institutions operate by offering seamless, efficient, and innovative solutions. We empower schools to manage their administrative and academic tasks with ease, enabling them to focus on providing quality education.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborative Environment</h3>
            <p className="text-gray-600">
              Foster seamless communication between administrators, teachers, parents, and students with our integrated tools.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Manage multiple schools across regions with a single platform that adapts to your institution's unique needs.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <Layers className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable Solutions</h3>
            <p className="text-gray-600">
              Tailor the platform to suit your school's specific requirements, ensuring maximum efficiency and satisfaction.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            To empower educational institutions with cutting-edge technology that simplifies operations, enhances communication, and fosters growth for students and educators alike.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
