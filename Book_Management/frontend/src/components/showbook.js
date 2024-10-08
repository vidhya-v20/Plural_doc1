import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bookImage from './images/showbook.jpg';

const ShowBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5); // Number of books to display per page

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/books/${bookId}`);
        setBooks(books.filter(book => book.book_id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="show-book-container"
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
      <div className="card shadow show-book-card" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="card-title text-center mb-4">List of Books</h3>
            <img src={bookImage} alt="Book" className="show-book-image" style={{ maxWidth: '300px', height: 'auto' }} />
          </div>
         
          <ul className="list-group">
            {currentBooks.map(book => (
              <li key={book.book_id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={`http://localhost:5000/images/${book.image}`} alt="Book Cover" className="book-image me-3" style={{ maxWidth: '150px', height: 'auto' }} /> {/* Increased maxWidth to 150px */}
                  <div>
                    <h6 className="mb-0">{book.title}</h6>
                  </div>
                </div>
                <div>
                  <Link to={`/books/${book.book_id}/edit`} className="btn btn-sm btn-outline-primary me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteBook(book.book_id)} className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <nav className="mt-3">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-3 text-center">
            <Link to="/dashboard" className="btn btn-outline-primary">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBooks;
