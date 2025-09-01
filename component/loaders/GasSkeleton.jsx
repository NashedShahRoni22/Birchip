import { Fuel } from "lucide-react";

const SkeletonCard = () => (
  <div className="group border-line/20 relative overflow-hidden rounded-2xl border shadow backdrop-blur-xl">
    <div className="h-1 animate-pulse bg-gray-300"></div>
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-300 p-3"></div>
        <div>
          <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-300"></div>
          <div className="h-3 w-16 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
      <div className="mb-3">
        <div className="mb-1 h-8 w-20 animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
    </div>
  </div>
);

const SkeletonTable = () => (
  <div className="border-line/20 overflow-hidden rounded-2xl border shadow backdrop-blur-xl">
    <div className="border-line/20 border-b p-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-300 p-2"></div>
        <div>
          <div className="mb-2 h-5 w-40 animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-32 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-line/20 bg-secondary/40 border-b">
            <th className="p-4 text-left">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
            </th>
            <th className="hidden p-4 text-left sm:table-cell">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
            </th>
            <th className="hidden p-4 text-left md:table-cell">
              <div className="h-4 w-18 animate-pulse rounded bg-gray-300"></div>
            </th>
            <th className="p-4 text-left">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
            </th>
            <th className="p-4 text-left">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((index) => (
            <tr
              key={index}
              className={`border-line/10 border-b ${index % 2 === 0 ? "bg-secondary/20" : ""}`}
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300 p-2"></div>
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
                </div>
              </td>
              <td className="hidden p-4 sm:table-cell">
                <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
              </td>
              <td className="hidden p-4 md:table-cell">
                <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
              </td>
              <td className="p-4">
                <div className="h-5 w-16 animate-pulse rounded bg-gray-300"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GasSkeleton = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="bg-secondary/60 border-line/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <Fuel className="text-primary h-4 w-4" />
            <span className="text-muted text-sm font-medium">Live Updates</span>
          </div>
          <h2 className="text-text mb-4 text-4xl font-bold md:text-5xl">
            Current Fuel
            <span className="text-primary block">Market Prices</span>
          </h2>
          <p className="text-muted mx-auto mb-8 max-w-3xl text-xl">
            Stay informed with real-time fuel prices and make smart decisions
            for your journey ahead.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
            <span className="text-sm font-medium text-gray-600">
              Loading...
            </span>
          </div>
        </div>

        {/* Skeleton Price Cards Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((index) => (
            <SkeletonCard key={index} />
          ))}
        </div>

        {/* Skeleton Table */}
        <SkeletonTable />
      </div>
    </section>
  );
};

export default GasSkeleton;
