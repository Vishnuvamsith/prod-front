// components/admin/AdminHome.js
import React, { useState, useEffect } from 'react';
import TicketTable from '../common/TicketTable';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Escalations from './Escalations';
import AdminTicketView from './AdminTicketView';

const AdminHome = ({ activeTab, setActiveTab }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'home') {
      fetchAdminTickets();
    }
  }, [activeTab]);

  const fetchAdminTickets = async () => {
    try {
      // Commented actual API call - using mock data for now
      // const response = await fetch('http://localhost:8083/ticket/getAllAdminTickets', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();
      
      // Mock data
      const mockTickets = [
        {
          TicketID: '1',
          IncidentType: 'Defect',
          TeamName: 'TeamProd',
          DefectCategory: 'ApplicationError',
          Description: 'Issue in Application',
          IncidentSeverity: 'High',
          applicationName: 'TradingSystem',
          IssueFrom: '2025-07-02',
          status: 'Closed',
          raisedBy: 'user1@bofa.com',
          prodSupp: 'prod1@bofa.com'
        }
      ];
      
      setTickets(mockTickets);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleBack = () => {
    setSelectedTicket(null);
    fetchAdminTickets();
  };

  if (selectedTicket) {
    return <AdminTicketView ticket={selectedTicket} onBack={handleBack} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="tab-content">
            <h2>All Tickets</h2>
            <TicketTable 
              tickets={tickets} 
              loading={loading}
              userRole="ADMIN"
              onTicketClick={handleTicketClick}
            />
          </div>
        );
      case 'menu':
        return (
          <div className="admin-menu">
            <div className="menu-section">
              <h2>Escalations</h2>
              <Escalations />
            </div>
            <div className="menu-section">
              <h2>User Management</h2>
              <UserManagement />
            </div>
          </div>
        );
      case 'reports':
        return <Reports />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-home">
      {renderContent()}
    </div>
  );
};

export default AdminHome;