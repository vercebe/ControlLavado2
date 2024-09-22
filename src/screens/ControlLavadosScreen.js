import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomNavigation,
  Appbar,
  Provider as PaperProvider,
  TextInput,
  Button,
  MD3DarkTheme as darkTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../utils/globalStyles";
import { AuthContext } from "../context/AuthContext"; // Importar AuthContext

// Obtener dimensiones de la pantalla
const { width: screenWidth } = Dimensions.get("window");

// Componente para el menú personalizado (menú hamburguesa)
const CustomMenu = ({ visible, closeMenu, handleCloseApp }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={closeMenu}
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={globalStyles.menuOverlay}>
          <View style={globalStyles.menu}>
            <TouchableOpacity
              onPress={handleCloseApp}
              style={globalStyles.menuItem}
            >
              <Text style={globalStyles.menuText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Componente para la ruta "Agregar lavado"
const MasRoute = ({ showForm, setShowForm }) => {
  const { username } = useContext(AuthContext); // Obtener username del contexto
  const [lavador, setLavador] = useState(""); // Inicializar el estado de lavador
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [otroPaquete, setOtroPaquete] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [comenzado, setComenzado] = useState(false);
  const [modelosGuardados, setModelosGuardados] = useState([]);
  const [selectedValue, setSelectedValue] = useState("100$"); // Selector inicial
  const [formDisabled, setFormDisabled] = useState(false);

  // Cargar el estado guardado en AsyncStorage al montar el componente
  useEffect(() => {
    if (username) {
      setLavador(username); // Establecer el valor inicial de lavador con username
    }
    const cargarEstado = async () => {
      try {
        const estadoGuardado = await AsyncStorage.getItem("estadoInputs");
        if (estadoGuardado) {
          const {
            lavador,
            placa,
            modelo,
            otroPaquete,
            selectedPackage,
            selectedValue,
            comenzado,
          } = JSON.parse(estadoGuardado);
          setLavador(lavador || username);
          setPlaca(placa);
          setModelo(modelo);
          setOtroPaquete(otroPaquete);
          setSelectedPackage(selectedPackage);
          setSelectedValue(selectedValue);
          setComenzado(comenzado);
        }
      } catch (error) {
        console.log("Error al cargar el estado guardado:", error);
      }
    };
    cargarEstado();
  }, [username]);

  // Guardar el estado en AsyncStorage al desmontar o cambiar de pantalla
  useEffect(() => {
    const guardarEstado = async () => {
      try {
        const estadoActual = {
          lavador,
          placa,
          modelo,
          otroPaquete,
          selectedPackage,
          selectedValue,
          comenzado,
        };
        await AsyncStorage.setItem(
          "estadoInputs",
          JSON.stringify(estadoActual)
        );
      } catch (error) {
        console.log("Error al guardar el estado:", error);
      }
    };

    // Guardar estado cuando se desmonta el componente
    return () => {
      guardarEstado();
    };
  }, [
    lavador,
    placa,
    modelo,
    otroPaquete,
    selectedPackage,
    selectedValue,
    comenzado,
  ]);

  const handleComenzar = () => {
    if (!placa || !modelo || !selectedPackage || !lavador) {
      Alert.alert(
        "Error",
        "Por favor, complete los campos de Lavador, Placa, Modelo y seleccione un paquete."
      );
      return;
    }

    guardarModeloEnAsyncStorage(modelo);
    setFormDisabled(true);
    setComenzado(true);
  };

  const handleModificar = () => {
    setFormDisabled(false);
    setComenzado(false);
  };

  const handleTerminar = () => {
    setFormDisabled(false);
    setComenzado(false);
    setShowForm(false);
  };

  const guardarModeloEnAsyncStorage = async (nuevoModelo) => {
    try {
      const modelos = await AsyncStorage.getItem("modelos");
      let modelosActualizados = modelos ? JSON.parse(modelos) : [];

      if (!modelosActualizados.includes(nuevoModelo)) {
        modelosActualizados.push(nuevoModelo);
        await AsyncStorage.setItem(
          "modelos",
          JSON.stringify(modelosActualizados)
        );
        setModelosGuardados(modelosActualizados);
      } else {
        console.log("El modelo ya existe en la lista:", nuevoModelo);
      }
    } catch (error) {
      console.log("Error al guardar el modelo en AsyncStorage", error);
    }
  };

  const handleLimpiar = () => {
    setPlaca("");
    setModelo("");
    setOtroPaquete("");
  };

  // Función que cambia el valor del selector dependiendo del paquete seleccionado
  const getPickerValues = () => {
    if (selectedPackage === 1) {
      return ["90$", "100$", "110$", "130$"];
    } else if (selectedPackage === 2) {
      return ["100$", "110$", "120$", "150$"];
    }
    return [];
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={globalStyles.plusContainer}>
            {!showForm ? (
              <Icon
                name="plus"
                size={100}
                color="white"
                onPress={() => setShowForm(true)}
                style={globalStyles.plusIcon}
              />
            ) : (
              <View style={globalStyles.formContainer}>
                {/* TextInput para Lavador */}
                <Text style={globalStyles.packageTitle}>Lavador</Text>
                <TextInput
                  mode="outlined"
                  label="Lavador"
                  value={lavador}
                  onChangeText={setLavador}
                  style={globalStyles.input1}
                  disabled={formDisabled} // Se desactiva si ya se ha iniciado el proceso
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "#000000", // Fondo negro
                    },
                  }}
                />

                {/* Input de placa */}
                <TextInput
                  mode="outlined"
                  label="Placa"
                  placeholder="Ingrese la placa del vehículo"
                  value={placa}
                  onChangeText={setPlaca}
                  style={globalStyles.input}
                  disabled={formDisabled}
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "#333333",
                    },
                  }}
                />

                {/* Input para el modelo */}
                <TextInput
                  mode="outlined"
                  label="Modelo"
                  placeholder="Ingrese el modelo del vehículo"
                  value={modelo}
                  onChangeText={setModelo}
                  style={globalStyles.inputmodelo}
                  disabled={formDisabled}
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "#333333",
                    },
                  }}
                />

                {/* Selector de paquete */}
                <Text style={globalStyles.packageTitle1}>
                  Seleccionar Paquete
                </Text>
                <View style={globalStyles.packageContainer}>
                  <Button
                    mode={selectedPackage === 1 ? "contained" : "outlined"}
                    onPress={() => setSelectedPackage(1)}
                    disabled={formDisabled}
                    style={globalStyles.packageButton}
                    labelStyle={globalStyles.packageButtonText}
                  >
                    Paquete 1
                  </Button>
                  <Button
                    mode={selectedPackage === 2 ? "contained" : "outlined"}
                    onPress={() => setSelectedPackage(2)}
                    disabled={formDisabled}
                    style={globalStyles.packageButton}
                    labelStyle={globalStyles.packageButtonText}
                  >
                    Paquete 2
                  </Button>
                </View>

                {/* Selector de valores (Picker) */}
                {selectedPackage && (
                  <Picker
                    selectedValue={selectedValue}
                    style={globalStyles.picker}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    enabled={!formDisabled}
                  >
                    {getPickerValues().map((value) => (
                      <Picker.Item key={value} label={value} value={value} />
                    ))}
                  </Picker>
                )}

                {/* Input para otros detalles */}
                <TextInput
                  mode="outlined"
                  label="Otro"
                  placeholder="Ingrese detalles adicionales (opcional)"
                  value={otroPaquete}
                  onChangeText={setOtroPaquete}
                  style={globalStyles.input}
                  disabled={formDisabled}
                  theme={{
                    colors: {
                      placeholder: "#888888",
                      primary: "#ffffff",
                      background: "#333333",
                    },
                  }}
                />

                {/* Botones de acción */}
                <View style={globalStyles.buttonRow}>
                  <View style={globalStyles.leftButtonColumn}>
                    <Button
                      mode="contained"
                      style={globalStyles.formButton}
                      icon={() => (
                        <Icon
                          name="play-circle"
                          size={20}
                          color={comenzado ? "green" : "white"}
                        />
                      )}
                      labelStyle={globalStyles.buttonText}
                      onPress={handleComenzar}
                      disabled={comenzado}
                    >
                      {comenzado ? "Iniciado" : "Comenzar"}
                    </Button>

                    <Button
                      mode="contained"
                      style={globalStyles.formButton}
                      icon={() => (
                        <Icon
                          name="check-circle"
                          size={20}
                          color={comenzado ? "red" : "white"}
                        />
                      )}
                      labelStyle={globalStyles.buttonText}
                      onPress={handleTerminar}
                    >
                      Terminar
                    </Button>
                  </View>

                  <View style={globalStyles.rightButtonColumn}>
                    <Button
                      mode="contained"
                      style={globalStyles.limpiarButton}
                      icon={() => <Icon name="broom" size={20} color="white" />}
                      labelStyle={globalStyles.buttonText}
                      onPress={handleLimpiar}
                    >
                      Limpiar
                    </Button>

                    <Button
                      mode="contained"
                      style={[globalStyles.modificarButton]}
                      icon={() => (
                        <Icon
                          name="pencil"
                          size={20}
                          color={comenzado ? "yellow" : "white"}
                        />
                      )}
                      labelStyle={globalStyles.buttonText}
                      onPress={handleModificar}
                    >
                      Modificar
                    </Button>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Otras rutas para el menú inferior
const PendientesRoute = () => (
  <View style={globalStyles.centered}>
    <Icon name="clipboard-list" size={100} color="white" />
    <Text style={globalStyles.text}>Pendientes</Text>
  </View>
);

const MiDiaRoute = () => (
  <View style={globalStyles.centered}>
    <Icon name="calendar-today" size={100} color="white" />
    <Text style={globalStyles.text}>Mi Día</Text>
  </View>
);

const MiSemanaRoute = () => (
  <View style={globalStyles.centered}>
    <Icon name="calendar-week" size={100} color="white" />
    <Text style={globalStyles.text}>Mi Semana</Text>
  </View>
);

// Pantalla principal de Control de Lavado
const ControlLavadoScreen = () => {
  const { logout, username } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleCloseApp = () => {
    Alert.alert("Cerrando aplicación...");
    closeMenu();
  };

  const routes = [
    { key: "mas", title: "Agregar", focusedIcon: "plus" },
    { key: "pendientes", title: "Pendientes", focusedIcon: "clipboard-list" },
    { key: "midia", title: "Mi Día", focusedIcon: "calendar-today" },
    { key: "misemana", title: "Mi Semana", focusedIcon: "calendar-week" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    mas: () => <MasRoute showForm={showForm} setShowForm={setShowForm} />,
    pendientes: PendientesRoute,
    midia: MiDiaRoute,
    misemana: MiSemanaRoute,
  });

  return (
    <PaperProvider theme={darkTheme}>
      <Appbar.Header style={globalStyles.appbar}>
        <Appbar.Content
          title={`Control Lavado - ${username}`}
          titleStyle={[globalStyles.title, { textAlign: "left", fontSize: 16 }]}
        />
        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
      </Appbar.Header>

      <CustomMenu
        visible={menuVisible}
        closeMenu={closeMenu}
        handleCloseApp={handleCloseApp}
      />

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={globalStyles.bottomNav}
        renderLabel={({ route, focused }) => (
          <Text
            style={[
              globalStyles.label,
              { color: focused ? "#FFFFFF" : "#888888" },
            ]}
          >
            {route.title}
          </Text>
        )}
        renderIcon={({ route, focused }) => (
          <Icon
            name={route.focusedIcon}
            color={focused ? "#fff" : "#888888"}
            size={24}
          />
        )}
      />
    </PaperProvider>
  );
};

export default ControlLavadoScreen;
