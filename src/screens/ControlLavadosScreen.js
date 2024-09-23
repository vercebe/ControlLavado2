import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Provider as PaperProvider,
  Button,
  TextInput,
  IconButton,
  Headline,
  MD3DarkTheme as darkTheme,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/ApiService";
import { globalStyles } from "../utils/globalStyles";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const { login, logout } = useContext(AuthContext);
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
        const { token, username: user, role } = response;
        await login(token, user, role);
        setUserConfirmed(true);
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
    setUserConfirmed(false);
  };

  const handleConfirmContinue = () => {
    setUserConfirmed(true);
  };

  if (checkingToken) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const dismissKeyboard = () => {
    // Cierra el teclado si está abierto
    Keyboard.dismiss();
  };

  if (currentUser && !userConfirmed) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={{ flex: 1 }}>
            <PaperProvider theme={darkTheme}>
              <View style={globalStyles.container}>
                <View style={globalStyles.content}>
                  <Headline style={globalStyles.titlealt}>
                    Sesión ya iniciada
                  </Headline>

                  <Text style={globalStyles.date}>{formattedDate}</Text>
                  <Text style={globalStyles.time}>{formattedTime}</Text>

                  <Text style={globalStyles.smallText}>
                    El usuario actual es: {currentUser}
                  </Text>

                  <View style={globalStyles.homeButtonWrapper}>
                    <Button
                      mode="contained"
                      onPress={handleConfirmContinue}
                      style={globalStyles.homeButton}
                      labelStyle={globalStyles.homeButtonText}
                    >
                      Continuar como {currentUser}
                    </Button>

                    <Button
                      mode="contained"
                      onPress={handleLogout}
                      style={globalStyles.homeButton}
                      labelStyle={globalStyles.homeButtonText}
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{ flex: 1 }}>
          <PaperProvider theme={darkTheme}>
            <View style={globalStyles.container}>
              <View style={globalStyles.content}>
                <Headline style={globalStyles.titlealt}>
                  Control Autolavado
                </Headline>

                <Text style={globalStyles.date}>{formattedDate}</Text>
                <Text style={globalStyles.time}>{formattedTime}</Text>

                <View style={globalStyles.homeInputContainer}>
                  <TextInput
                    mode="outlined"
                    label="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    style={globalStyles.homeInput}
                    theme={{
                      colors: {
                        placeholder: "#ff0000",
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
                    style={globalStyles.homeClearButton}
                  />
                </View>

                <View style={globalStyles.homeInputContainer}>
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
                    style={globalStyles.homeInput}
                    theme={{
                      colors: {
                        placeholder: "#ff0000",
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
                    onPress={() => setPassword("")}
                    style={globalStyles.homeClearButton}
                  />
                </View>

                <View style={globalStyles.homeButtonWrapper}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <Button
                      mode="contained"
                      onPress={handleLogin}
                      style={globalStyles.homeButton}
                      labelStyle={globalStyles.homeButtonText}
                    >
                      Autenticar
                    </Button>
                  )}
                </View>

                <View style={globalStyles.homeRegisterContainer}>
                  <Text style={globalStyles.homeSmallText}>
                    ¿No tienes una cuenta?
                  </Text>
                  <Text
                    style={globalStyles.homeRegisterText}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Regístrate aquí
                  </Text>
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
