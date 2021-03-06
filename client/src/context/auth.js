// base
import React, { createContext, useCallback, useState, useEffect } from "react";

// libraries
import jwt from "jsonwebtoken";

// api
import { fetchToken } from "../services/auth";

// utils
import { getJWT, setJWT, clearJWT } from "../utils/jwt";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [_token, set_token] = useState(() => getJWT());
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState(0);

  const login = useCallback(async (payload) => {
    const { token } = await fetchToken(payload);

    if (token) {
      setJWT(token);
      set_token(token);
    } else {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    clearJWT();
    set_token("");
  }, []);

  useEffect(() => {
    if (_token) {
      const decode = jwt.verify(_token, process.env.REACT_APP_JWT_KEY);

      setUserId(decode.id);
      setUserType(decode.type);
    }
  }, [_token]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        _token,
        userId,
        userType
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
