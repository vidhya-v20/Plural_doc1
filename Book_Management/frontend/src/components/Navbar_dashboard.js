import React from 'react';
import { Link } from 'react-router-dom';
import './styles_dashboard.css'; // Ensure the correct styles file is imported

const Navbar_dashboard = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dashboard py-3 bg-info text-black">
      <div className="container-fluid">
        {/* Logo with effects */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={process.env.PUBLIC_URL + '/images/booklogo.png'} alt="BookLogo" width="70" height="70" className="d-inline-block align-top me-2" />
          <span className="book-kingdom">Book Kingdom</span>
        </Link>
        
        {/* Navbar Toggler Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
     
      </div>
    </nav>
  );
};

export default Navbar_dashboard;
