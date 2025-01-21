import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="connect">
          <h4>Let's connect</h4>
          <p>Subscribe to our newsletter for the latest updates, <br />promotions and exclusive offers.</p>
          <form className='connect-form'>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-container">
                <h4>Company</h4>
                <ul className='footer-links'>
                <Link to={'/about'} className='all_links'>

                  <li>About Us</li>
                </Link>
                <Link to={'/team'} className='all_links'>
                  <li>Team</li>
                </Link>
                <Link to={'/careers'} className='all_links'>
                  <li>Careers</li>
                </Link>
                  
                  <Link to={'/terms&services'} className='all_links'>
                  <li>Terms of Service</li>
                  </Link>
                  <Link to={'/privacy'} className='all_links'>
                  <li>Privacy Policy</li>
                  </Link>
                  <Link to={'/security'} className='all_links'>
                  <li>Security</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-container">
                <h4>Features</h4>
                <ul className='footer-links'>
                  <Link to={'/schedule'} className='all_links'>
                  <li>Schedule Management</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Transcripts</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Student Information</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Teacher Management</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Report Cards</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Attendance Tracking</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Classroom Management</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Parent Portal</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Exam Management</li>
                  </Link>
                  <Link to={''} className='all_links'>
                  <li>Fees Management</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-container">
                <h4>Support</h4>
                <ul className='footer-links'>
                  <Link to={'/faq'} className='all_links'>
                    <li>FAQ</li>
                  </Link>
                  <Link to={'/contact'} className='all_links'>
                  <li>Contact Us</li>
                  </Link>
                  <Link to={'/referal'} className='all_links'>
                  <li>Referral Program</li>
                  </Link>
                  <Link to={'/advertisement'} className='all_links'>
                  <li>Advertisements</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-container">
                <h4>Quick Links</h4>
                <ul className='footer-links'>
                  <Link to={'/login'} className='all_links'>
                    <li>Login</li>
                  </Link>
                  <Link to={'/register'} className='all_links'>
                    <li>Sign Up</li>
                  </Link>
                  <Link to={'/blog'} className='all_links'>
                  <li>Blog</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="rights">
          <div className="row">
            <div className="col-lg-6">
              <h6>All rights reserved &copy; XoolHub, Inc.</h6>
            </div>
            <div className="col-lg-6">
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={25} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={25} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={25} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
