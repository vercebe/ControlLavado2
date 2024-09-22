import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null); // Estado para almacenar el nombre de usuario

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const storedUsername = await SecureStore.getItemAsync("username");
      if (token && storedUsername) {
        setIsAuthenticated(true);
        setUsername(storedUsername); // Establecer el username desde el almacenamiento seguro
      } else {
        setIsAuthenticated(false);
        setUsername(null); // Limpiar el username si no hay token
      }
    };
    checkAuth();
  }, []);

  const login = async (token, username) => {
    await SecureStore.setItemAsync("authToken", token);
    await SecureStore.setItemAsync("username", username);
    setIsAuthenticated(true);
    setUsername(username); // Establecer el username después del login
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("username");
    setIsAuthenticated(false);
    setUsername(null); // Limpiar el username después del logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
