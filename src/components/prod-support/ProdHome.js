// components/prod-support/ProdHome.js
import React, { useState, useEffect } from 'react';
import TicketTable from '../common/TicketTable';
import ViewActivity from './ViewActivity';
import ProdTicketView from './ProdTicketView';

const ProdHome = ({ activeTab, setActiveTab }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'home') {
      fetchProdTickets();
    }
  }, [activeTab]);

  const fetchProdTickets = async () => {
    try {
      // Commented actual API call - using mock data for now
      // const response = await fetch('http://localhost:8083/ticket/getAllProdTickets', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();
      
      // Mock data with raisedBy field
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
          status: 'Open',
          raisedBy: 'user1@bofa.com'
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
    fetchProdTickets();
  };

  if (selectedTicket) {
    return <ProdTicketView ticket={selectedTicket} onBack={handleBack} />;
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
              userRole="PROD_SUPP"
              onTicketClick={handleTicketClick}
            />
          </div>
        );
      case 'activity':
        return <ViewActivity />;
      default:
        return null;
    }
  };

  return (
    <div className="prod-home">
      {renderContent()}
    </div>
  );
};

export default ProdHome;