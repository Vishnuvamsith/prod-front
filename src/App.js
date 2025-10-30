// App.js
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Header from './components/common/Header';
import UserHome from './components/user/UserHome';
import ProdHome from './components/prod-support/ProdHome';
import AdminHome from './components/admin/AdminHome';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (user.role) {
      case 'USER':
        return <UserHome activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'PROD_SUPP':
        return <ProdHome activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'ADMIN':
        return <AdminHome activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-content">
        {renderContent()}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;