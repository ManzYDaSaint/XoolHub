import React from "react";
import HeaderBtn from "./ui/headerBtn";
import App from "../assets/WhatsApp-about.jpg";
import Ex from "../assets/em.jpg";
import SM from "../assets/sm.jpg";
import FM from "../assets/fm.jpg";
import CM from "../assets/cm.jpg";
import EMA from "../assets/ema.jpg";

const features = [
  {
    title: "Student Management",
    description: "Manage student data across multiple schools with ease.",
    logo: SM,
  },
  {
    title: "Class & Subject Management",
    description:
      "Organize classes, assign subjects, and streamline scheduling.",
    logo: CM,
  }, 
  {
    title: "Expenses Management",
    description: "Efficient expenses management for the whole institution.",
    logo: Ex,
  },
  {
    title: "Fees Management",
    description: "Automated fee collection and record-keeping.",
    logo: FM,
  },
  {
    title: "Examination Management",
    description: "Schedule exams and manage results effortlessly.",
    logo: EMA,
  },
  {
    title: "WhatsApp Intergration",
    description:
      "WhatsApp for seamless communication between teachers, admins, and parents.",
    logo: App,
  },
];

const FeatureSection = () => {
  return (
    <section className="px-14 py-6 my-20 space-y-8 text-center">
      <p className="inline-flex">
        <HeaderBtn>Key Features</HeaderBtn>
      </p>
      <h5 className="text-xl font-bold text-blue-900 md:text-4xl">
        Explore the features that make <br />
        our platform exceptional.
      </h5>
      <p className="text-gray-700 text-md md:text-lg">
        Discover the powerful tools designed to optimize your school's <br />{" "}
        experience and streamline operations effectively and efficiently.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-6">
        {features.map((ft, index) => (
          <div
            key={index}
            className="shadow-md text-center rounded-lg bg-white hover:shadow-lg transition-shadow duration-300 space-y-2"
          >
            <div className="w-full h-[auto] bg-[#D4DBE3] flex items-center justify-center mb-4 rounded-lg shadow-inner overflow-hidden">
              <img
                src={ft.logo}
                alt="class management"
                className="max-h-[auto] max-w-[60%] object-contain shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="text-md md:text-lg font-semibold text-blue-900 text-left px-12">
              {ft.title}
            </h3>
            <p className="text-left px-12 pb-6">{ft.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
