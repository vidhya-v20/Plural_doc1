import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [newMember, setNewMember] = useState({ name: '', email: '', username: '', password: '' });
  const [editMember, setEditMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5); // Number of members to display per page

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Error fetching members');
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`http://localhost:5000/members/${memberId}`);
        setMembers(members.filter(member => member.member_id !== memberId));
      } catch (error) {
        console.error('Error deleting member:', error);
        setError('Error deleting member');
      }
    }
  };

  const handleAddMember = async () => {
    try {
      await axios.post('http://localhost:5000/members', newMember);
      setNewMember({ name: '', email: '', username: '', password: '' });
      fetchMembers();
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Error adding member');
    }
  };

  const handleEditMember = async () => {
    if (!editMember) return;

    try {
      await axios.put(`http://localhost:5000/members/${editMember.member_id}`, editMember);
      setEditMember(null);
      fetchMembers();
    } catch (error) {
      console.error('Error editing member:', error);
      setError('Error editing member');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditMember({ ...editMember, [name]: value });
  };

  const enterEditMode = (member) => {
    setEditMember(member);
  };

  const cancelEdit = () => {
    setEditMember(null);
  };

  // Pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Manage Members</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <h4>Add New Member</h4>
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <input type="text" className="form-control" name="name" placeholder="Name" value={newMember.name} onChange={handleInputChange} />
                  </div>
                  <div className="col-sm-3">
                    <input type="email" className="form-control" name="email" placeholder="Email" value={newMember.email} onChange={handleInputChange} />
                  </div>
                  <div className="col-sm-2">
                    <input type="text" className="form-control" name="username" placeholder="Username" value={newMember.username} onChange={handleInputChange} />
                  </div>
                  <div className="col-sm-2">
                    <input type="password" className="form-control" name="password" placeholder="Password" value={newMember.password} onChange={handleInputChange} />
                  </div>
                  <div className="col-sm-2">
                    <button className="btn btn-primary btn-block" onClick={handleAddMember}>Add Member</button>
                  </div>
                </div>
              </div>
              <ul className="list-group">
                {currentMembers.map(member => (
                  <li key={member.member_id} className="list-group-item">
                    {editMember && editMember.member_id === member.member_id ? (
                      <div className="row align-items-center">
                        <div className="col-sm-3">
                          <input type="text" className="form-control" name="name" value={editMember.name} onChange={handleEditInputChange} />
                        </div>
                        <div className="col-sm-3">
                          <input type="email" className="form-control" name="email" value={editMember.email} onChange={handleEditInputChange} />
                        </div>
                        <div className="col-sm-2">
                          <input type="text" className="form-control" name="username" value={editMember.username} onChange={handleEditInputChange} />
                        </div>
                        <div className="col-sm-2">
                          <input type="password" className="form-control" name="password" value={editMember.password} onChange={handleEditInputChange} />
                        </div>
                        <div className="col-sm-2">
                          <button className="btn btn-success btn-sm me-2" onClick={handleEditMember}>Save</button>
                          <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="row align-items-center">
                        <div className="col">{member.name}</div>
                        <div className="col-auto">
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => enterEditMode(member)}>Edit</button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteMember(member.member_id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(members.length / membersPerPage) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
