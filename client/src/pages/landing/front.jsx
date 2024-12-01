// src/App.js
import React from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './front.css';

function Landing() {

  return (
    <>
      <body>
        <div className={'front-page'}>
          <Navbar />
          <LandingPage />
          <Footer />
        </div>
      </body>
    </>
  );
}

export default Landing;
