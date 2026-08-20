import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function StaffFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null, 
  roles = [], 
  shifts = ['Morning', 'Evening', 'Night'], 
  statuses = ['Active', 'On Leave', 'Inactive'],
  isLoading = false,
  errorBanner = null
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    shift: 'Morning',
    status: 'Active',
    joiningDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        role: initialData.role || (roles.length > 0 ? roles[0] : ''),
        shift: initialData.shift || 'Morning',
        status: initialData.status || 'Active',
        joiningDate: initialData.joiningDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        role: roles.length > 0 ? roles[0] : '',
        shift: 'Morning',
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [initialData, isOpen, roles]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must contain exactly 10 digits';
    }

    if (!formData.role) {
      newErrors.role = 'Role selection is required';
    }

    if (!formData.shift) {
      newErrors.shift = 'Shift selection is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status selection is required';
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const isEditing = Boolean(initialData);

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
          <button className="btn-icon" onClick={onClose} disabled={isLoading}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="modal-body">
            {errorBanner && (
              <div className="alert alert-danger">
                {errorBanner}
              </div>
            )}

            {isEditing && (
              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '0.5rem', border: '1px solid #e2e8f0' }}>
                <p><strong>Employee Code:</strong> {initialData.employeeCode || 'Auto-generated'}</p>
                <p><strong>Department:</strong> {initialData.department || 'Auto-managed by role'}</p>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                  id="fullName"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Ananya Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isLoading}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="e.g. ananya@hotel.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone (10 digits) <span className="required">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isLoading}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role">Role <span className="required">*</span></label>
                <select
                  id="role"
                  className="form-select"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={isLoading}
                >
                  <option value="" disabled>Select Role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.role && <span className="error-text">{errors.role}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="shift">Shift <span className="required">*</span></label>
                <select
                  id="shift"
                  className="form-select"
                  value={formData.shift}
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                  disabled={isLoading}
                >
                  {shifts.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.shift && <span className="error-text">{errors.shift}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="status">Status <span className="required">*</span></label>
                <select
                  id="status"
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  disabled={isLoading}
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                {errors.status && <span className="error-text">{errors.status}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="joiningDate">Joining Date <span className="required">*</span></label>
                <input
                  id="joiningDate"
                  type="date"
                  className="form-input"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  disabled={isLoading}
                />
                {errors.joiningDate && <span className="error-text">{errors.joiningDate}</span>}
              </div>
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
              {isLoading ? 'Saving...' : isEditing ? 'Update Staff' : 'Create Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
