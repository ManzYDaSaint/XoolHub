import React from 'react'
import Navbar from '../landing/components/navbar'
import Footer from '../landing/components/footer'
import AboutUs from './info'

const About = () => {
  return (
    <>
    <Navbar />
    <div className="pricing-page mt-5">
      <AboutUs />
      <Footer />
    </div>
    </>
  )
}

export default About