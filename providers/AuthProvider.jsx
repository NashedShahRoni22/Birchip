"use client";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState(null);

  // load auth info from either localstorage or session storage.
  useEffect(() => {
    const localData = localStorage.getItem("authInfo");
    const sessionData = sessionStorage.getItem("authInfo");

    if (localData) {
      setAuthInfo(JSON.parse(localData));
    } else if (sessionData) {
      setAuthInfo(JSON.parse(sessionData));
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
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
