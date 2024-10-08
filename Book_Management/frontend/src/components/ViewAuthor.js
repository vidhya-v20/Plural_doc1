import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import authorImg from './images/author.jpg'; // Import author.jpg for card image

const ViewAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5); // Number of authors to display per page

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

  const handleDeleteAuthor = async (authorId) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await axios.delete(`http://localhost:5000/authors/${authorId}`);
        setAuthors(authors.filter(author => author.author_id !== authorId));
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  // Pagination logic
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="delete-book-container"
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
          width: '90%', // Adjusted width to 90% of container width
          maxWidth: '900px', // Set maximum width for larger screens
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 className="text-center mb-4">View Authors</h2>

        <ul className="list-group">
          {currentAuthors.map(author => (
            <li key={author.author_id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/authors/${author.author_id}`} style={{ textDecoration: 'none' }}>
                {author.name}
              </Link>
              <div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteAuthor(author.author_id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(authors.length / authorsPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mb-4">
          <div className="btn-group mb-3" role="group">
            <Link to="/dashboard" className="btn btn-dark me-2">
              <BsArrowLeft className="me-2" /> Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAuthor;
