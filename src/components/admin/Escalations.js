import React, { useState, useEffect } from 'react';
import TicketTable from '../common/TicketTable';

const Escalations = () => {
  const [escalatedTickets, setEscalatedTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEscalations();
  }, []);

  const fetchEscalations = async () => {
    try {
      // Commented actual API call
      // const response = await fetch('http://localhost:8083/ticket/viewescalations', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      
      // Mock escalated tickets (tickets older than 2 days with Open status)
      const mockEscalations = [
        {
          TicketID: 'ESC-001',
          IncidentType: 'Defect',
          TeamName: 'TeamProd',
          DefectCategory: 'ApplicationError',
          Description: 'Critical system failure - no response for 3 days',
          IncidentSeverity: 'High',
          applicationName: 'TradingSystem',
          IssueFrom: '2025-07-01',
          status: 'Open',
          raisedBy: 'user@bofa.com',
          daysOpen: 3
        }
      ];
      setEscalatedTickets(mockEscalations);
    } catch (error) {
      console.error('Failed to fetch escalations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = (ticket) => {
    // Admin can click to view escalated ticket details
    console.log('Escalated ticket clicked:', ticket);
    alert(`Escalated Ticket: ${ticket.TicketID}\nDays Open: ${ticket.daysOpen}`);
  };

  return (
    <div className="escalations">
      <div className="escalations-header">
        <h3>Escalated Tickets</h3>
        <p>Tickets not responded to within 2 days</p>
      </div>
      
      <TicketTable 
        tickets={escalatedTickets} 
        loading={loading}
        userRole="ADMIN"
        onTicketClick={handleTicketClick}
      />
    </div>
  );
};

export default Escalations;