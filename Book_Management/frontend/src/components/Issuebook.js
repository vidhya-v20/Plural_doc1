import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';

import libImg from './images/issuebook.png'; // Import library image

const Issuebook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchBooks();
    fetchMembers();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Error fetching books');
      setLoading(false); // Set loading to false on error
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members');
      setMembers(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Error fetching members');
      setLoading(false); // Set loading to false on error
    }
  };

  const handleIssueBook = async () => {
    if (!selectedBookId || !selectedMemberId) {
      setError('Please select both a book and a member');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/books/issue/${selectedBookId}/${selectedMemberId}`);
      if (response.status === 200) {
        setSuccessMessage('Book issued successfully');
        setError(null); // Clear any previous error messages
      } else {
        setError('Error issuing book');
      }
    } catch (error) {
      console.error('Error issuing book:', error);
      setError('Error issuing book');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Optionally, show a loading indicator
  }

  return (
    <div
      className="delete-book-container"
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
          maxWidth: '800px',
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <img src={libImg} alt="Library" className="card-img-top mb-4" style={{ maxWidth: '100%', height: 'auto' }} /> {/* Display library image */}
        <h2 className="text-center mb-4">Issue Book</h2>
        <div className="mt-3">
          <label htmlFor="bookSelect" className="form-label">Select Book:</label>
          <select id="bookSelect" className="form-select" value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
            <option value="">Select a book</option>
            {books.map(book => (
              <option key={book.book_id} value={book.book_id}>{book.title}</option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <label htmlFor="memberSelect" className="form-label">Select Member:</label>
          <select id="memberSelect" className="form-select" value={selectedMemberId} onChange={(e) => setSelectedMemberId(e.target.value)}>
            <option value="">Select a member</option>
            {members.map(member => (
              <option key={member.member_id} value={member.member_id}>{member.name}</option>
            ))}
          </select>
        </div>
        <div className="text-center mt-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <button className="btn btn-primary mx-2" onClick={handleIssueBook}>Issue Book</button>
          <Link to="/dashboard" className="btn btn-secondary mx-2">
            <BsArrowLeft className="me-2" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Issuebook;
