import React from 'react';

export default function StaffDetailsModal({ isOpen, onClose, staff, onEdit }) {
  if (!isOpen || !staff) return null;

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'badge badge-active';
      case 'On Leave': return 'badge badge-leave';
      case 'Inactive': return 'badge badge-inactive';
      default: return 'badge';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>
            Staff Details
          </h2>
          <button className="btn-icon" onClick={onClose} style={{ fontSize: '1.25rem', lineHeight: 1 }}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{staff.fullName}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Employee Code</span>
              <span className="detail-value">
                <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                  {staff.employeeCode || '-'}
                </code>
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{staff.email}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{staff.phone}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Role</span>
              <span className="detail-value">{staff.role}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Department</span>
              <span className="detail-value">{staff.department || '-'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Shift</span>
              <span className="detail-value">{staff.shift}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <span className={getBadgeClass(staff.status)}>{staff.status}</span>
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Joining Date</span>
              <span className="detail-value">{staff.joiningDate || '-'}</span>
            </div>

            {staff.id && (
              <div className="detail-item">
                <span className="detail-label">Staff ID</span>
                <span className="detail-value" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {staff.id}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {onEdit && (
            <button 
              className="btn btn-primary" 
              onClick={() => {
                onClose();
                onEdit(staff);
              }}
            >
              Edit Staff
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
