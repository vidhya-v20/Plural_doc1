import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [editingGenreId, setEditingGenreId] = useState(null);
  const [newGenreName, setNewGenreName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [genresPerPage] = useState(5); // Number of genres to display per page

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleDeleteGenre = async (genreId) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      try {
        await axios.delete(`http://localhost:5000/genres/${genreId}`);
        setGenres(genres.filter(genre => genre.genre_id !== genreId));
      } catch (error) {
        console.error('Error deleting genre:', error);
      }
    }
  };

  const handleEditClick = (genreId, genreName) => {
    setEditingGenreId(genreId);
    setNewGenreName(genreName);
  };

  const handleSaveEdit = async (genreId) => {
    try {
      await axios.put(`http://localhost:5000/genres/${genreId}`, { genre_name: newGenreName });
      // Update the genre in the local state
      setGenres(genres.map(genre => {
        if (genre.genre_id === genreId) {
          return { ...genre, genre_name: newGenreName };
        }
        return genre;
      }));
      // Reset editing state
      setEditingGenreId(null);
      setNewGenreName('');
    } catch (error) {
      console.error('Error updating genre:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingGenreId(null);
    setNewGenreName('');
  };

  const handleAddGenre = async () => {
    try {
      const response = await axios.post('http://localhost:5000/genres', { genre_name: newGenreName });
      const newGenre = response.data;
      setGenres([...genres, newGenre]);
      setNewGenreName('');
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  };

  // Pagination
  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = genres.slice(indexOfFirstGenre, indexOfLastGenre);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
      }}
    >
      <h2 className="text-center mb-4" style={{ color: '#fff' }}>Manage Genres</h2>
      <div className="row justify-content-center mb-3">
        <div className="col-lg-6">
          <div className="card" >
            <div className="card-body text-center">
              <input
                type="text"
                value={newGenreName}
                onChange={(e) => setNewGenreName(e.target.value)}
                className="form-control mb-2"
                placeholder="New Genre Name"
              />
              <button onClick={handleAddGenre} className="btn btn-primary">Add Genre</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <ul className="list-group">
            {currentGenres.map(genre => (
              <li key={genre.genre_id} className="list-group-item">
                {editingGenreId === genre.genre_id ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <input
                      type="text"
                      value={newGenreName}
                      onChange={(e) => setNewGenreName(e.target.value)}
                      className="form-control"
                    />
                    <div>
                      <button onClick={() => handleSaveEdit(genre.genre_id)} className="btn btn-sm btn-outline-primary me-2">Save</button>
                      <button onClick={handleCancelEdit} className="btn btn-sm btn-outline-secondary">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{genre.genre_name}</span>
                    <div>
                      <button onClick={() => handleEditClick(genre.genre_id, genre.genre_name)} className="btn btn-sm btn-outline-primary me-2">Edit</button>
                      <button onClick={() => handleDeleteGenre(genre.genre_id)} className="btn btn-sm btn-outline-danger">Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <nav className="mt-3">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(genres.length / genresPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
