import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authEditImg from './images/authoredit.avif'; // Import authoredit.avif image

const EditAuthorForm = () => {
  const { author_id } = useParams();
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState('');
  const [authorDetails, setAuthorDetails] = useState(null);
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleAuthorChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedAuthorId(selectedId);
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/authors/${selectedId}`);
      const { name, biography } = response.data;
      setAuthorDetails(response.data);
      setName(name);
      setBiography(biography);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching author details:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/authors/${selectedAuthorId}`, {
        name,
        biography
      });
      console.log('Author updated:', response.data);
      // Show success message
      setSuccessMessage('Author updated successfully');
      toast.success('Author updated successfully'); // Display success message in snackbar
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return (
    <div
      className="edit-author-container"
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
          maxWidth: '600px', // Reduce card width for smaller size
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <img src={authEditImg} alt="Author Edit" className="card-img-top mb-4" style={{ maxWidth: '50%', height: 'auto', margin: '0 auto' }} /> {/* Center align image */}
        <h2 className="text-center mb-4">Edit Author</h2>

        {/* Dropdown to select authors */}
        <div className="mb-3">
          <label htmlFor="authorSelect" className="form-label">Select Author:</label>
          <select
            id="authorSelect"
            className="form-select"
            value={selectedAuthorId}
            onChange={handleAuthorChange}
          >
            <option value="">Select an author</option>
            {authors.map(author => (
              <option key={author.author_id} value={author.author_id}>{author.name}</option>
            ))}
          </select>
        </div>

        {/* Form to edit author details */}
        {loading ? (
          <p>Loading author details...</p>
        ) : authorDetails ? (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label htmlFor="biography" className="form-label">Biography:</label>
                <textarea
                  id="biography"
                  className="form-control"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 d-flex justify-content-between">
                {/* Back to Dashboard Button */}
                <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>

                {/* Update Author Button */}
                <button type="submit" className="btn btn-primary">Update Author</button>
              </div>
            </form>

            <ToastContainer /> {/* Include ToastContainer here */}
          </div>
        ) : (
          <p>No author selected</p>
        )}
      </div>
    </div>
  );
};

export default EditAuthorForm;
