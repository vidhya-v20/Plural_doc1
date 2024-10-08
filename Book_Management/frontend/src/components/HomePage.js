import React from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer'; // Import Footer component
import { Link } from 'react-router-dom';
import './styles.css'; // Import your custom styles

// Import the new images
import discoverImage from '../components/images/discover.jpg'; 
import libLogo from '../components/images/lib_logo.png';
import libcyc from '../components/images/lib_cycle.png';
import hLibPic from '../components/images/h_libpic.avif';

const HomePage = () => {
  const handleAboutClick = () => {
    scrollToSection('about');
  };

  const handleFeaturesClick = () => {
    scrollToSection('features');
  };

  const handleViewBooksClick = () => {
    scrollToSection('viewbooks');
  };

  const handleAdminLogin = () => {
    // Navigation logic for Admin Login
    console.log("Navigating to Admin Login...");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar
        handleAboutClick={handleAboutClick}
        handleFeaturesClick={handleFeaturesClick}
   
      />

      <div id="home" className="container mt-4">
        <img src={process.env.PUBLIC_URL + discoverImage} alt="Discover" className="w-100 mb-4" />
        <Carousel topImage={discoverImage}/>
      </div>

      <div id="about" className="container mt-4">
        <img src={libLogo} alt="Library Logo"  className="w-100 mb-4" style={{ maxWidth: '50%', height: 'auto' }} />
        <h2>Welcome to Online Library Management</h2>
        <br></br>
        <br></br>
        <div className="row">
          <div className="col-md-6">
            <h3>Our Mission</h3>
            <p>
              At <strong>Book Kingdom</strong>, we are dedicated to providing you with a seamless and enriching reading experience. Whether
              you're a student, an academic researcher, or simply an avid reader, our online library offers a vast collection
              of books across various genres and disciplines.
            </p>
          </div>
          <div className="col-md-6">
            <img src={libcyc} alt="Library Cycle" className="w-100 mb-4" style={{ maxWidth: '50%', height: 'auto' }} />
          </div>
        </div>
      </div>

      <div id="features" className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={hLibPic} alt="Library Picture" className="w-100 mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className="col-md-6">
            <h2>Features of Book Kingdom</h2>
            <ul className="custom-list">
              <li>Display a list of all books, authors, genres</li>
              <li>Allow users to view details of a specific book by clicking on a book title</li>
              <li>Provide a form to add a new book</li>
              <li>Editing of books, authors, genres can be performed</li>
              <li>Delete functionality available for books, authors, genres</li>
              <li>Cover image of book can be uploaded</li>
              <li>Members/Users can be added as part of library management</li>
              <li>Form available to note issue book and return book for members</li>
            </ul>
          </div>
        </div>
      </div>

  
      <Footer />
    </div>
  );
};

export default HomePage;
