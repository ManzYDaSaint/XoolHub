import React from 'react';
import FeatureSection from './feature';
import SubscriptionOptions from './subscription';
import Testimonials from './testimony';
import Schools from './clients';
import { Video } from 'lucide-react'
import landBG from '../assets/landBG.png'
import Props from './props';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="hero-section">
        <p className='all-in-one'>All-In-One System</p>
        <h1>Your Ultimate <span className='multi'>Multi-School</span> <br />Management Solution.</h1>
        <p>Focus on your school's success by teaching and providing education and <br />let us handle the system and provide the right tools you need without the hassle.</p>
        <div className="hero-button-container">
          <button className='get-started'>Get Started</button>
          <button className='how-it-works'>
            <Video size={25} className='lucideVideo'/>
            How it works
          </button>
        </div>
        <img src={landBG} alt="landbg" className='landing-image' />
      </header>
      <Props />
      <FeatureSection />
      <SubscriptionOptions />
      <Schools />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
