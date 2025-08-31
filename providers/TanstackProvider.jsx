"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TanstackProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 🔄 Enable refetch on window focus (for real-time availability)
            refetchOnWindowFocus: "always",

            // 📱 Enable refetch when tab becomes visible again
            refetchOnReconnect: "always",

            // ⏰ Stale time (how long data stays fresh)
            staleTime: 30 * 1000, // 30 seconds (good for hotel availability)

            // 🗑️ Cache time (how long to keep in memory when unused)
            gcTime: 5 * 60 * 1000, // 5 minutes

            // 🔁 Retry failed requests
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors (client errors)
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              // Retry up to 2 times for network/server errors
              return failureCount < 2;
            },

            // ⚡ Retry delay
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // 🔄 Retry mutations (like booking attempts)
            retry: 1,
            retryDelay: 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
