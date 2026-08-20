import React from 'react';

export function LoadingState({ message = 'Loading staff members...' }) {
  return (
    <div className="state-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-container">
      <h3 style={{ color: 'var(--text-main)' }}>Connection Issue</h3>
      <p style={{ maxWidth: '400px' }}>
        {message || 'Unable to connect to the staff API. Please try again.'}
      </p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} style={{ marginTop: '0.5rem' }}>
          Retry Connection
        </button>
      )}
    </div>
  );
}

export function EmptyState({ onAddClick, hasFilters }) {
  return (
    <div className="state-container">
      <h3>No Staff Members Found</h3>
      <p style={{ maxWidth: '420px' }}>
        {hasFilters
          ? 'No staff members matched your current filter criteria. Try clearing some filters.'
          : 'Get started by adding your first staff member to the directory.'}
      </p>
      {onAddClick && (
        <button className="btn btn-primary" onClick={onAddClick} style={{ marginTop: '0.5rem' }}>
          + Add Staff Member
        </button>
      )}
    </div>
  );
}
