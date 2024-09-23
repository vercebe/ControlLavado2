// /src/screens/RegisterScreen.js

import React, { useState, useContext } from "react";
import {
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import {
  Button,
  TextInput,
  IconButton,
  Headline,
  Provider as PaperProvider,
  MD3DarkTheme as darkTheme,
} from "react-native-paper";
import { globalStyles } from "../utils/globalStyles";
import { registerUser } from "../services/ApiService";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser(name, username, password);
      setLoading(false);
      if (response.status === "success") {
        Alert.alert("Éxito", response.message);
        const { token, username: user, role } = response;
        login(token, user, role);
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error en el registro:", error);
      Alert.alert("Error", "Error al registrar el usuario");
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.registerContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.registerContainer}>
          <PaperProvider theme={darkTheme}>
            <View style={globalStyles.registerContainer}>
              <Headline style={globalStyles.registerTitle}>
                Registrar nuevo lavador
              </Headline>

              <View style={globalStyles.registerInputContainer}>
                <TextInput
                  mode="outlined"
                  label="Nombre Lavador"
                  value={name}
                  onChangeText={setName}
                  style={globalStyles.registerInput}
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "transparent",
                      text: "#ffffff",
                    },
                  }}
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setName("")}
                  style={globalStyles.registerClearButton}
                />
              </View>

              <View style={globalStyles.registerInputContainer}>
                <TextInput
                  mode="outlined"
                  label="Nombre de Usuario"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  style={globalStyles.registerInput}
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "transparent",
                      text: "#ffffff",
                    },
                  }}
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setUsername("")}
                  style={globalStyles.registerClearButton}
                />
              </View>

              <View style={globalStyles.registerInputContainer}>
                <TextInput
                  mode="outlined"
                  label="Clave"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={globalStyles.registerInput}
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "transparent",
                      text: "#ffffff",
                    },
                  }}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye" : "eye-off"}
                      color="#ffffff"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setPassword("")}
                  style={globalStyles.registerClearButton}
                />
              </View>

              <View style={globalStyles.registerInputContainer}>
                <TextInput
                  mode="outlined"
                  label="Confirmar Clave"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  style={globalStyles.registerInput}
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "transparent",
                      text: "#ffffff",
                    },
                  }}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? "eye" : "eye-off"}
                      color="#ffffff"
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  }
                />
                <IconButton
                  icon="broom"
                  size={20}
                  color="#999"
                  onPress={() => setConfirmPassword("")}
                  style={globalStyles.registerClearButton}
                />
              </View>

              <View style={globalStyles.registerButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Button
                    mode="contained"
                    onPress={handleRegister}
                    style={globalStyles.registerButton}
                    labelStyle={globalStyles.registerButtonText}
                  >
                    Registrar
                  </Button>
                )}
              </View>

              <View style={globalStyles.registerBackButtonContainer}>
                <IconButton
                  icon="arrow-left"
                  size={30}
                  color="#ffffff"
                  onPress={() => navigation.goBack()}
                  style={globalStyles.registerBackButton}
                />
                <Text style={globalStyles.registerBackButtonText}>
                  Regresar
                </Text>
              </View>
            </View>
          </PaperProvider>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
