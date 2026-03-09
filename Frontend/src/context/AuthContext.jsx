import { createContext, useCallback, useMemo, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = useCallback((nextToken) => {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!token;
  }, [token]);

  const value = useMemo(() => {
    return {
      token,
      login,
      logout,
      isAuthenticated,
    };
  }, [token, login, logout, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
