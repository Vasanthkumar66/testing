import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import car1 from '../../../Assets/car1.jpg';
import car2 from '../../../Assets/car2.jpg';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
  };

  const images = [car1, car2];

  return (
    <div className="image-slideshow">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img className="img" src={image} alt={`Offer ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
