import React from 'react'
import Navbar from '../landing/components/navbar'
import FAQPage from './info'
import Footer from '../landing/components/footer'

const FAQ = () => {
  return (
    <>
    <Navbar />
    <div className="pricing-page mt-5">
      <FAQPage />
      <Footer />
    </div>
    </>
  )
}

export default FAQ