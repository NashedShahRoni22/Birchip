import { newGetApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

export default function useGetQuery({
  endpoint,
  token = false,
  queryKey,
  enabled,
}) {
  const { authInfo } = useAuth();

  return useQuery({
    queryKey,
    queryFn: () => newGetApi(endpoint, token ? authInfo?.token : undefined),
    enabled,
  });
}
