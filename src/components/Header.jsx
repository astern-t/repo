import React from 'react';
import { UserPlus, Edit3, Building2 } from 'lucide-react';

export default function Header({ onAddClick, onUpdateByEmailClick }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-titles">
          <h1>
            <Building2 className="w-6 h-6 text-blue-600" size={24} color="#3b82f6" />
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
            <Edit3 size={16} />
            Update by Email
          </button>
          <button 
            className="btn btn-primary"
            onClick={onAddClick}
          >
            <UserPlus size={16} />
            + Add Staff
          </button>
        </div>
      </div>
    </header>
  );
}
