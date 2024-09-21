import React, { useState } from "react";
import {
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  Button,
  TextInput,
  Headline,
  IconButton,
  Provider as PaperProvider,
  MD3DarkTheme as darkTheme,
  Text,
} from "react-native-paper";
import { globalStyles } from "../utils/globalStyles";
import { registerUser } from "../services/ApiService"; // Importa el servicio

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son requeridos.");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      Alert.alert(
        "Error",
        "La clave debe tener al menos 6 caracteres, una letra y un número."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser(name, username, password); // Pasar el nombre al servicio de registro
      setLoading(false);
      if (response.status === "success") {
        Alert.alert("Éxito", response.message);
        navigation.goBack();
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error en el registro:", error); // Log para ver el error en Expo
      Alert.alert("Error", "Error al registrar el usuario");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <PaperProvider theme={darkTheme}>
            <View style={globalStyles.container}>
              <Headline style={globalStyles.title}>
                Registrar nuevo lavador
              </Headline>

              {/* Input de Nombre Lavador con botón de limpiar */}
              <View style={globalStyles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Nombre Lavador"
                  value={name}
                  onChangeText={setName}
                  style={globalStyles.input}
                  theme={{
                    colors: {
                      placeholder: "#cccccc",
                      primary: "#ffffff",
                      background: "#333333",
                      text: "#ffffff",
                    },
                  }}
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setName("")}
                  style={globalStyles.clearButton}
                />
              </View>

              {/* Input de Nombre de Usuario con botón de limpiar */}
              <View style={globalStyles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Nombre de Usuario"
                  value={username}
                  onChangeText={setUsername}
                  style={globalStyles.input}
                  theme={{
                    colors: {
                      placeholder: "#cccccc",
                      primary: "#ffffff",
                      background: "#333333",
                      text: "#ffffff",
                    },
                  }}
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setUsername("")}
                  style={globalStyles.clearButton}
                />
              </View>

              {/* Input de Clave con icono de mostrar/ocultar */}
              <View style={globalStyles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Clave"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye" : "eye-off"}
                      onPress={() => setShowPassword(!showPassword)}
                      color="#ffffff"
                    />
                  }
                  style={globalStyles.input}
                  theme={{
                    colors: {
                      placeholder: "#cccccc",
                      primary: "#ffffff",
                      background: "#333333",
                      text: "#ffffff",
                    },
                  }}
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setPassword("")}
                  style={globalStyles.clearButton}
                />
              </View>

              {/* Input de Confirmar Clave con icono de mostrar/ocultar */}
              <View style={globalStyles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Confirmar Clave"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? "eye" : "eye-off"}
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      color="#ffffff"
                    />
                  }
                  style={globalStyles.input}
                  theme={{
                    colors: {
                      placeholder: "#cccccc",
                      primary: "#ffffff",
                      background: "#333333",
                      text: "#ffffff",
                    },
                  }}
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setConfirmPassword("")}
                  style={globalStyles.clearButton}
                />
              </View>

              {/* Botón de registrar */}
              <View style={globalStyles.buttonWrapper}>
                {loading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Button
                    mode="contained"
                    onPress={handleRegister}
                    style={globalStyles.button}
                    labelStyle={globalStyles.buttonText}
                  >
                    Registrar
                  </Button>
                )}
              </View>

              {/* Botón de regresar */}
              <View style={globalStyles.backButtonContainer}>
                <IconButton
                  icon="arrow-left"
                  size={30}
                  color="#ffffff"
                  onPress={() => navigation.goBack()}
                  style={globalStyles.backButton}
                />
                <Text style={globalStyles.backButtonText}>Regresar</Text>
              </View>
            </View>
          </PaperProvider>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
