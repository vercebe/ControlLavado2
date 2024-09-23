// /src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const storedUsername = await SecureStore.getItemAsync("username");
      const storedRole = await SecureStore.getItemAsync("role");
      if (token && storedUsername && storedRole) {
        setIsAuthenticated(true);
        setUsername(storedUsername);
        setRole(storedRole);
      } else {
        setIsAuthenticated(false);
        setUsername(null);
        setRole(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (token, username, role) => {
    await SecureStore.setItemAsync("authToken", token);
    await SecureStore.setItemAsync("username", username);
    await SecureStore.setItemAsync("role", role);
    setIsAuthenticated(true);
    setUsername(username);
    setRole(role);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("username");
    await SecureStore.deleteItemAsync("role");
    setIsAuthenticated(false);
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
