import React, { useState, useEffect } from 'react';
import TicketTable from '../common/TicketTable';
import { useAuth } from '../../contexts/AuthContext';

const ViewActivity = () => {
  const { token } = useAuth();
  const [activityTickets, setActivityTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      // Commented actual API call
      // const response = await fetch('http://localhost:8083/ticket/viewProdActivity', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      
      // Mock activity data (tickets worked on by this prod support)
      const mockActivity = [
        {
          TicketID: '1',
          IncidentType: 'Defect',
          TeamName: 'TeamProd',
          DefectCategory: 'ApplicationError',
          Description: 'Issue in Application - resolved',
          IncidentSeverity: 'High',
          applicationName: 'TradingSystem',
          IssueFrom: '2025-07-02',
          status: 'Closed',
          raisedBy: 'user1@bofa.com',
          assignedTo: 'prod@bofa.com'
        }
      ];
      setActivityTickets(mockActivity);
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = (ticket) => {
    // Prod support can view tickets they've worked on
    console.log('Activity ticket clicked:', ticket);
  };

  return (
    <div className="view-activity">
      <h2>My Activity</h2>
      <p>Tickets that I have worked on or am currently assigned to</p>
      
      <TicketTable 
        tickets={activityTickets} 
        loading={loading}
        userRole="PROD_SUPP"
        onTicketClick={handleTicketClick}
      />
    </div>
  );
};

export default ViewActivity;