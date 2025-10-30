import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TicketTable from '../common/TicketTable';

const Reports = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const fetchAllTickets = async () => {
    try {
      // ✅ COMMENTED ACTUAL API CALL - READY FOR INTEGRATION
      /*
      const response = await fetch('http://localhost:8083/ticket/getAllAdminTickets', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      
      const data = await response.json();
      setTickets(data);
      setFilteredTickets(data);
      */
      
      // 🎭 MOCK DATA - CURRENTLY BEING USED
      const mockTickets = [
        {
          TicketID: 'TKT-001',
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
        },
        {
          TicketID: 'TKT-002',
          IncidentType: 'Enhancement',
          TeamName: 'TeamPL1',
          DefectCategory: 'Slowness',
          Description: 'System performance issues',
          IncidentSeverity: 'Medium',
          applicationName: 'BankingSystem',
          IssueFrom: '2025-07-03',
          status: 'InProgress',
          raisedBy: 'user2@bofa.com',
          prodSupp: 'prod2@bofa.com'
        },
        {
          TicketID: 'TKT-003',
          IncidentType: 'Environment',
          TeamName: 'TeamPL2',
          DefectCategory: 'CredentialIssue',
          Description: 'Login authentication failure',
          IncidentSeverity: 'High',
          applicationName: 'InsurancePortal',
          IssueFrom: '2025-07-01',
          status: 'Open',
          raisedBy: 'user3@bofa.com',
          prodSupp: ''
        }
      ];
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = () => {
    if (!dateRange.fromDate || !dateRange.toDate) {
      alert('Please select both from and to dates');
      return;
    }

    const filtered = tickets.filter(ticket => {
      const ticketDate = new Date(ticket.IssueFrom);
      const fromDate = new Date(dateRange.fromDate);
      const toDate = new Date(dateRange.toDate);
      
      return ticketDate >= fromDate && ticketDate <= toDate;
    });

    setFilteredTickets(filtered);
  };

  const clearFilters = () => {
    setDateRange({ fromDate: '', toDate: '' });
    setFilteredTickets(tickets);
  };

  const exportToExcel = () => {
    const headers = ['TicketID', 'IncidentType', 'TeamName', 'DefectCategory', 'Description', 'IncidentSeverity', 'ApplicationName', 'IssueFrom', 'Status', 'RaisedBy', 'AssignedTo'];
    const csvContent = [
      headers.join(','),
      ...filteredTickets.map(ticket => 
        headers.map(header => 
          `"${ticket[header] || ''}"`
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tickets-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusCount = (status) => {
    return filteredTickets.filter(t => t.status === status).length;
  };

  return (
    <div className="reports">
      <div className="reports-header">
        <div className="header-content">
          <h2>Reports & Analytics</h2>
          <p>Generate and export ticket reports with date filters</p>
        </div>
        
        <div className="filters-section">
          <div className="filter-group">
            <h4>Date Range Filter</h4>
            <div className="date-inputs">
              <div className="form-group compact">
                <label>From Date</label>
                <input
                  type="date"
                  value={dateRange.fromDate}
                  onChange={(e) => setDateRange({...dateRange, fromDate: e.target.value})}
                />
              </div>
              
              <div className="form-group compact">
                <label>To Date</label>
                <input
                  type="date"
                  value={dateRange.toDate}
                  onChange={(e) => setDateRange({...dateRange, toDate: e.target.value})}
                />
              </div>
              
              <div className="filter-actions">
                <button onClick={handleDateFilter} className="btn-primary">
                  Apply Filter
                </button>
                <button onClick={clearFilters} className="btn-secondary">
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="export-section">
            <div className="export-group">
              <h4>Export Data</h4>
              <button onClick={exportToExcel} className="btn-success export-btn">
                📊 Export to Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="reports-summary">
        <h3>Summary Overview</h3>
        <div className="summary-cards">
          <div className="summary-card total">
            <div className="card-content">
              <h4>Total Tickets</h4>
              <span className="count">{filteredTickets.length}</span>
            </div>
          </div>
          <div className="summary-card open">
            <div className="card-content">
              <h4>Open</h4>
              <span className="count">{getStatusCount('Open')}</span>
            </div>
          </div>
          <div className="summary-card progress">
            <div className="card-content">
              <h4>In Progress</h4>
              <span className="count">{getStatusCount('InProgress')}</span>
            </div>
          </div>
          <div className="summary-card closed">
            <div className="card-content">
              <h4>Closed</h4>
              <span className="count">{getStatusCount('Closed')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="reports-data">
        <div className="section-header">
          <h3>Ticket Details</h3>
          <span className="result-count">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </span>
        </div>
        <TicketTable 
          tickets={filteredTickets} 
          loading={loading}
          userRole="ADMIN"
        />
      </div>
    </div>
  );
};

export default Reports;