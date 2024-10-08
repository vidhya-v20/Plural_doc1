import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import bookImage from './images/bookimage.png';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState(new Date());
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
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

    fetchAuthors();
    fetchGenres();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/books', {
        title,
        author_name: authorName,
        genre_name: genreName,
        price,
        publication_date: publicationDate.toISOString().split('T')[0],
      });
      console.log('Book added:', response.data);
      toast.success('Book added successfully!'); // Show success message
      setTitle('');
      setAuthorName('');
      setGenreName('');
      setPrice('');
      setPublicationDate(new Date());
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book.'); // Show error message
    }
  };

  return (
    <div
      className="add-book-container"
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
      <ToastContainer /> {/* Initialize ToastContainer at a high level */}
      <div className="card shadow add-book-card" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img src={bookImage} alt="Book" className="add-book-image" style={{ maxWidth: '300px', height: 'auto' }} />
          </div>
          <h5 className="card-title text-center mb-4">Add New Book</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label add-book-form-label">Title:</label>
              <input type="text" id="title" className="form-control add-book-form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="authorName" className="form-label add-book-form-label">Author Name:</label>
              <select
                id="authorName"
                className="form-select add-book-form-control"
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
              <label htmlFor="genreName" className="form-label add-book-form-label">Genre Name:</label>
              <select
                id="genreName"
                className="form-select add-book-form-control"
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
              <label htmlFor="price" className="form-label add-book-form-label">Price:</label>
              <input type="text" id="price" className="form-control add-book-form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="publicationDate" className="form-label add-book-form-label">Publication Date:</label>
              <br />
              <DatePicker
                id="publicationDate"
                selected={publicationDate}
                onChange={(date) => setPublicationDate(date)}
                className="form-control add-book-form-control"
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">Add Book</button>
              {/* Link to navigate to FileUpload component */}
              <Link to="/upload" className="btn btn-secondary ms-2">Upload Image</Link>
            </div>

            <div className="mt-3 text-center">
              <Link to="/dashboard" className="btn btn-outline-primary">Back to Dashboard</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;
