"use client";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // load auth info from either localstorage or session storage.
  useEffect(() => {
    try {
      const localData = localStorage.getItem("authInfo");
      const sessionData = sessionStorage.getItem("authInfo");

      if (localData) {
        setAuthInfo(JSON.parse(localData));
      } else if (sessionData) {
        setAuthInfo(JSON.parse(sessionData));
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      localStorage.removeItem("authInfo");
      sessionStorage.removeItem("authInfo");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = (silent = false) => {
    setAuthInfo(null);

    if (!silent) {
      toast.success("Logged out");
    }

    const localData = localStorage.getItem("authInfo");
    const sessionData = sessionStorage.getItem("authInfo");

    if (localData) {
      localStorage.removeItem("authInfo");
    } else if (sessionData) {
      sessionStorage.removeItem("authInfo");
    }
  };

  const authValue = {
    authInfo,
    setAuthInfo,
    handleLogout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
