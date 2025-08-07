import React from 'react';
import Slider from 'react-slick';
import Logo from '../schools/logo.png';

// Sample data for schools
const sampleSchools = [
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
  { logo: Logo },
];

const Schools = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000, // slow transition
    autoplaySpeed: 0, // continuous
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 1 }
      },
    ],
  };

  return (
    <div className="my-20 mx-auto px-4 text-center relative">
      <h5 className='text-xl font-semibold text-blue-900 mb-8'>
        Trusted By Over {sampleSchools.length}+ Schools and Institutions
      </h5>
      <div className="plan-cards relative overflow-hidden">
        {/* Left Overlay */}
        <div
          className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, white 80%, transparent 100%)"
          }}
        />
        {/* Right Overlay */}
        <div
          className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, white 80%, transparent 100%)"
          }}
        />
        <Slider {...settings}>
          {sampleSchools.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 gap-2">
              <img src={item.logo} className="w-16 h-16 object-contain" alt={'logo'} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Schools;
