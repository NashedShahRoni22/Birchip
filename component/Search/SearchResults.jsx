"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Filter, SortAsc } from "lucide-react";
import { useState } from "react";
import MotelCaravanCard from "../cards/MotelCaravanCard";

export default function SearchResults({ data, pagination, searchParams }) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.sort || "price_asc");
  const [filterBy, setFilterBy] = useState(searchParams.filter || "all");

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

  // Handle sort/filter changes
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
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    updateSearchParams({ sort: newSort });
  };

  const handleFilterChange = (newFilter) => {
    setFilterBy(newFilter);
    updateSearchParams({ filter: newFilter });
  };

  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating_desc", label: "Rating: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
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
                {pagination && (
                  <>
                    <span>•</span>
                    <span>
                      {pagination.total} result
                      {pagination.total !== 1 ? "s" : ""} found
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Filter and Sort Controls */}
            {/* <div className="flex items-center gap-3">
              
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
            </div> */}
          </div>
        </div>

        {/* Results */}
        {data && data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.map((item) => (
                <MotelCaravanCard
                  key={item.id}
                  data={item}
                  isCaravan={searchParams.accommodationType === "caravans"}
                />
              ))}
            </div>

            {/* Pagination */}
            {/* {pagination && pagination.last_page > 1 && (
              <Pagination
                pagination={pagination}
                currentPage={searchParams.currentPage}
                onPageChange={(page) =>
                  updateSearchParams({ page: page.toString() })
                }
              />
            )} */}
          </>
        ) : (
          <NoResults
            type={searchParams.type}
            onModifySearch={() => router.back()}
            onNewSearch={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
}

// No Results Component
function NoResults({ type, onModifySearch, onNewSearch }) {
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
        your selected dates and guest count. Try adjusting your search criteria.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
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
