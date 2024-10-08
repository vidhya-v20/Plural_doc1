import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import SearchBooks from './SearchBooks'; 
import IssuedBooks from './IssuedBooks'; 
import Wishlist from './Wishlist'; 
import FooterInside from './Footer_inside';

/*const Dashboarduser = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('profile'); 

  const renderSelectedContent = () => {
    switch (selectedNavItem) {
      case 'profile':
        return <UserProfile />;
      case 'search_books':
        return <SearchBooks />;
      case 'issued_books':
        return <IssuedBooks />;
      case 'wishlist':
        return <Wishlist />;
      default:
        return null;
    }
  };
  */

  const Dashboarduser = () => {
    const [selectedNavItem, setSelectedNavItem] = useState('Dashboarduser');
  
    const renderSelectedContent = () => {
      switch (selectedNavItem) {
        case 'Dashboarduser':
          return (
            <div>
              <h2>Dashboarduser</h2>
              <p>Welcome to the Admin Dashboarduser of BookHub.</p>
            </div>
          );
        case 'UserProfile':
          return <UserProfile />;
        case 'SearchBooks':
          return <SearchBooks />;
        case 'IssuedBooks':
          return <IssuedBooks />;
        case 'Wishlist': // New case for managing members
          return <Wishlist />;
        default:
          return null;
      }
    };
  
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src={process.env.PUBLIC_URL + '/images/booklogo.png'}
                alt="BookLogo"
                width="70"
                height="70"
                className="d-inline-block align-top me-2"
              />
              Book Hub
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-text ms-auto">Hello, User</div>
          </div>
        </nav>
  
        <div className="row">
          {/* Sidebar */}
          <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${selectedNavItem === 'Dashboarduser' ? 'active' : ''}`}
                    onClick={() => setSelectedNavItem('Dashboarduser')}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${selectedNavItem === 'UserProfile' ? 'active' : ''}`}
                    onClick={() => setSelectedNavItem('UserProfile')}
                  > 
                    UserProfile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${selectedNavItem === 'SearchBooks' ? 'active' : ''}`}
                    onClick={() => setSelectedNavItem('SearchBooks')}
                  >
                    SearchBooks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${selectedNavItem === 'IssuedBooks' ? 'active' : ''}`}
                    onClick={() => setSelectedNavItem('IssuedBooks')}
                  >
                    IssuedBooks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${selectedNavItem === 'Wishlist' ? 'active' : ''}`}
                    onClick={() => setSelectedNavItem('Wishlist')} // Handle click to set selectedNavItem
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
  
          {/* Page content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="pt-3 pb-2 mb-3">
              {renderSelectedContent()}
            </div>
          </main>
        </div>
  
        <FooterInside />
      </div>
    );
  };
  
  export default Dashboarduser;