export default function BookingsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-[#E0E0E0] bg-white p-6"
        >
          <div className="animate-pulse">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-[#EDE9DA]"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-[#EDE9DA]"></div>
                  <div className="h-3 w-24 rounded bg-[#EDE9DA]"></div>
                </div>
              </div>
              <div className="h-6 w-20 rounded bg-[#EDE9DA]"></div>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="h-3 w-16 rounded bg-[#EDE9DA]"></div>
                  <div className="h-3 w-20 rounded bg-[#EDE9DA]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
