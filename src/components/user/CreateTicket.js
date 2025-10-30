import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const CreateTicket = ({ onTicketCreated, setActiveTab }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    IncidentType: '',
    TeamName: '',
    DefectCataegory: '', // ✅ CORRECT SPELLING
    Description: '',
    IncidentSeverity: '',
    applicationName: '',
    IssueFrom: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8083/ticket/createTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Ticket created successfully!');
        
        setFormData({
          IncidentType: '',
          TeamName: '',
          DefectCataegory: '', // ✅ CORRECT SPELLING
          Description: '',
          IncidentSeverity: '',
          applicationName: '',
          IssueFrom: ''
        });
        
        if (onTicketCreated) onTicketCreated();
        if (setActiveTab) setActiveTab('home');
      } else {
        throw new Error('Failed to create ticket');
      }
    } catch (error) {
      console.error('Failed to create ticket:', error);
      alert('Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClear = () => {
    setFormData({
      IncidentType: '',
      TeamName: '',
      DefectCataegory: '', // ✅ CORRECT SPELLING
      Description: '',
      IncidentSeverity: '',
      applicationName: '',
      IssueFrom: ''
    });
  };

  return (
    <div className="create-ticket">
      <h2>Create New Support Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-row">
          <div className="form-group">
            <label>Incident Type *</label>
            <select 
              name="IncidentType" 
              value={formData.IncidentType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Incident Type --</option>
              <option value="Defect">Defect</option>
              <option value="Enhancement">Enhancement</option>
              <option value="Environment">Environment</option>
              <option value="Inspection">Inspection</option>
              <option value="Production">Production</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Team Name *</label>
            <input
              type="text"
              name="TeamName"
              value={formData.TeamName}
              onChange={handleChange}
              required
              placeholder="Enter team name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Defect Category *</label>
            <select 
              name="DefectCataegory" // ✅ CORRECT SPELLING
              value={formData.DefectCataegory}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="ApplicationError">Application Error</option>
              <option value="Slowness">Slowness</option>
              <option value="CredentialIssue">Credential Issue</option>
              <option value="UnknownError">Unknown Error</option>
              <option value="WebPageError">Web Page Error</option>
              <option value="Server Crashed">Server Crashed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Incident Severity *</label>
            <select 
              name="IncidentSeverity" 
              value={formData.IncidentSeverity}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Severity --</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Application Name *</label>
            <input
              type="text"
              name="applicationName"
              value={formData.applicationName}
              onChange={handleChange}
              required
              placeholder="Enter application name"
            />
          </div>

          <div className="form-group">
            <label>Issue Date *</label>
            <input 
              type="date"
              name="IssueFrom"
              value={formData.IssueFrom}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea 
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Please describe the issue in detail..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Submitting...' : 'Submit Ticket'}
          </button>
          <button type="button" onClick={handleClear} className="btn-secondary">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;