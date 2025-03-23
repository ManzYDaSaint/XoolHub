// src/App.js
import React from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/navbar';
import Footer from './components/footer';

function Landing() {

  return (
    <>
        <div className={'front-page'}>
          <Navbar />
          <LandingPage />
          <Footer />
        </div>
    </>
  );
}

export default Landing;
