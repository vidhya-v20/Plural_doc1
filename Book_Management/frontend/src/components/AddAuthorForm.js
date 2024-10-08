import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addAuthorImg from './images/addauthor.jpg';

const AddAuthorForm = () => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/authors', {
        name,
        biography
      });
      console.log('Author added:', response.data);
      setSuccessMessage('Author added successfully');
      setErrorMessage('');
      // Clear form fields
      setName('');
      setBiography('');
    } catch (error) {
      console.error('Error adding author:', error);
      setErrorMessage('Failed to add author');
      setSuccessMessage('');
    }
  };

  return (
    <div
      className="add-author-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="card shadow"
        style={{
          maxWidth: '600px', // Adjusted card width
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
         <img src={addAuthorImg} alt="Author Edit" className="card-img-top mb-4" style={{ maxWidth: '100%', height: 'auto' }} /> {/* Adjusted image size */}
        <h2 className="text-center mb-4">Add New Author</h2>

        <form onSubmit={handleSubmit}>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="biography" className="form-label">Biography:</label>
            <textarea
              className="form-control"
              id="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              rows="5"
              required
            ></textarea>
          </div>

          <div className="mb-3 d-flex justify-content-between">
            {/* Back to Dashboard Button */}
            <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>

            {/* Add Author Button */}
            <button type="submit" className="btn btn-primary">Add Author</button>
          </div>
        </form>

        <ToastContainer /> {/* Include ToastContainer here */}
      </div>
    </div>
  );
};

export default AddAuthorForm;
