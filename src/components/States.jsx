import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

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
      <WifiOff size={40} color="#ef4444" />
      <h3 style={{ color: 'var(--text-main)' }}>Connection Issue</h3>
      <p style={{ maxWidth: '400px' }}>
        {message || 'Unable to connect to the staff API. Please try again.'}
      </p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message, hasActiveFilters, onClearFilters }) {
  return (
    <div className="state-container">
      <p>{message || 'No staff members found.'}</p>
      {hasActiveFilters && onClearFilters && (
        <button className="btn btn-secondary" onClick={onClearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
}
