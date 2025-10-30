// components/common/Header.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationCenter from './NotificationCenter';

const Header = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const getUserTabs = () => {
    switch (user.role) {
      case 'USER':
        return [
          { key: 'home', label: 'Home' },
          { key: 'menu', label: 'Menu' }
        ];
      case 'PROD_SUPP':
        return [
          { key: 'home', label: 'Home' },
          { key: 'activity', label: 'View Activity' }
        ];
      case 'ADMIN':
        return [
          { key: 'home', label: 'Home' },
          { key: 'menu', label: 'Menu' },
          { key: 'reports', label: 'Reports' }
        ];
      default:
        return [];
    }
  };

  const tabs = getUserTabs();

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">Production Support Tracker</h1>
        <nav className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`nav-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span className="user-email">{user.email}</span>
          <span className="user-role">({user.role})</span>
        </div>
        <button 
          className="notification-btn"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          🔔
        </button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} />
      )}
    </header>
  );
};

export default Header;