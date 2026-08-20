import React from 'react';

export default function Pagination({ meta, onPageChange }) {
  if (!meta || meta.total === 0) return null;

  const { page, limit, total, totalPages } = meta;

  const startCount = (page - 1) * limit + 1;
  const endCount = Math.min(page * limit, total);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <strong>{startCount}–{endCount}</strong> of <strong>{total}</strong> staff members
      </div>

      <div className="pagination-controls">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>

        <span className="page-number">
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
