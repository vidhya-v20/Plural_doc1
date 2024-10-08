import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members');
      setUsers(response.data); // Assuming response.data is an array of user objects
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error fetching users
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if the selected username exists in the users array
      const selectedUser = users.find(user => user.username === username);
      if (!selectedUser) {
        setError('User not found');
        return;
      }

      // Perform login request
      const response = await axios.post('http://localhost:5000/UserLogin', { username, password });
      console.log(response.data); // For testing purposes, can be replaced with redirection logic
      // Assuming successful login should redirect to dashboard
      // Replace the following line with your redirection logic
      window.location.href = '/dashboard'; // Redirect to dashboard page
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if username is already taken
      const existingUser = users.find(user => user.username === username);
      if (existingUser) {
        setError('Username already taken');
        return;
      }

      // Register the new member
      const response = await axios.post('http://localhost:5000/members', { name, email, username, password });
      console.log(response.data); // For testing purposes, can be replaced with redirection logic
      // Assuming successful registration should redirect to dashboard
      // Replace the following line with your redirection logic
      window.location.href = '/dashboard'; // Redirect to dashboard page
    } catch (error) {
      console.error('Registration error:', error);
      setError('Error registering user');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h2>User Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <select
                className="form-select"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              >
                <option value="">Select username</option>
                {users.map(user => (
                  <option key={user.member_id} value={user.username}>{user.username}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
        <div className="col">
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerUsername" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="registerUsername"
                name="registerUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="registerPassword"
                name="registerPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
