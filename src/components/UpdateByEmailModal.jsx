import React, { useState } from 'react';

export default function UpdateByEmailModal({ 
  isOpen, 
  onClose, 
  onSearchEmail, 
  isLoading 
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter a staff email address');
      return;
    }
    setError('');
    onSearchEmail(email.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h2>Update Staff by Email</h2>
          <button className="btn-icon" onClick={onClose} disabled={isLoading} style={{ fontSize: '1.25rem', lineHeight: 1 }}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Enter the staff member's email address below to fetch their existing records and update their information.
            </p>

            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label htmlFor="lookup-email">Staff Email <span className="required">*</span></label>
              <input
                id="lookup-email"
                type="email"
                className="form-input"
                placeholder="e.g. staff.member@hotel.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                disabled={isLoading}
                autoFocus
              />
              {error && <span className="error-text">{error}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Find & Edit Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
