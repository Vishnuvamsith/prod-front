// src/components/prod-support/ProdTicketView.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProdTicketView = ({ ticket, onBack }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    assignTo: ticket.assignTo || '',
    status: ticket.status || 'Open'
  });
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Commented actual API call - using mock data for now
      // const response = await fetch(`http://localhost:8083/ticket/UpdateTicket/${ticket.TicketID}/${formData.status}/${formData.assignTo}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // Mock successful update
      console.log('Ticket updated:', formData);
      alert('Ticket updated successfully!');
      onBack();
    } catch (error) {
      console.error('Failed to update ticket:', error);
      alert('Failed to update ticket');
    } finally {
      setUpdating(false);
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
        <h2>Update Ticket #{ticket.TicketID}</h2>
        
        {/* Ticket Details Section */}
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
            <div className="detail-item full-width">
              <label>Description:</label>
              <span>{ticket.Description}</span>
            </div>
          </div>
        </div>

        {/* Update Form Section */}
        <div className="update-section">
          <h3>Update Assignment</h3>
          <form onSubmit={handleUpdate} className="update-form">
            <div className="form-row">
              <div className="form-group">
                <label>Assign To Engineer</label>
                <select 
                  name="assignTo" 
                  value={formData.assignTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Engineer --</option>
                  <option value="engineer1@bofa.com">John Smith (Engineer 1)</option>
                  <option value="engineer2@bofa.com">Sarah Johnson (Engineer 2)</option>
                  <option value="engineer3@bofa.com">Mike Davis (Engineer 3)</option>
                  <option value="engineer4@bofa.com">Emily Wilson (Engineer 4)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status" 
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Open">Open</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                  <option value="Invalid">Invalid</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={updating} className="btn-primary">
                {updating ? 'Updating...' : 'Update Ticket'}
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

export default ProdTicketView;