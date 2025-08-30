import { useMutation } from "@tanstack/react-query";
import useAuth from "../useAuth";
import { newPostApi } from "@/lib/api";

export default function usePostMutation({ endPoint, token = false }) {
  const { authInfo } = useAuth();

  return useMutation({
    mutationFn: (payload) =>
      newPostApi(endPoint, payload, token ? authInfo?.token : undefined),
  });
}
