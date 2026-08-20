import React from 'react';

export default function Header({ onAddClick, onUpdateByEmailClick }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-titles">
          <h1>
            Hotel Staff Manager
          </h1>
          <p>Manage your hotel staff, roles, schedules and status.</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={onUpdateByEmailClick}
            title="Locate and update a staff member by email"
          >
            Update by Email
          </button>
          <button 
            className="btn btn-primary"
            onClick={onAddClick}
          >
            + Add Staff
          </button>
        </div>
      </div>
    </header>
  );
}
