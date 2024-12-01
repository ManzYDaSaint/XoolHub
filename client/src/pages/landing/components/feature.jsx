import React from 'react';
import { GraduationCap, School, CircleDollarSign, MessagesSquare, BookOpenCheck, HandCoins } from 'lucide-react';

const features = [
  { title: 'Student Management', description: 'Manage student data across multiple schools with ease.', logo: GraduationCap },
  { title: 'Class & Subject Management', description: 'Organize classes, assign subjects, and streamline scheduling.', logo: School },
  { title: 'Payroll Management', description: 'Efficient payroll processing for teachers and staff.', logo: HandCoins },
  { title: 'Fees Management', description: 'Automated fee collection and record-keeping.', logo: CircleDollarSign },
  { title: 'Examination Management', description: 'Schedule exams and manage results effortlessly.', logo: BookOpenCheck },
  { title: 'Enhanced Communication', description: 'Tools for seamless communication between teachers, admins, and parents.', logo: MessagesSquare },
];

const FeatureSection = () => {
  return (
    <section className="features">
      <h2>Key Features</h2>
      <h5>Explore the features that make <br />our platform exceptional.</h5>
      <p>Discover the powerful tools designed to optimize your school's <br /> experience and streamline operations effectively and efficiently.</p>
      <div className="feature-cards">
        {features.map((ft, index) => (
          <div key={index} className="feature-card">
            <ft.logo size={50} />
            <h3>{ft.title}</h3>
            <p>{ft.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
