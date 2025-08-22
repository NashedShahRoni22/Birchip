import { postApi } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostApi(endpoint, options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postApi(endpoint, data),
    onSuccess: (data) => {
      // Invalidate related queries on success
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({
          queryKey: options.invalidateQueries,
        });
      }

      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
      }
    },
    ...options,
  });
}
