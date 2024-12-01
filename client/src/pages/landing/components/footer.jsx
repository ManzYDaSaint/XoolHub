import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react'

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
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#team">Team</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#referal">Referral Program</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-container">
                <h4>Features</h4>
                <ul className='footer-links'>
                  <li><a href="#features">Schedule Management</a></li>
                  <li><a href="#features">Report Cards</a></li>
                  <li><a href="#features">Attendance Tracking</a></li>
                  <li><a href="#features">Classroom Management</a></li>
                  <li><a href="#features">Transcripts</a></li>
                  <li><a href="#features">Parent Portal</a></li>
                  <li><a href="#features">Student Information</a></li>
                  <li><a href="#features">Teacher Management</a></li>
                  <li><a href="#features">Exam Management</a></li>
                  <li><a href="#features">Fees Management</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-container">
                <h4>Support</h4>
                <ul className='footer-links'>
                  <li><a href="#support">FAQ</a></li>
                  <li><a href="#support">Contact Us</a></li>
                  <li><a href="#support">Terms of Service</a></li>
                  <li><a href="#support">Privacy Policy</a></li>
                  <li><a href="#support">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-container">
                <h4>Quick Links</h4>
                <ul className='footer-links'>
                  <li><a href="#login">Login</a></li>
                  <li><a href="#signup">Sign Up</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#faq">FAQ</a></li>
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
