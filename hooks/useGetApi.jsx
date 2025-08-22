import { getApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetApi(endpoint, options = {}) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => getApi(endpoint),
    ...options,
  });
}
