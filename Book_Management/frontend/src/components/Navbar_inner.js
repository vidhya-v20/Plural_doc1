// Navbar_inner.js

import React from 'react';
import { Link } from 'react-router-dom';
import './styles_inner.css';


const Navbar_inner = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-inner py-3 bg-info text-black">
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door home-icon" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 7.5a.5.5 0 0 1 .5-.5h2V14a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h4v5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .223.053l-7.5-7a.5.5 0 0 0-.646 0l-7.5 7A.5.5 0 0 1 0 7.5z"/>
                  <path fillRule="evenodd" d="M11 2.5V1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1.5a.5.5 0 0 0 1 0V2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 0 1 0V2.5z"/>
                </svg>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_inner;
