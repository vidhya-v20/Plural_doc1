import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookImage = ({ bookId }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios.get(`/api/books/${bookId}`)
      .then(response => {
        setImageUrl(response.data.image); // Assuming response.data.image is the image path
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, [bookId]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Book Cover" style={{ maxWidth: '100px' }} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default BookImage;
