import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const testimonials = [
  { name: "Sarah Johnson", role: "School Administrator", feedback: "This platform transformed our school's management." },
  { name: "James Lee", role: "Teacher", feedback: "Managing classes hjsaadf svs uvsdvbusduivs dvisudy vsvdisv sv sd visyvbsyivs vs xfysivys fvs fvvysifv sfvssfvyisfyvs fvs fvisfv s fvysfvisyfvsifv sf vsyfvis fvsv  and communication with parents has never been easier!" },
  { name: "Anna Wright", role: "Parent", feedback: "I can easily keep up with my child's progress. Highly recommend!" },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 15000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonials" id="testimonials">
      <h2>What Our Clients Say </h2>
      <h5>Hear from our happy clients</h5>
      <p>Here are some of our customers who have <br /> experienced the power of our platform.</p>
      <div className="slider-container">

      <Slider {...settings} className="testimonial-slider">
        {testimonials.map((testi, index) => (
          <div key={index} className="testimonial-card">
            <p className="feedback"><span className='quote'>"</span>{testi.feedback}</p>
            <p className="name">- {testi.name}, {testi.role}</p>
          </div>
        ))}
      </Slider>
        </div>
    </section>
  );
};

export default Testimonials;
