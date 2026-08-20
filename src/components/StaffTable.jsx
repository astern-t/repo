import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

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
                <div style={{ display: 'inline-flex', gap: '0.25rem' }}>
                  <button
                    className="btn-icon"
                    onClick={() => onView(member)}
                    title="View details"
                  >
                    <Eye size={16} color="#3b82f6" />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => onEdit(member)}
                    title="Edit staff"
                  >
                    <Edit size={16} color="#059669" />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => onDelete(member)}
                    title="Delete staff"
                  >
                    <Trash2 size={16} color="#dc2626" />
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
