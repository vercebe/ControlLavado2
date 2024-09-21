import React, { useState, useEffect, useContext } from "react";
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
  Provider as PaperProvider,
  Button,
  TextInput,
  IconButton,
  Text,
  Headline,
  MD3DarkTheme as darkTheme,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/ApiService";
import { globalStyles } from "../utils/globalStyles";

const HomeScreen = ({ navigation, setUserConfirmed }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const { login, logout } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const storedUsername = await SecureStore.getItemAsync("username");
        if (storedUsername) {
          setCurrentUser(storedUsername);
        }
      } catch (error) {
        console.log("Error al verificar el usuario actual:", error);
      } finally {
        setCheckingToken(false);
      }
    };
    checkCurrentUser();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  const handleLogin = async () => {
    const cleanedUsername = username.trim();
    const cleanedPassword = password.trim();

    if (!cleanedUsername || !cleanedPassword) {
      Alert.alert("Error", "Por favor, ingrese su usuario y clave.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(cleanedUsername, cleanedPassword);
      setLoading(false);
      if (response.status === "success") {
        login(response.token, cleanedUsername);
        setUserConfirmed(true); // Marcar como confirmado si el login es exitoso
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error en el login:", error);
      Alert.alert("Error", "Error al autenticar");
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setUsername("");
    setPassword("");
  };

  const handleConfirmContinue = () => {
    setUserConfirmed(true); // Confirmar sesión
  };

  // Mientras se verifica el token, mostramos un spinner (ActivityIndicator)
  if (checkingToken) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (currentUser) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <PaperProvider theme={darkTheme}>
            <View style={globalStyles.container}>
              <View style={globalStyles.content}>
                <Headline style={globalStyles.title}>
                  Sesión ya iniciada
                </Headline>

                <Text style={globalStyles.date}>{formattedDate}</Text>
                <Text style={globalStyles.time}>{formattedTime}</Text>

                <Text style={globalStyles.smallText}>
                  El usuario actual es: {currentUser}
                </Text>

                <View style={globalStyles.buttonWrapper}>
                  <Button
                    mode="contained"
                    onPress={handleConfirmContinue}
                    style={globalStyles.button}
                    labelStyle={globalStyles.buttonText}
                  >
                    Continuar como {currentUser}
                  </Button>

                  <Button
                    mode="contained"
                    onPress={handleLogout}
                    style={globalStyles.button}
                    labelStyle={globalStyles.buttonText}
                  >
                    Ingresar con otro usuario
                  </Button>
                </View>
              </View>

              <View style={globalStyles.footer}>
                <Text style={globalStyles.footerText}>Designed by:</Text>
                <Text style={globalStyles.footerTextBold}>
                  CMG TECHNOLOGIES
                </Text>
                <Text style={globalStyles.footerText}>Version 1.0</Text>
              </View>
            </View>
          </PaperProvider>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PaperProvider theme={darkTheme}>
          <View style={globalStyles.container}>
            <View style={globalStyles.content}>
              <Headline style={globalStyles.title}>Control Autolavado</Headline>

              <Text style={globalStyles.date}>{formattedDate}</Text>
              <Text style={globalStyles.time}>{formattedTime}</Text>

              <View style={globalStyles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Usuario"
                  value={username}
                  onChangeText={setUsername}
                  style={globalStyles.input}
                  theme={{
                    colors: { placeholder: "#ff0000", primary: "#ffffff" },
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
                      color="#ffffff"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={globalStyles.input}
                  theme={{
                    colors: { placeholder: "#ff0000", primary: "#ffffff" },
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

              <View style={globalStyles.buttonWrapper}>
                {loading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={globalStyles.button}
                    labelStyle={globalStyles.buttonText}
                  >
                    Autenticar
                  </Button>
                )}
              </View>

              <View style={globalStyles.registerContainer}>
                <Text style={globalStyles.smallText}>
                  ¿No tienes una cuenta?
                </Text>
                <Text
                  style={globalStyles.registerText}
                  onPress={() => navigation.navigate("Register")}
                >
                  Regístrate aquí
                </Text>
              </View>
            </View>

            <View style={globalStyles.footer}>
              <Text style={globalStyles.footerText}>Designed by:</Text>
              <Text style={globalStyles.footerTextBold}>CMG TECHNOLOGIES</Text>
              <Text style={globalStyles.footerText}>Version 1.0</Text>
            </View>
          </View>
        </PaperProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
