"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.last_page <= 1) return null;

  const handlePageClick = (page) => {
    if (
      page !== pagination.current_page &&
      page >= 1 &&
      page <= pagination.last_page
    ) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (pagination.current_page > 1) {
      onPageChange(pagination.current_page - 1);
    }
  };

  const handleNext = () => {
    if (pagination.current_page < pagination.last_page) {
      onPageChange(pagination.current_page + 1);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;

    // Always show first page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) {
        pages.push("...");
      }
    }

    // Show pages around current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(lastPage, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    // Always show last page
    if (currentPage < lastPage - 2) {
      if (currentPage < lastPage - 3) {
        pages.push("...");
      }
      pages.push(lastPage);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-6 gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={pagination.current_page === 1}
          className={`flex items-center justify-center sm:min-w-[101px] min-h-10 gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            pagination.current_page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-primary hover:text-white border border-line shadow-sm hover:shadow-md"
          }`}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400 text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 ${
                  page === pagination.current_page
                    ? "bg-primary text-white shadow-md transform scale-105"
                    : "bg-white text-gray-600 hover:bg-button hover:text-white border border-line shadow-sm hover:shadow-md hover:scale-105"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={pagination.current_page === pagination.last_page}
          className={`flex items-center sm:min-w-[101px] justify-center min-h-10 gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            pagination.current_page === pagination.last_page
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-primary hover:text-white border border-line shadow-sm hover:shadow-md"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Page Info */}
      <div className="hidden md:flex items-center ml-4 text-sm text-muted">
        Showing {pagination.from}-{pagination.to} of {pagination.total} results
      </div>
    </div>
  );
}
