import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  StyleSheet,
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
import { globalStyles } from "../utils/globalStyles";
import { AuthContext } from "../context/AuthContext";

// Obtener dimensiones de la pantalla
const { width: screenWidth } = Dimensions.get("window");

// Componente para menú personalizado
const CustomMenu = ({ visible, closeMenu, handleCloseApp }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={closeMenu}
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.menuOverlay}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={handleCloseApp} style={styles.menuItem}>
              <Text style={styles.menuText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Ruta para agregar lavado
const MasRoute = ({ showForm, setShowForm }) => {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [modelosGuardados, setModelosGuardados] = useState([]);

  useEffect(() => {
    const cargarModelos = async () => {
      try {
        const modelos = await AsyncStorage.getItem("modelos");
        if (modelos) {
          setModelosGuardados(JSON.parse(modelos));
        }
      } catch (error) {
        console.log("Error al cargar modelos desde AsyncStorage", error);
      }
    };
    cargarModelos();
  }, []);

  const handleComenzar = () => {
    if (!placa || !modelo) {
      Alert.alert("Error", "Por favor, complete los campos de Placa y Modelo.");
      return;
    }

    setShowForm(true);
  };

  return (
    <View style={styles.plusContainer}>
      {!showForm && (
        <Icon
          name="plus"
          size={100}
          color="white"
          onPress={handleComenzar}
          style={styles.plusIcon}
        />
      )}
      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Placa"
            value={placa}
            onChangeText={setPlaca}
            style={globalStyles.input}
            theme={{
              colors: {
                placeholder: "#888888",
                primary: "#ffffff",
                background: "#333333",
              },
            }}
          />
          {/* Aquí puedes agregar más campos de formulario */}
        </View>
      )}
    </View>
  );
};

// Otras rutas
const PendientesRoute = () => (
  <View style={styles.centered}>
    <Icon name="clipboard-list" size={100} color="white" />
    <Text style={styles.text}>Pendientes</Text>
  </View>
);

const MiDiaRoute = () => (
  <View style={styles.centered}>
    <Icon name="calendar-today" size={100} color="white" />
    <Text style={styles.text}>Mi Día</Text>
  </View>
);

const MiSemanaRoute = () => (
  <View style={styles.centered}>
    <Icon name="calendar-week" size={100} color="white" />
    <Text style={styles.text}>Mi Semana</Text>
  </View>
);

const ControlLavadoScreen = () => {
  const { logout } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleCloseApp = () => {
    alert("Cerrando aplicación...");
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
          title="Control Lavado"
          titleStyle={globalStyles.title}
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

// Estilos actualizados
const styles = StyleSheet.create({
  plusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  plusIcon: {
    alignSelf: "center", // Para asegurar que esté centrado
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  formContainer: {
    marginTop: 20,
    width: "80%",
  },
  text: {
    fontSize: 24,
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  menuOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: "#fff",
    padding: 10,
    width: screenWidth * 0.2,
    alignItems: "center",
    marginTop: 80,
    marginRight: 10,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ControlLavadoScreen;
