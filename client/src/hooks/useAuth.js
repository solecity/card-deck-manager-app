// base
import { useContext } from "react";

// context
import { AuthContext } from "../context/auth";

export const useAuth = () => {
  return useContext(AuthContext);
};
