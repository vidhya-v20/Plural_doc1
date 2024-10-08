import React, { useState, useEffect } from 'react';
import './styles.css'; // Import your custom styles
import { Link } from 'react-router-dom';

const Carousel = ({ topImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    //topImage,  // This will be discover.jpg
    '/images/C_adult.jpg',
    '/images/C_fiction.jpg',
    '/images/C_kids.jpg',
    '/images/C_musical.jpg',
    // Add more image paths as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [images.length]); // Ensure useEffect depends on images.length

  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}>
            <img src={process.env.PUBLIC_URL + image} className="d-block w-100" alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
