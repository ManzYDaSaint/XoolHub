import React, {  useState } from 'react';
import '../front.css';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { GraduationCap, School, CircleDollarSign, MessagesSquare, BookOpenCheck, HandCoins } from 'lucide-react';

const features = [
  { title: 'Student Management', description: 'Manage student data.', logo: GraduationCap },
  { title: 'Class & Subject Management', description: 'Organize classes, assign subjects.', logo: School },
  { title: 'Payroll Management', description: 'Efficient payroll processing.', logo: HandCoins },
];

const rightFeat = [
  { title: 'Fees Management', description: 'Automated fee collection and record-keeping.', logo: CircleDollarSign },
  { title: 'Examination Management', description: 'Schedule exams and manage results effortlessly.', logo: BookOpenCheck },
  { title: 'Enhanced Communication', description: 'Tools for seamless communication between teachers, admins, and parents.', logo: MessagesSquare },
];


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <body className='navbar-body'>

      <nav className="navbar">
        <ul className='navbar-listing'>
          <div className="navbar-left">
            <h2 className="logo">XoolHub</h2>
            <li className='featureChevron' onClick={() => setOpen(!open)}>
              Features <ChevronDown size={18} className={open ? 'chevron active' : 'chevron'} />
              <div className={open ? 'outerDropDwn active' : 'outerDropDwn'}>
                <div className="dropDown">
                  {features.map((ft, index) => (
                    <div key={index} className="drop-card">
                      <ft.logo size={35} className='drop-logo' />
                      <div className="dropSection">
                        <h3>{ft.title}</h3>
                        <p>{ft.description}</p>
                      </div>
                    </div>
                  ))}
                  {rightFeat.map((ft, index) => (
                    <div key={index} className="drop-card-right">
                      <ft.logo size={35} className='drop-logo' />
                      <div className="dropSection">
                        <h3>{ft.title}</h3>
                        <p>{ft.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li onClick={() => scrollToSection('pricing')}>Pricing</li>
            <li onClick={() => scrollToSection('contact')}>Contact</li>
          </div>
          <div className="navbar-right">
            <Link to="/login" className="landBtn">Login</Link>
            <Link to="/demo" className="demoBtn">Request a Demo</Link>
          </div>
        </ul>
      </nav>
    </body>
  );
};

export default Navbar;
