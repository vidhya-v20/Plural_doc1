import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your custom styles

const Navbar = ({ handleAboutClick, handleFeaturesClick, handleAdminLoginClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mt-auto py-3 bg-info text-black">
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
        
        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" style={{ fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" onClick={() => handleAboutClick()} style={{ fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#features" onClick={() => handleFeaturesClick()} style={{ fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>Features</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/AdminLogin" style={{ fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
