import React from 'react';

export default function Stats({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <h3>Total Staff</h3>
          <p>{stats.total || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>Active</h3>
          <p>{stats.active || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>On Leave</h3>
          <p>{stats.onLeave || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>Inactive</h3>
          <p>{stats.inactive || 0}</p>
        </div>
      </div>
    </div>
  );
}
