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
      // Commented actual API call
      // const response = await fetch('http://localhost:8083/api/Users/allUsers', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      
      // Mock data
      const mockUsers = [
        {
          email: 'admin@bofa.com',
          id: '1',
          password: 'encrypted',
          role: 'ADMIN'
        },
        {
          email: 'prod@bofa.com',
          id: '2',
          password: 'encrypted',
          role: 'PROD_SUPP'
        },
        {
          email: 'user@bofa.com',
          id: '3',
          password: 'encrypted',
          role: 'USER'
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      // Commented actual API call
      // const response = await fetch('http://localhost:8083/api/Users/add', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(newUser)
      // });
      
      // Mock success
      alert('User created successfully!');
      setNewUser({ email: '', password: '', role: 'USER' });
      setShowAddForm(false);
      fetchUsers();
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
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                required
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
              <button type="submit">Create User</button>
              <button type="button" onClick={() => setShowAddForm(false)}>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;