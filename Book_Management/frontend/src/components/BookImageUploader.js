import React, { useState } from 'react';
import axios from 'axios';

const BookImageUploader = ({ bookId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post(`/api/books/${bookId}/upload-image`, formData)
      .then(response => {
        console.log('Image uploaded successfully:', response.data);
        // Optionally update state or trigger a refresh of book data
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default BookImageUploader;
