import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // You can implement your authentication logic here

  // useEffect(() => {
  //   const isAuthenticated = false;
  //   setIsLoggedIn(isAuthenticated);
  // }, []);

  // Add setter methods
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
