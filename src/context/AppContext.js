import React, { createContext, useState } from "react";

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppContextProvider = ({ children }) => {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Estados relacionados con la funcionalidad de lavado de autos
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [otroPaquete, setOtroPaquete] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [comenzado, setComenzado] = useState(false);

  // Funciones para autenticación
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AppContext.Provider
      value={{
        // Autenticación
        isAuthenticated,
        login,
        logout,

        // Funcionalidad de lavado de autos
        placa,
        setPlaca,
        modelo,
        setModelo,
        otroPaquete,
        setOtroPaquete,
        selectedPackage,
        setSelectedPackage,
        comenzado,
        setComenzado,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
