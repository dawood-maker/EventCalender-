import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  console.log(" AuthProvider initialized");

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    console.log("Checking localStorage user:", storedUser);

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    console.log(" LOGIN FUNCTION CALLED");
    console.log(" User Data:", userData);
    console.log(" Token:", token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setUser(userData);

    console.log(" User stored in context & localStorage");
  };

  const logout = () => {
    console.log(" LOGOUT FUNCTION CALLED");

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    console.log(" User removed from storage & state cleared");
  };

  console.log(" Current user state:", user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
