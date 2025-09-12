// app/search/[type]/page.js
import { notFound } from "next/navigation";
import { newGetApi } from "@/lib/api";
import SearchResults from "@/component/Search/SearchResults";

// Server Component - handles data fetching
export default async function SearchPage({ params, searchParams }) {
  const { type } = params; // 'motels' or 'caravans'
  const { guests, checkin, checkout, page = "1", sort, filter } = searchParams;

  // Validate required parameters
  if (!guests || !checkin || !checkout) {
    notFound();
  }

  // Validate accommodation type
  if (!["motels", "caravans"].includes(type)) {
    notFound();
  }

  // Construct API endpoint with all parameters
  const apiParams = new URLSearchParams({
    guests,
    checkin,
    checkout,
    page,
    ...(sort && { sort }),
    ...(filter && { filter }),
  });

  const endpoint = `/${type}?${apiParams.toString()}`;

  try {
    // Server-side fetch
    const apiResponse = await newGetApi(endpoint);

    if (!apiResponse || !apiResponse.status) {
      throw new Error("Failed to fetch search results");
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
      />
    );
  } catch (error) {
    console.error("Search API Error:", error);

    // Return error state component
    return (
      <SearchError
        error={error.message}
        searchParams={{ guests, checkin, checkout, type }}
      />
    );
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }) {
  const { type } = params;
  const { guests, checkin, checkout } = searchParams;

  const accommodationType =
    type === "motels" ? "Motels & Rooms" : "Caravan Parks";

  return {
    title: `${accommodationType} - ${guests} Guests | Search Results`,
    description: `Find available ${accommodationType.toLowerCase()} for ${guests} guests from ${checkin} to ${checkout}. Book now for the best rates.`,
    robots: "index, follow",
  };
}
