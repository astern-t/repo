import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, staffName, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '440px' }}>
        <div className="modal-header" style={{ borderBottom: 'none' }}>
          <h2 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={22} />
            Delete Staff Member?
          </h2>
        </div>

        <div className="modal-body" style={{ paddingTop: 0 }}>
          <p>
            Are you sure you want to delete <strong>{staffName || 'this staff member'}</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
