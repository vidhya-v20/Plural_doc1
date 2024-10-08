import React, { useState } from 'react';
import axios from 'axios';

const DeleteAuthor = ({ authorName, authorId, onDelete }) => {
  const [error, setError] = useState('');

  const handleDeleteAuthor = async () => {
    try {
      await axios.delete(`http://localhost:5000/authors/${authorId}`);
      console.log('Author deleted successfully');
      onDelete(authorId); // Callback function to handle deletion on the parent component
    } catch (error) {
      setError('Error deleting author: ' + error.message);
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div>
      <h2>Delete Author</h2>
      <p>Are you sure you want to delete {authorName}?</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <button onClick={handleDeleteAuthor} className="btn btn-danger me-2">
        Delete Author
      </button>
    </div>
  );
};

export default DeleteAuthor;
