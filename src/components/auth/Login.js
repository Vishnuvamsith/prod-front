import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
//import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(credentials.email, credentials.password);
    
    if (!result.success) {
      alert(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // Demo credentials for testing
  const fillDemoCredentials = (role) => {
    const demos = {
      user: { email: 'user@bofa.com', password: 'password' },
      prod: { email: 'prod@bofa.com', password: 'password' },
      admin: { email: 'admin@bofa.com', password: 'password' }
    };
    setCredentials(demos[role]);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Production Support Tracker</h2>
        <p className="login-subtitle">Sign in to your account</p>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="demo-credentials">
          <p>Demo Accounts:</p>
          <div className="demo-buttons">
            <button type="button" onClick={() => fillDemoCredentials('user')}>
              User
            </button>
            <button type="button" onClick={() => fillDemoCredentials('prod')}>
              Prod Support
            </button>
            <button type="button" onClick={() => fillDemoCredentials('admin')}>
              Admin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;