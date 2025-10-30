// components/user/UserHome.js
import React, { useState, useEffect } from 'react';
import TicketTable from '../common/TicketTable';
import CreateTicket from './CreateTicket';

const UserHome = ({ activeTab, setActiveTab }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'home') {
      fetchUserTickets();
    }
  }, [activeTab]);

  const fetchUserTickets = async () => {
    try {
      // Commented actual API call - using mock data for now
      // const response = await fetch('http://localhost:8083/ticket/getAllUserTickets', {
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
          status: 'Closed'
        },
        {
          TicketID: '2',
          IncidentType: 'Enhancement',
          TeamName: 'TeamPL1',
          DefectCategory: 'Slowness',
          Description: 'System was very slow',
          IncidentSeverity: 'Medium',
          applicationName: 'Banking system',
          IssueFrom: '2025-07-02',
          status: 'InProgress'
        }
      ];
      
      setTickets(mockTickets);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="tab-content">
            <h2>My Tickets</h2>
            <TicketTable 
              tickets={tickets} 
              loading={loading}
              userRole="USER"
            />
          </div>
        );
      case 'menu':
        return (
        <div className="tab-content">
            <CreateTicket onTicketCreated={fetchUserTickets} setActiveTab={setActiveTab} />
        </div>
    );
      default:
        return null;
    }
  };

  return (
    <div className="user-home">
      {renderContent()}
    </div>
  );
};

export default UserHome;