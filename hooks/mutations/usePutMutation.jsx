import { useMutation } from "@tanstack/react-query";
import useAuth from "../useAuth";
import { putApi } from "@/lib/api";

export default function usePutMutation({ endPoint, token = false }) {
  const { authInfo } = useAuth();

  return useMutation({
    mutationFn: (payload) =>
      putApi(endPoint, payload, token ? authInfo?.token : undefined),
  });
}
