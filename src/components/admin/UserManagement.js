import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserManagement = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'USER'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/Users/allUsers', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      console.log('Users data:', data); // Debug log
      
      // ✅ Since it's a direct array, we can set it directly
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8083/api/Users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });
      
      if (response.ok) {
        const result = await response.text();
        alert('User created successfully!');
        setNewUser({ email: '', password: '', role: 'USER' });
        setShowAddForm(false);
        fetchUsers(); // Refresh the list
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Failed to add user');
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="user-management">
      <div className="section-header">
        <h3>User Management</h3>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New User
        </button>
      </div>

      {showAddForm && (
        <div className="add-user-form">
          <h4>Add New User</h4>
          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required
                placeholder="Enter email address"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                required
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="USER">USER</option>
                <option value="PROD_SUPP">PROD_SUPP</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Create User</button>
              <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-grid">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.id}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;