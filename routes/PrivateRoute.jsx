"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function PrivateRoute({
  children,
  redirectTo = "/auth",
  loadingComponent = null,
}) {
  const { authInfo, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authInfo?.token) {
      // Get current page path for redirect
      const currentPath = window.location.pathname;
      router.replace(
        `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`,
      );
    }
  }, [authInfo?.token, isLoading, router, redirectTo]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      loadingComponent || (
        <div className="mx-auto flex min-h-[400px] max-w-4xl items-center justify-center px-4 py-8">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      )
    );
  }

  if (!authInfo?.token) {
    return null;
  }

  return children;
}
