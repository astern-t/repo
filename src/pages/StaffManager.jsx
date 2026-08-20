import React, { useState, useEffect, useCallback } from 'react';
import { staffApi } from '../services/staffApi';
import Header from '../components/Header';
import Stats from '../components/Stats';
import SearchAndFilters from '../components/SearchAndFilters';
import StaffTable from '../components/StaffTable';
import Pagination from '../components/Pagination';
import StaffFormModal from '../components/StaffFormModal';
import UpdateByEmailModal from '../components/UpdateByEmailModal';
import StaffDetailsModal from '../components/StaffDetailsModal';
import DeleteModal from '../components/DeleteModal';
import { LoadingState, ErrorState, EmptyState } from '../components/States';

export default function StaffManager() {
  const [staffList, setStaffList] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [stats, setStats] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    roles: ['General Manager', 'Front Desk', 'Housekeeping', 'Chef', 'Waiter', 'Security', 'Maintenance'],
    departments: [],
    shifts: ['Morning', 'Evening', 'Night'],
    statuses: ['Active', 'On Leave', 'Inactive']
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    department: '',
    shift: '',
    status: ''
  });
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bannerMessage, setBannerMessage] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const [isEmailLookupOpen, setIsEmailLookupOpen] = useState(false);
  const [emailLookupLoading, setEmailLookupLoading] = useState(false);

  const [selectedStaffDetails, setSelectedStaffDetails] = useState(null);

  const [deletingStaff, setDeletingStaff] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const fetchInitialMetadata = async () => {
      const [filterRes, statsRes] = await Promise.all([
        staffApi.getFilters(),
        staffApi.getStats()
      ]);

      if (filterRes.success && filterRes.data) {
        setFilterOptions((prev) => ({
          ...prev,
          roles: filterRes.data.roles || prev.roles,
          departments: filterRes.data.departments || prev.departments,
          shifts: filterRes.data.shifts || prev.shifts,
          statuses: filterRes.data.statuses || prev.statuses,
        }));
      }

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }
    };

    fetchInitialMetadata();
  }, []);

  const fetchStaff = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const params = {
      q: debouncedSearch,
      role: filters.role,
      department: filters.department,
      shift: filters.shift,
      status: filters.status,
      page,
      limit: 10
    };

    const response = await staffApi.getStaff(params);

    if (response.success) {
      setStaffList(response.data || []);
      if (response.meta) {
        setMeta(response.meta);
      }
    } else {
      setError(response.error || 'Failed to fetch staff members.');
    }
    setIsLoading(false);
  }, [debouncedSearch, filters, page]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const refreshStats = async () => {
    const res = await staffApi.getStats();
    if (res.success && res.data) {
      setStats(res.data);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDebouncedSearch('');
    setFilters({ role: '', department: '', shift: '', status: '' });
    setPage(1);
  };

  const showBanner = (type, text) => {
    setBannerMessage({ type, text });
    setTimeout(() => {
      setBannerMessage(null);
    }, 4000);
  };

  const handleOpenCreate = () => {
    setEditingStaff(null);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleViewDetails = async (staffMember) => {
    setSelectedStaffDetails(staffMember);
    const res = await staffApi.getStaffById(staffMember.id);
    if (res.success && res.data) {
      setSelectedStaffDetails(res.data);
    }
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    setFormError(null);

    let res;
    if (editingStaff) {
      res = await staffApi.updateStaff(editingStaff.id, formData);
    } else {
      res = await staffApi.createStaff(formData);
    }

    setFormLoading(false);

    if (res.success && res.data) {
      setIsFormOpen(false);
      const action = editingStaff ? 'updated' : 'created';
      showBanner('success', `Staff member ${res.data.fullName} successfully ${action}!`);
      
      fetchStaff();
      refreshStats();

      setSelectedStaffDetails(res.data);
    } else {
      setFormError(res.error || `Failed to ${editingStaff ? 'update' : 'create'} staff member.`);
    }
  };

  const handleOpenEmailLookup = () => {
    setIsEmailLookupOpen(true);
  };

  const handleSearchEmail = async (email) => {
    setEmailLookupLoading(true);
    const res = await staffApi.getStaff({ q: email });
    setEmailLookupLoading(false);

    if (res.success && Array.isArray(res.data)) {
      const matched = res.data.find(
        (member) => member.email.toLowerCase() === email.toLowerCase()
      );

      if (matched) {
        setIsEmailLookupOpen(false);
        const detailsRes = await staffApi.getStaffById(matched.id);
        const targetStaff = detailsRes.success ? detailsRes.data : matched;
        handleOpenEdit(targetStaff);
      } else {
        showBanner('danger', `No staff member found matching email: ${email}`);
      }
    } else {
      showBanner('danger', res.error || 'Failed to search staff by email.');
    }
  };

  const handleOpenDelete = (staffMember) => {
    setDeletingStaff(staffMember);
  };

  const handleConfirmDelete = async () => {
    if (!deletingStaff) return;
    setDeleteLoading(true);

    const res = await staffApi.deleteStaff(deletingStaff.id);
    setDeleteLoading(false);

    if (res.success) {
      const name = deletingStaff.fullName;
      setDeletingStaff(null);
      showBanner('success', `Staff member ${name} deleted successfully.`);
      fetchStaff();
      refreshStats();
    } else {
      showBanner('danger', res.error || 'Failed to delete staff member.');
    }
  };

  const hasActiveFilters = 
    Boolean(debouncedSearch) || 
    Boolean(filters.role) || 
    Boolean(filters.department) || 
    Boolean(filters.shift) || 
    Boolean(filters.status);

  return (
    <div className="app-container">
      <Header 
        onAddClick={handleOpenCreate} 
        onUpdateByEmailClick={handleOpenEmailLookup} 
      />

      <main className="main-content">
        {bannerMessage && (
          <div className={`alert alert-${bannerMessage.type}`}>
            <span>{bannerMessage.text}</span>
            <button className="btn-icon" onClick={() => setBannerMessage(null)}>
              &times;
            </button>
          </div>
        )}

        <Stats stats={stats} />

        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          onClearFilters={handleClearFilters}
        />

        <div className="card">
          {isLoading ? (
            <LoadingState message="Loading staff members..." />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchStaff} />
          ) : staffList.length === 0 ? (
            <EmptyState
              message={
                hasActiveFilters
                  ? 'No staff members match your search or filters.'
                  : 'No staff members found.'
              }
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <>
              <StaffTable
                staffList={staffList}
                onView={handleViewDetails}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
              <Pagination
                meta={meta}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </>
          )}
        </div>
      </main>

      <StaffFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStaff}
        roles={filterOptions.roles}
        shifts={filterOptions.shifts}
        statuses={filterOptions.statuses}
        isLoading={formLoading}
        errorBanner={formError}
      />

      <UpdateByEmailModal
        isOpen={isEmailLookupOpen}
        onClose={() => setIsEmailLookupOpen(false)}
        onSearchEmail={handleSearchEmail}
        isLoading={emailLookupLoading}
      />

      <StaffDetailsModal
        isOpen={Boolean(selectedStaffDetails)}
        onClose={() => setSelectedStaffDetails(null)}
        staff={selectedStaffDetails}
        onEdit={handleOpenEdit}
      />

      <DeleteModal
        isOpen={Boolean(deletingStaff)}
        onClose={() => setDeletingStaff(null)}
        onConfirm={handleConfirmDelete}
        staffName={deletingStaff?.fullName}
        isLoading={deleteLoading}
      />
    </div>
  );
}
