import React from 'react';

export default function StaffTable({ staffList, onView, onEdit, onDelete }) {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge badge-active';
      case 'On Leave':
        return 'badge badge-leave';
      case 'Inactive':
        return 'badge badge-inactive';
      default:
        return 'badge';
    }
  };

  return (
    <div className="table-wrapper">
      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee Code</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Department</th>
            <th>Shift</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((member) => (
            <tr key={member.id}>
              <td>
                <strong style={{ color: 'var(--text-main)' }}>{member.fullName}</strong>
              </td>
              <td>
                <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {member.employeeCode || '-'}
                </code>
              </td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.role}</td>
              <td>{member.department || '-'}</td>
              <td>{member.shift}</td>
              <td>
                <span className={getBadgeClass(member.status)}>
                  {member.status}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => onView(member)}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => onEdit(member)}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(member)}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
