import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsPlusSquare, BsPencilSquare, BsSearch, BsTrash, BsListUl, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import bookImage from './images/library_cycle.jpg'; // Import your book image

const BooksPage = () => {
  const [books, setBooks] = useState([]);

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
        // Update the books state after deletion
        setBooks(books.filter(book => book.book_id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="row">
      {/* Left side content */}
      <div className="col-lg-7">
        <h2>Books Inventory</h2>
        <br></br>
        <div>
          <p>
          Effectively Manage, Track and Perform Daily Library Operations with Ease!
          </p>
        </div>
        <br></br>
        <div className="mb-3">
          {/* Row 1: Add, Edit, Delete */}
          <div className="btn-group mb-3" role="group">
            <Link to="/books/add" className="btn btn-primary me-2">
              <BsPlusSquare className="me-2" /> Add Book
            </Link>
            {/* Link to '/' as a placeholder for Edit Book button */}
            <Link to="/books/edit" className="btn btn-warning me-2">
              <BsPencilSquare className="me-2" /> Edit Book
            </Link>
            <Link to={`/books/delete`} className="btn btn-danger">
            <BsTrash className="me-2" /> Delete Book
                </Link>
          </div>
          
          
          <br></br>
          <br></br>
          {/* Row 3: Search, Show Books */}
          <div className="btn-group mb-3" role="group">
          <Link to="/books/Returnbook" className="btn btn-secondary me-2">
              <BsArrowLeft className="me-2" /> Return Book
            </Link>
            <Link to="/books/Issuebook" className="btn btn-secondary me-2">
              <BsArrowRight className="me-2" /> Issue Book
            </Link>
            <Link to="/books/show" className="btn btn-dark me-2">
              <BsListUl className="me-2" /> Show Books
            </Link>
          </div>
        </div>
        
   
      </div>
      {/* Right side content */}
      <div className="col-lg-5">
        <img src={bookImage} alt="Book Image" className="img-fluid mb-3" style={{ maxHeight: '700px' }} />
        {/* Add any additional content for the right side here */}
      </div>
    </div>
  );
};

export default BooksPage;
