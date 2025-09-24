"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Filter, SortAsc, RefreshCw, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import MotelCaravanCard from "../cards/MotelCaravanCard";
import Pagination from "../Pagination/Pagination";

export default function SearchResults({
  data,
  pagination,
  searchParams,
  onRefresh,
  isRefreshing,
}) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.sort || "price_asc");
  const [filterBy, setFilterBy] = useState(searchParams.filter || "all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Match your API pagination

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    const date = new Date(
      2000 + parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
    );
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate average rating for an item
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  // Calculate discounted price
  const getDiscountedPrice = (item) => {
    if (!item.discount || item.discount === 0) return item.price;

    if (item.discount_type === "percentage") {
      return item.price - (item.price * item.discount) / 100;
    } else {
      // Assuming flat discount
      return item.price - item.discount;
    }
  };

  // Frontend filtering and sorting logic
  const filteredAndSortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    let filteredItems = [...data];

    // Apply filters
    switch (filterBy) {
      case "available":
        filteredItems = filteredItems.filter((item) => !item.is_booked);
        break;
      case "discount":
        filteredItems = filteredItems.filter(
          (item) => item.discount && item.discount > 0,
        );
        break;
      case "high_rating":
        filteredItems = filteredItems.filter(
          (item) => getAverageRating(item.reviews) >= 4,
        );
        break;
      case "all":
      default:
        // No filtering
        break;
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return getDiscountedPrice(a) - getDiscountedPrice(b);
        case "price_desc":
          return getDiscountedPrice(b) - getDiscountedPrice(a);
        case "rating_desc":
          return getAverageRating(b.reviews) - getAverageRating(a.reviews);
        case "name_asc":
          return a.title.localeCompare(b.title);
        case "name_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filteredItems;
  }, [data, filterBy, sortBy]);

  // Frontend pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage]);

  // Create frontend pagination object
  const frontendPagination = useMemo(() => {
    const totalItems = filteredAndSortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      current_page: currentPage,
      last_page: totalPages,
      total: totalItems,
      per_page: itemsPerPage,
      from: totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0,
      to: Math.min(currentPage * itemsPerPage, totalItems),
    };
  }, [filteredAndSortedData.length, currentPage]);

  // Update URL params for sorting/filtering (optional - for URL state persistence)
  const updateSearchParams = (updates) => {
    const params = new URLSearchParams(urlSearchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    if ("sort" in updates || "filter" in updates) {
      params.delete("page");
      setCurrentPage(1);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page
    updateSearchParams({ sort: newSort });
  };

  const handleFilterChange = (newFilter) => {
    setFilterBy(newFilter);
    setCurrentPage(1); // Reset to first page
    updateSearchParams({ filter: newFilter });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset page when data changes (e.g., after refresh)
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating_desc", label: "Rating: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "available", label: "Available Only" },
    { value: "discount", label: "On Sale" },
    { value: "high_rating", label: "4+ Stars" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Search</span>
            </button>

            {/* Add refresh button for real-time updates */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50"
              title="Refresh to get latest availability"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="text-sm font-medium">
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </span>
            </button>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {searchParams.type === "room"
                  ? "Motels & Rooms"
                  : "Caravan Parks"}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span>
                  {searchParams.guests} guest
                  {parseInt(searchParams.guests) !== 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>
                  {formatDateDisplay(searchParams.checkin)} -{" "}
                  {formatDateDisplay(searchParams.checkout)}
                </span>
                <span>•</span>
                <span>
                  {frontendPagination.total} result
                  {frontendPagination.total !== 1 ? "s" : ""} found
                  {filterBy !== "all" && (
                    <span className="text-button ml-1">
                      (filtered from {data?.length || 0})
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Enhanced Filter and Sort Controls */}
            <div className="flex items-center gap-3">
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 pr-8 transition-colors duration-200 hover:bg-gray-50"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Filter className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 pr-8 transition-colors duration-200 hover:bg-gray-50"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <SortAsc className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>
          </div>

          {/* Active Filters Indicator */}
          {filterBy !== "all" && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filter:</span>
              <span className="bg-button/10 text-button rounded-full px-3 py-1 text-sm font-medium">
                {filterOptions.find((opt) => opt.value === filterBy)?.label}
                <button
                  onClick={() => handleFilterChange("all")}
                  className="hover:text-primary text-button ml-2 cursor-pointer"
                  title="Remove filter"
                >
                  <X size={12} />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Results */}
        {paginatedData && paginatedData.length > 0 ? (
          <>
            {/* Show refreshing indicator */}
            {isRefreshing && (
              <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
                <div className="flex items-center gap-2 text-blue-700">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Updating availability...</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((item) => (
                <MotelCaravanCard
                  key={item.id}
                  data={item}
                  isCaravan={searchParams.accommodationType === "caravans"}
                />
              ))}
            </div>

            {/* Pagination */}
            {frontendPagination.last_page > 1 && (
              <Pagination
                pagination={frontendPagination}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : filteredAndSortedData.length === 0 && data && data.length > 0 ? (
          // Show this when filters return no results but original data exists
          <NoResultsFromFilter
            filterBy={filterBy}
            onClearFilter={() => handleFilterChange("all")}
            originalCount={data.length}
          />
        ) : (
          <NoResults
            type={searchParams.type}
            onModifySearch={() => router.back()}
            onNewSearch={() => router.push("/")}
            onRefresh={onRefresh}
          />
        )}
      </div>
    </div>
  );
}

// No Results from Filter Component
function NoResultsFromFilter({ filterBy, onClearFilter, originalCount }) {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "available", label: "Available Only" },
    { value: "discount", label: "On Sale" },
    { value: "high_rating", label: "4+ Stars" },
  ];

  const currentFilterLabel =
    filterOptions.find((opt) => opt.value === filterBy)?.label || filterBy;

  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
        <Filter className="h-12 w-12 text-orange-500" />
      </div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        No Results Match Your Filter
      </h2>
      <p className="mx-auto mb-8 max-w-md text-gray-600">
        No items match the "{currentFilterLabel}" filter. We found{" "}
        {originalCount} total results - try clearing the filter or choosing a
        different one.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={onClearFilter}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}

// No Results Component (when no data at all)
function NoResults({ type, onModifySearch, onNewSearch, onRefresh }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        No Results Found
      </h2>
      <p className="mx-auto mb-8 max-w-md text-gray-600">
        No {type === "room" ? "rooms or motels" : "caravan spots"} available for
        your selected dates and guest count. Try adjusting your search criteria
        or check for updated availability.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={onRefresh}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Check Latest Availability
        </button>
        <button
          onClick={onModifySearch}
          className="bg-primary hover:bg-primary/90 rounded-xl px-6 py-3 font-semibold text-white transition-colors duration-200"
        >
          Modify Search
        </button>
        <button
          onClick={onNewSearch}
          className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
        >
          Start New Search
        </button>
      </div>
    </div>
  );
}
