import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BookDetailsPage = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${book_id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Error fetching book details. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [book_id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {book && (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Price: ${book.price}</p>
          <p>Publication Date: {book.publication_date}</p>
          <Link to={`/books/${book_id}/edit`}>Edit</Link>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
