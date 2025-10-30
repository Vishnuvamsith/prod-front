import React from 'react';

const UserTicketView = ({ ticket, onBack }) => {
  return (
    <div className="ticket-view">
      <button onClick={onBack} className="back-btn">← Back to My Tickets</button>
      
      <h2>Ticket Details #{ticket.TicketID}</h2>
      
      <div className="ticket-details">
        <div className="detail-row">
          <label>Incident Type:</label>
          <span>{ticket.IncidentType}</span>
        </div>
        <div className="detail-row">
          <label>Team Name:</label>
          <span>{ticket.TeamName}</span>
        </div>
        <div className="detail-row">
          <label>Defect Category:</label>
          <span>{ticket.DefectCategory}</span>
        </div>
        <div className="detail-row">
          <label>Description:</label>
          <span>{ticket.Description}</span>
        </div>
        <div className="detail-row">
          <label>Incident Severity:</label>
          <span className={`severity-badge severity-${ticket.IncidentSeverity}`}>
            {ticket.IncidentSeverity}
          </span>
        </div>
        <div className="detail-row">
          <label>Application Name:</label>
          <span>{ticket.applicationName}</span>
        </div>
        <div className="detail-row">
          <label>Issue Date:</label>
          <span>{new Date(ticket.IssueFrom).toLocaleDateString()}</span>
        </div>
        <div className="detail-row">
          <label>Status:</label>
          <span className={`status-badge status-${ticket.status}`}>
            {ticket.status}
          </span>
        </div>
      </div>

      <div className="ticket-actions">
        <p>For updates on this ticket, please contact production support.</p>
      </div>
    </div>
  );
};

export default UserTicketView;