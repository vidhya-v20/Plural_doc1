// CarouselComponent.js
import React, { useState, useEffect } from 'react';
import './CarouselComponent.css'; // Import your custom CSS for carousel styles

const CarouselComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/cd_image1.jpg',
    '/images/cd_image2.jpg',
    '/images/cd_image3.jpg',
    '/images/cd_image4.jpg',
    '/images/cd_image5.jpg'
  ];

  const nextSlide = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change image every 3 seconds (3000 milliseconds)

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {images.map((image, index) => (
          <div key={index} className={`carousel-slide ${index === currentImageIndex ? 'active' : ''}`}>
            <img src={process.env.PUBLIC_URL + image} className="carousel-image" alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
