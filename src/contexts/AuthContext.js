// contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Commented actual API call - using mock data for now
          // const response = await fetch('http://localhost:8083/auth/RBA', {
          //   headers: {
          //     'Authorization': `Bearer ${token}`
          //   }
          // });
          // const userData = await response.json();
          
          // Mock user data based on token
          const mockUsers = {
            'user_token': { email: 'user@bofa.com', role: 'USER', id: '1' },
            'prod_token': { email: 'prod@bofa.com', role: 'PROD_SUPP', id: '2' },
            'admin_token': { email: 'admin@bofa.com', role: 'ADMIN', id: '3' }
          };
          
          const userData = mockUsers[token] || mockUsers.user_token;
          setUser(userData);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      // Commented actual API call - using mock data for now
      // const response = await fetch('http://localhost:8083/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      
      // Mock login response
      const mockTokens = {
        'user@bofa.com': 'user_token',
        'prod@bofa.com': 'prod_token', 
        'admin@bofa.com': 'admin_token'
      };
      
      const mockToken = mockTokens[email] || 'user_token';
      const data = { token: mockToken };
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};