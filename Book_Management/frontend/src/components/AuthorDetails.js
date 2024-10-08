import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import authorImg from './images/author.jpg'; // Import author.jpg for card image

const AuthorDetails = () => {
  const { author_id } = useParams(); // Fetch the author_id from URL params
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/authors/${author_id}`);
        setAuthor(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching author details:', error);
        setError('Error fetching author details. Please try again later.');
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [author_id]);

  if (loading) {
    return <p>Loading author details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!author) {
    return <p>No author details found.</p>;
  }

  return (
    <div
      className="author-details-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="card shadow"
        style={{
          maxWidth: '800px',
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <img src={authorImg} alt="Author" className="card-img-top mb-4" style={{ maxWidth: '100%', height: 'auto' }} /> {/* Adjusted image size */}
        <h2 className="text-center mb-4">{author.name}'s Details</h2>

        <div className="mb-3">
          <div className="btn-group mb-3" role="group">
            <Link to="/authors/viewauthor" className="btn btn-dark me-2">
              <BsArrowLeft className="me-2" /> Back to Authors
            </Link>
          </div>
        </div>

        <div className="card-body">
          <p><strong>Name:</strong> {author.name}</p>
          <p><strong>Biography:</strong> {author.biography}</p>
        
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
