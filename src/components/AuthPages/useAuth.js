import { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const adminLogin = () => setAdminLoggedIn(true)
  const adminLogout = () => setAdminLoggedIn(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAdminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
