import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Returnbook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  // Fetch issued books
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/issued`);
        setIssuedBooks(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching issued books:', error);
        setError('Error fetching issued books');
      }
    };

    fetchIssuedBooks();
  }, []);

  // Fetch all members for the filter dropdown
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/members');
        setMembers(response.data); // Update members state with fetched data
        setError(null);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('Error fetching members');
      }
    };

    fetchMembers();
  }, []);

  // Handle returning a book
  const handleReturnBook = async (bookId) => {
    if (window.confirm('Are you sure you want to return this book?')) {
      try {
        await axios.put(`http://localhost:5000/books/return/${bookId}`);
        setIssuedBooks(issuedBooks.filter(book => book.book_id !== bookId));
      } catch (error) {
        console.error('Error returning book:', error);
        setError('Error returning book');
      }
    }
  };

  // Filter function based on issue_to column and member_name
  const filteredBooks = issuedBooks.filter(book =>
    book.member_name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="delete-book-container">
      <div className="card shadow">
        <h2 className="text-center mb-4">Return Book</h2>

        {/* Filter input for issue_to column */}
        <div className="mb-3">
          <label htmlFor="filterInput" className="form-label">Filter by Issue To:</label>
          <input
            type="text"
            id="filterInput"
            className="form-control"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by member name..."
          />

          {/* Filter dropdown for members */}
          <select
            id="memberSelect"
            className="form-select mt-2"
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
          >
            <option value="">All Members</option>
            {members.map(member => (
              <option key={member.member_id} value={member.name}>{member.name}</option>
            ))}
          </select>
        </div>

        {/* Table to display issued books */}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Issued To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map(book => (
                <tr key={book.issue_id}>
                  <td>{book.book_title}</td>
                  <td>{book.member_name}</td>
                  <td>
                    <button onClick={() => handleReturnBook(book.book_id)} className="btn btn-sm btn-outline-danger">
                      Return
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No matching books found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Back to Dashboard button */}
        <div className="text-center mt-3">
          <button className="btn btn-outline-primary" onClick={() => window.location.href = '/dashboard'}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Returnbook;
