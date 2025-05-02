import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create context
export const AuthContext = createContext();

// AuthProvider component to provide auth context to the app
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Check for the token in cookies on initial load
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = (token) => {
    Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
    setAuthToken(token);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
