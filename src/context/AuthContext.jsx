import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
      try { setLocation(JSON.parse(savedLocation)); } catch (e) { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('location');
    setUser(null);
    setLocation(null);
  };

  const saveLocation = (loc) => {
    localStorage.setItem('location', JSON.stringify(loc));
    setLocation(loc);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, location, saveLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);