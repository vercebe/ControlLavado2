import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto"; // Importamos expo-crypto para la clave secreta

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // Para manejar el estado mientras se verifica la autenticación
  const [currentUser, setCurrentUser] = useState(null); // Usuario actual
  const [isFirstLogin, setIsFirstLogin] = useState(false); // Indicador de primer inicio de sesión

  // Verificar autenticación al iniciar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        const storedUsername = await SecureStore.getItemAsync("username");

        if (token && storedUsername) {
          setIsAuthenticated(true); // Si hay un token válido
          setCurrentUser(storedUsername); // Guarda el usuario actual
          setIsFirstLogin(false); // No es el primer inicio de sesión
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false); // Finaliza la verificación
      }
    };

    checkAuth();
  }, []);

  // Manejar inicio de sesión
  const login = async (token, username) => {
    try {
      await SecureStore.setItemAsync("authToken", token);
      await SecureStore.setItemAsync("username", username);
      setIsAuthenticated(true);
      setCurrentUser(username);
      setIsFirstLogin(true); // Marca como primer inicio de sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Manejar cierre de sesión
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("username");
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsFirstLogin(false); // Resetear al cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        checkingAuth,
        login,
        logout,
        currentUser,
        isFirstLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
