import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const getUserTabs = () => {
    switch (user.role) {
      case 'USER':
        return [
          { key: 'home', label: 'Home', icon: '🏠' },
          { key: 'menu', label: 'Create Ticket', icon: '📝' }
        ];
      case 'PROD_SUPP':
        return [
          { key: 'home', label: 'All Tickets', icon: '📋' },
          { key: 'activity', label: 'My Activity', icon: '👨‍💼' }
        ];
      case 'ADMIN':
        return [
          { key: 'home', label: 'All Tickets', icon: '📋' },
          { key: 'menu', label: 'Admin Menu', icon: '⚙️' },
          { key: 'reports', label: 'Reports', icon: '📊' }
        ];
      default:
        return [];
    }
  };

  const tabs = getUserTabs();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Navigation</h3>
      </div>
      <nav className="sidebar-nav">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`sidebar-item ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="sidebar-icon">{tab.icon}</span>
            <span className="sidebar-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;