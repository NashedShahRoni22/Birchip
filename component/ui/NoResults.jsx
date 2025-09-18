export function NoResults({ type, onModifySearch, onNewSearch, onRefresh }) {
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
