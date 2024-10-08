import React from 'react';
import './styles.css'; // Import your custom styles

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-info text-black">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Book Kingdom</h5>
        
            <p>
              <strong>Email:</strong> info@bookkingdom.com <br />
              <strong>Phone:</strong> +1 123 456 7890 <br />
              <strong>Address:</strong> 123 Library Street, Bangalore, India
            </p>
          </div>
          <div className="col-md-6 text-center">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com/bookhub" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>
             
              <a href="https://twitter.com/bookhub" className="social-icon">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://instagram.com/bookhub" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">© 2024 BookHub. All rights reserved. | Developed by Vidhya V.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
