import React, { useEffect, useState } from 'react';
import axios from 'axios';
import uploadImage from './images/upload_image.png';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [bookTitles, setBookTitles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/books/titles')
      .then(res => {
        setBookTitles(res.data);
        if (res.data.length > 0) {
          setBookId(res.data[0].book_id);
        }
      })
      .catch(err => console.error('Error fetching book titles:', err));
  }, []);

  useEffect(() => {
    if (bookId) {
      axios.get(`http://localhost:5000/books/${bookId}`)
        .then(res => setBookData(res.data))
        .catch(err => console.error('Error fetching book data:', err));
    }
  }, [bookId]);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      showSnackbar('error', 'Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('book_id', bookId);

    axios.post('http://localhost:5000/upload', formData)
      .then(res => {
        if (res.data.Status === "Success") {
          showSnackbar('success', 'Image uploaded successfully!');
          axios.get(`http://localhost:5000/books/${bookId}`)
            .then(res => setBookData(res.data))
            .catch(err => console.error('Error fetching updated book data:', err));
        } else {
          showSnackbar('error', 'Failed to upload image.');
        }
      })
      .catch(err => {
        console.error('Error uploading image:', err);
        showSnackbar('error', 'Failed to upload image.');
      });
  };

  const handleBookChange = (e) => {
    const selectedBookId = e.target.value;
    setBookId(selectedBookId);
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="add-book-container" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={closeSnackbar}>
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} onClose={closeSnackbar}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <div className="card shadow add-book-card p-4" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img src={uploadImage} alt="Upload" className="img-fluid rounded-start mb-3" style={{ maxHeight: '300px', width: 'auto' }} />
              {previewImage && (
                <div className="mt-3">
                  <p className="mb-2"><strong>Preview Image</strong></p>
                  <img src={previewImage} alt="Preview" className="img-fluid rounded-start" style={{ maxHeight: '300px', width: 'auto' }} />
                </div>
              )}
            </div>
            <div className="col-md-8">
              <h2 className="card-title">Upload Image</h2>
              <div className="mb-3">
                <label htmlFor="bookTitle" className="form-label">Select Book Title:</label>
                <select id="bookTitle" className="form-select" value={bookId} onChange={handleBookChange}>
                  {bookTitles.map(book => (
                    <option key={book.book_id} value={book.book_id}>{book.title}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <input type="file" onChange={handleFile} className="form-control" />
              </div>

              <div className="text-center mb-3">
                <button onClick={handleUpload} className="btn btn-primary">Upload</button>
              </div>

              {bookData && (
                <div className="text-center">
                  <img src={`http://localhost:5000/images/${bookData.image}`} alt="" className="img-fluid" />
                </div>
              )}

              <div className="mt-3 text-center">
                <Link to="/dashboard" className="btn btn-outline-primary me-2">Back to Dashboard</Link>
                <button onClick={() => window.history.back()} className="btn btn-outline-secondary">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
