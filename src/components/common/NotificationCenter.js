// components/common/NotificationCenter.js
import React from 'react';

const NotificationCenter = ({ onClose }) => {
  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'NEW_TICKET',
      message: 'New ticket created: TKT-001',
      ticketId: '1',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: 2,
      type: 'TICKET_UPDATE',
      message: 'Ticket TKT-002 has been updated',
      ticketId: '2',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    }
  ];

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button onClick={onClose}>×</button>
      </div>
      <div className="notification-list">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
          >
            <div className="notification-message">
              {notification.message}
            </div>
            <div className="notification-time">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="no-notifications">No notifications</div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;