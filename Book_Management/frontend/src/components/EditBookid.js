import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBookId = () => {
  const { book_id } = useParams();

  const [bookDetails, setBookDetails] = useState(null);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authorOptions, setAuthorOptions] = useState([]);
  const [genreId, setGenreId] = useState('');
  const [genreOptions, setGenreOptions] = useState([]);
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    if (book_id) {
      fetchBookDetails();
      fetchAuthors();
      fetchGenres();
    }
  }, [book_id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/books/${book_id}`);
      console.log('Book details fetched:', response.data);
      const { title, author_id, genre_id, price, publication_date } = response.data;
      setBookDetails(response.data);
      setTitle(title);
      setAuthorId(author_id.toString());
      setGenreId(genre_id.toString());
      setPrice(price.toString());
      setPublicationDate(new Date(publication_date).toISOString().slice(0, 10));
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/authors`);
      setAuthorOptions(response.data); // Assuming API returns an array of authors directly
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/genres`);
      setGenreOptions(response.data); // Assuming API returns an array of genres directly
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/books/${book_id}`, {
        title,
        author_id: parseInt(authorId),
        genre_id: parseInt(genreId),
        price: parseFloat(price),
        publication_date: new Date(publicationDate).toISOString().slice(0, 10),
      });
      console.log('Book updated:', response.data);
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="container">
      {bookDetails && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Book Details (ID: {book_id})</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author Name</th>
                  <th>Genre Name</th>
                  <th>Price</th>
                  <th>Publication Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{bookDetails.title}</td>
                  <td>{bookDetails.author_name}</td>
                  <td>{bookDetails.genre_name}</td>
                  <td>{bookDetails.price}</td>
                  <td>{new Date(bookDetails.publication_date).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Edit Book</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="authorId" className="form-label">Author Name:</label>
              <select
                id="authorId"
                className="form-select"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                required
              >
                <option value="">Select Author</option>
                {authorOptions.map((author) => (
                  <option key={author.author_id} value={author.author_id}>{author.author_name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="genreId" className="form-label">Genre Name:</label>
              <select
                id="genreId"
                className="form-select"
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
                required
              >
                <option value="">Select Genre</option>
                {genreOptions.map((genre) => (
                  <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</option>
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
              <button type="submit" className="btn btn-primary">Update Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookId;
