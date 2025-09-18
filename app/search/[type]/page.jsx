"use client";

import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import SearchResults from "@/component/Search/SearchResults";
import useGetQuery from "@/hooks/queries/useGetQuery";
import LoadingSpinner from "@/component/loaders/LoadingSpinner";

export default function SearchPage({ params }) {
  const { type } = React.use(params);
  const searchParams = useSearchParams();

  // Extract search parameters
  const guests = searchParams.get("guests");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort");
  const filter = searchParams.get("filter");

  // Validate required parameters
  if (!guests || !checkin || !checkout) {
    notFound();
  }

  // Validate accommodation type
  if (!["motels", "caravans"].includes(type)) {
    notFound();
  }

  // Construct API endpoint with all parameters
  const endpoint = useMemo(() => {
    const apiParams = new URLSearchParams({
      guests,
      checkin,
      checkout,
      page,
      ...(sort && { sort }),
      ...(filter && { filter }),
    });
    return `/${type}?${apiParams.toString()}`;
  }, [type, guests, checkin, checkout, page, sort, filter]);

  // Create unique query key
  const queryKey = useMemo(
    () =>
      [
        "search-results",
        type,
        guests,
        checkin,
        checkout,
        page,
        sort,
        filter,
      ].filter(Boolean),
    [type, guests, checkin, checkout, page, sort, filter],
  );

  // Fetch data using your reusable hook
  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useGetQuery({
    endpoint,
    queryKey,
    enabled: true, // Always enabled since we've validated required params
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <LoadingSpinner message="Searching for available accommodations..." />
      </div>
    );
  }

  const accommodationType = type === "motels" ? "room" : "caravan";

  return (
    <SearchResults
      data={apiResponse.data}
      pagination={apiResponse.pagination}
      searchParams={{
        guests,
        checkin,
        checkout,
        type: accommodationType,
        accommodationType: type,
        currentPage: parseInt(page),
        sort,
        filter,
      }}
      onRefresh={() => refetch()}
      isRefreshing={isLoading}
    />
  );
}
