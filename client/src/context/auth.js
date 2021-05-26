// base
import React, { createContext, useCallback } from "react";

// api
import { fetchToken } from "../services/auth";

// utils
import { setJWT, clearJWT } from "../utils/jwt";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = useCallback(async (payload) => {
    const { token } = await fetchToken(payload);

    if (token) {
      setJWT(token);
    }
  }, []);

  const logout = useCallback(() => {
    clearJWT();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
