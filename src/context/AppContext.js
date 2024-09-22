import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppContextProvider = ({ children }) => {
  // Estados relacionados con la funcionalidad de lavado de autos
  const [placa, setPlaca] = useState(""); // Estado para la placa del auto
  const [modelo, setModelo] = useState(""); // Estado para el modelo del auto
  const [otroPaquete, setOtroPaquete] = useState(""); // Estado para otros paquetes opcionales
  const [selectedPackage, setSelectedPackage] = useState(null); // Estado para el paquete seleccionado
  const [comenzado, setComenzado] = useState(false); // Estado para saber si el proceso de lavado ha comenzado
  const [modelosGuardados, setModelosGuardados] = useState([]); // Para guardar modelos sugeridos

  // Función para cargar modelos guardados desde AsyncStorage
  useEffect(() => {
    const cargarModelos = async () => {
      try {
        const modelos = await AsyncStorage.getItem("modelosGuardados");
        if (modelos) {
          setModelosGuardados(JSON.parse(modelos));
        }
      } catch (error) {
        console.log("Error al cargar modelos desde AsyncStorage", error);
      }
    };
    cargarModelos();
  }, []);

  // Función para guardar un modelo en AsyncStorage
  const guardarModeloEnAsyncStorage = async (nuevoModelo) => {
    try {
      let modelosActualizados = [...modelosGuardados];
      const modeloExistente = modelosActualizados.find(
        (item) => item.modelo === nuevoModelo.modelo
      );

      if (!modeloExistente) {
        modelosActualizados.push(nuevoModelo);
        setModelosGuardados(modelosActualizados); // Actualizar el estado de los modelos guardados

        // Guardar en AsyncStorage
        await AsyncStorage.setItem(
          "modelosGuardados",
          JSON.stringify(modelosActualizados)
        );
      }
    } catch (error) {
      console.log("Error al guardar el modelo en AsyncStorage:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
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
        modelosGuardados,
        guardarModeloEnAsyncStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
