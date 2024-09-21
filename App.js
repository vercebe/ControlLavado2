import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto"; // Importamos expo-crypto
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { View, ActivityIndicator } from "react-native";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initSecretKey = async () => {
      try {
        // Revisa si ya existe una clave secreta en SecureStore
        const secretKey = await SecureStore.getItemAsync("secretKey");
        if (!secretKey) {
          // Genera una clave secreta segura utilizando expo-crypto
          const randomBytes = await Crypto.getRandomBytesAsync(16); // 16 bytes (128 bits)

          // Convierte los bytes en una cadena hexadecimal manualmente
          const newSecretKey = Array.from(randomBytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

          // Almacena la nueva clave secreta en SecureStore
          await SecureStore.setItemAsync("secretKey", newSecretKey);
          console.log("Nueva clave secreta generada y almacenada.");
        } else {
          console.log("Clave secreta ya existe.");
        }
      } catch (error) {
        console.error("Error al inicializar la clave secreta:", error);
      } finally {
        setIsReady(true); // Marca la aplicación como lista
      }
    };

    initSecretKey();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
