import React from 'react';

export default function SearchAndFilters({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  filterOptions, 
  onClearFilters 
}) {
  const hasActiveFilters = 
    Boolean(searchQuery) || 
    Boolean(filters.role) || 
    Boolean(filters.department) || 
    Boolean(filters.shift) || 
    Boolean(filters.status);

  return (
    <div className="controls-card">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search staff by name, email, phone or role..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="role-filter">Role</label>
          <select
            id="role-filter"
            className="form-select"
            value={filters.role || ''}
            onChange={(e) => onFilterChange('role', e.target.value)}
          >
            <option value="">All Roles</option>
            {filterOptions.roles?.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="department-filter">Department</label>
          <select
            id="department-filter"
            className="form-select"
            value={filters.department || ''}
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            {filterOptions.departments?.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="shift-filter">Shift</label>
          <select
            id="shift-filter"
            className="form-select"
            value={filters.shift || ''}
            onChange={(e) => onFilterChange('shift', e.target.value)}
          >
            <option value="">All Shifts</option>
            {filterOptions.shifts?.map((shift) => (
              <option key={shift} value={shift}>{shift}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            className="form-select"
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {filterOptions.statuses?.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="filter-group" style={{ justifyContent: 'flex-end' }}>
            <label style={{ visibility: 'hidden' }}>Clear</label>
            <button
              className="btn btn-secondary"
              onClick={onClearFilters}
              style={{ width: '100%' }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
