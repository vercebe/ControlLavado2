import React, { createContext, useState } from "react";

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppContextProvider = ({ children }) => {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Estados relacionados con la funcionalidad de lavado de autos
  const [placa, setPlaca] = useState(""); // Estado para la placa del auto
  const [modelo, setModelo] = useState(""); // Estado para el modelo del auto
  const [otroPaquete, setOtroPaquete] = useState(""); // Estado para otros paquetes opcionales
  const [selectedPackage, setSelectedPackage] = useState(null); // Estado para el paquete seleccionado
  const [comenzado, setComenzado] = useState(false); // Estado para saber si el proceso de lavado ha comenzado
  const [modelosGuardados, setModelosGuardados] = useState([]); // Para guardar modelos sugeridos

  // Funciones para autenticación
  const login = () => setIsAuthenticated(true); // Iniciar sesión
  const logout = () => setIsAuthenticated(false); // Cerrar sesión

  // Función para guardar un modelo en AsyncStorage (opcional)
  const guardarModeloEnAsyncStorage = async (nuevoModelo) => {
    try {
      // Verificar si ya existe el modelo guardado en AsyncStorage
      let modelosActualizados = modelosGuardados.includes(nuevoModelo)
        ? modelosGuardados
        : [...modelosGuardados, nuevoModelo];

      setModelosGuardados(modelosActualizados); // Actualizar el estado de los modelos guardados
      // Guardar el nuevo estado en AsyncStorage (si estás usando esto en tu aplicación)
      await AsyncStorage.setItem(
        "modelos",
        JSON.stringify(modelosActualizados)
      );
    } catch (error) {
      console.log("Error al guardar el modelo en AsyncStorage:", error);
    }
  };

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

        // Funcionalidades adicionales
        modelosGuardados,
        guardarModeloEnAsyncStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
