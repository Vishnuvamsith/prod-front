// src/components/admin/AdminTicketView.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminTicketView = ({ ticket, onBack }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    assignTo: ticket.prodSupp || '',
    status: ticket.status || 'Open'
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Commented actual API call
      // const response = await fetch(`http://localhost:8083/ticket/UpdateTicket/${ticket.TicketID}/${formData.status}/${formData.assignTo}`, {
      //   method: 'PUT',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      
      alert('Ticket updated successfully!');
      onBack();
    } catch (error) {
      console.error('Failed to update ticket:', error);
      alert('Failed to update ticket');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="ticket-view">
      <button onClick={onBack} className="back-btn">← Back to Tickets</button>
      
      <div className="tab-content">
        <h2>Admin Ticket View #{ticket.TicketID}</h2>
        
        <div className="ticket-details-section">
          <h3>Ticket Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <label>Incident Type:</label>
              <span>{ticket.IncidentType}</span>
            </div>
            <div className="detail-item">
              <label>Team Name:</label>
              <span>{ticket.TeamName}</span>
            </div>
            <div className="detail-item">
              <label>Defect Category:</label>
              <span>{ticket.DefectCategory}</span>
            </div>
            <div className="detail-item">
              <label>Incident Severity:</label>
              <span className={`severity-badge severity-${ticket.IncidentSeverity}`}>
                {ticket.IncidentSeverity}
              </span>
            </div>
            <div className="detail-item">
              <label>Application Name:</label>
              <span>{ticket.applicationName}</span>
            </div>
            <div className="detail-item">
              <label>Raised By:</label>
              <span>{ticket.raisedBy}</span>
            </div>
            <div className="detail-item">
              <label>Assigned To:</label>
              <span>{ticket.prodSupp || 'Not Assigned'}</span>
            </div>
            <div className="detail-item full-width">
              <label>Description:</label>
              <span>{ticket.Description}</span>
            </div>
          </div>
        </div>

        <div className="update-section">
          <h3>Admin Actions</h3>
          <form onSubmit={handleUpdate} className="update-form">
            <div className="form-row">
              <div className="form-group">
                <label>Assign To Support Engineer</label>
                <select 
                  name="assignTo" 
                  value={formData.assignTo}
                  onChange={handleChange}
                >
                  <option value="">-- Select Engineer --</option>
                  <option value="prod1@bofa.com">Production Support 1</option>
                  <option value="prod2@bofa.com">Production Support 2</option>
                  <option value="prod3@bofa.com">Production Support 3</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status" 
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Open">Open</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Closed">Closed</option>
                  <option value="Invalid">Invalid</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Update Ticket
              </button>
              <button type="button" onClick={onBack} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketView;