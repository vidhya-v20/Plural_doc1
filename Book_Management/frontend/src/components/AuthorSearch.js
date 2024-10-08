import React, { useState } from 'react';
import axios from 'axios';
import DeleteAuthor from './deleteauthor'; // Import the DeleteAuthor component

const AuthorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/authors?name=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching authors:', error);
    }
  };

  const handleDelete = async (authorId) => {
    try {
      await axios.delete(`http://localhost:5000/authors/${authorId}`);
      console.log('Author deleted successfully');
      setSearchResults([]); // Clear search results after deletion
      setSelectedAuthor(null); // Clear selected author after deletion
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div>
      <h2>Search Authors</h2>
      <div className="mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          placeholder="Enter author name"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-3">
          Search
        </button>
      </div>
      
      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="mb-3">
          <h3>Search Results:</h3>
          <ul className="list-group">
            {searchResults.map(author => (
              <li key={author.author_id} className="list-group-item d-flex justify-content-between align-items-center">
                {author.author_name}
                <button onClick={() => setSelectedAuthor(author)} className="btn btn-danger">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show selected author and delete option */}
      {selectedAuthor && (
        <div>
          <DeleteAuthor authorName={selectedAuthor.author_name} authorId={selectedAuthor.author_id} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default AuthorSearch;
