import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import editBookImage from './images/editbook.jpg'; // Importing the background image

const EditBookForm = () => {
  const { book_id } = useParams();

  const [selectedBook, setSelectedBook] = useState(null);
  
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
    fetchBooks();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setTitle(book.title);
    setAuthorName(book.author_name);
    setGenreName(book.genre_name);
    setPrice(book.price);
    // Check format of publication_date before setting
    const formattedPublicationDate = new Date(book.publication_date);
    if (!isNaN(formattedPublicationDate.getTime())) {
      setPublicationDate(formattedPublicationDate.toISOString().slice(0, 10));
    } else {
      console.error('Invalid date format:', book.publication_date);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/books/${selectedBook.book_id}`, {
        title,
        author_name: authorName,
        genre_name: genreName,
        price,
        publication_date: new Date(publicationDate).toISOString().slice(0, 10),
      });
      console.log('Book updated:', response.data);
      toast.success('Book updated successfully!'); // Show success message
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book.'); // Show error message
    }
  };

  const handleBack = () => {
    window.history.back(); // Go back using the browser's history
  };

  return (
    <div
      className="container"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        background: `url(${editBookImage}) center/cover no-repeat`, // Background image for the container
      }}
    >
      <ToastContainer /> {/* Initialize ToastContainer at a high level */}
      {/* Blurred Background for Edit Card */}
      <div
        className="card shadow"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background for the card
          backdropFilter: 'blur(5px)', // Blurred effect for the background
          borderRadius: '10px', // Rounded corners for aesthetic appeal
          padding: '20px', // Padding for the card content
        }}
      >
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Edit Book</h5>
          <form onSubmit={handleSubmit}>
            {books.length > 0 && (
              <div className="mb-3">
                <label htmlFor="selectBook" className="form-label">Select Book:</label>
                <select
                  id="selectBook"
                  className="form-select"
                  value={selectedBook ? selectedBook.book_id : ''}
                  onChange={(e) => handleSelectBook(books.find(book => book.book_id === parseInt(e.target.value)))}
                  required
                >
                  <option value="">Select Book</option>
                  {books.map(book => (
                    <option key={book.book_id} value={book.book_id}>{book.title}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedBook && (
              <>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="authorName" className="form-label">Author Name:</label>
                  <select
                    id="authorName"
                    className="form-select"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                  >
                    <option value="">Select Author</option>
                    {authors.map((author) => (
                      <option key={author.author_id} value={author.name}>{author.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="genreName" className="form-label">Genre Name:</label>
                  <select
                    id="genreName"
                    className="form-select"
                    value={genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                    required
                  >
                    <option value="">Select Genre</option>
                    {genres.map((genre) => (
                      <option key={genre.genre_id} value={genre.genre_name}>{genre.genre_name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price:</label>
                  <input type="text" id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="publicationDate" className="form-label">Publication Date:</label>
                  <input
                    type="date"
                    id="publicationDate"
                    className="form-control"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary me-2">Update Book</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={handleBack}>Back</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookForm;
