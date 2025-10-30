// components/common/TicketTable.js
import React, { useState } from 'react';

const TicketTable = ({ tickets, loading, userRole, onTicketClick }) => {
  const [filters, setFilters] = useState({
    IncidentType: '',
    TeamName: '',
    status: ''
  });

  const filteredTickets = tickets.filter(ticket => {
    return (
      (!filters.IncidentType || ticket.IncidentType === filters.IncidentType) &&
      (!filters.TeamName || ticket.TeamName === filters.TeamName) &&
      (!filters.status || ticket.status === filters.status)
    );
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  return (
    <div className="ticket-table-container">
      <div className="table-filters">
        <select 
          value={filters.IncidentType} 
          onChange={(e) => handleFilterChange('IncidentType', e.target.value)}
        >
          <option value="">All Incident Types</option>
          <option value="Defect">Defect</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Environment">Environment</option>
        </select>
        
        <select 
          value={filters.TeamName} 
          onChange={(e) => handleFilterChange('TeamName', e.target.value)}
        >
          <option value="">All Teams</option>
          <option value="TeamProd">TeamProd</option>
          <option value="TeamPL1">TeamPL1</option>
          <option value="TeamPL2">TeamPL2</option>
        </select>

        <select 
          value={filters.status} 
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Incident Type</th>
              <th>Team Name</th>
              <th>Defect Category</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Application</th>
              <th>Issue Date</th>
              <th>Status</th>
              {userRole === 'ADMIN' && <th>Raised By</th>}
              {userRole === 'ADMIN' && <th>Assigned To</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr 
                key={ticket.TicketID} 
                className={`ticket-row status-${ticket.status}`}
                onClick={() => onTicketClick && onTicketClick(ticket)}
              >
                <td className="ticket-id">
                  {onTicketClick ? (
                    <button className="ticket-link">{ticket.TicketID}</button>
                  ) : (
                    ticket.TicketID
                  )}
                </td>
                <td>{ticket.IncidentType}</td>
                <td>{ticket.TeamName}</td>
                <td>{ticket.DefectCategory}</td>
                <td className="description">{ticket.Description}</td>
                <td>
                  <span className={`severity-badge severity-${ticket.IncidentSeverity}`}>
                    {ticket.IncidentSeverity}
                  </span>
                </td>
                <td>{ticket.applicationName}</td>
                <td>{new Date(ticket.IssueFrom).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge status-${ticket.status}`}>
                    {ticket.status}
                  </span>
                </td>
                {userRole === 'ADMIN' && <td>{ticket.raisedBy}</td>}
                {userRole === 'ADMIN' && <td>{ticket.prodSupp || 'Not Assigned'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTickets.length === 0 && (
          <div className="no-tickets">No tickets found</div>
        )}
      </div>
    </div>
  );
};

export default TicketTable;