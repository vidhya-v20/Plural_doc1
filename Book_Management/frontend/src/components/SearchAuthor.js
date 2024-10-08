import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import searchAuthorImg from './images/Searchauthor.png'; // Import Searchauthor.png

const SearchAuthor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Debounced search function with lodash debounce
  const delayedSearch = debounce((query) => {
    fetchAuthors(query);
  }, 300);

  // Function to fetch authors based on search term
  const fetchAuthors = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/authors?name=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching authors:', error);
      setSearchResults([]);
    }
  };

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    delayedSearch(query); // Debounced search
  };

  return (
    <div
      className="Search-book-container"
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
      <div
        className="card shadow"
        style={{
          maxWidth: '600px', // Adjusted card width
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 className="text-center mb-4">Search Authors</h2>
        <img src={searchAuthorImg} alt="Book" className="show-book-image" style={{ maxWidth: '300px', height: 'auto' }} />
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search author by name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={() => delayedSearch.flush()}>
            Search
          </button>
        </div>

        {searchResults.length > 0 ? (
          <ul className="list-group">
            {searchResults.map((author) => (
              <li key={author.author_id} className="list-group-item">
                <Link to={`/authors/${author.author_id}`}>{author.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No authors found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchAuthor;
