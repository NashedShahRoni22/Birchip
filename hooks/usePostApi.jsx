import { postApi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function usePostApi(endpoint, options = {}) {
  return useMutation({
    mutationFn: (data) => postApi(endpoint, data),
    ...options,
  });
}
