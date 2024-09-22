import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Para que el contenido se alinee en la parte superior
    alignItems: "center",
    backgroundColor: "#222",
    padding: 20,
  },
  content: {
    width: "100%", // Asegurando que el contenido ocupe el ancho completo
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  date: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
    color: "#fff",
  },
  time: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  input: {
    width: "100%", // Asegura que los inputs ocupen todo el ancho disponible
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10, // Espacio entre los inputs
  },
  input1: {
    width: "100%", // Asegura que los inputs ocupen todo el ancho disponible
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10, // Espacio entre los inputs
  },
  inputmodelo: {
    width: "100%", // Asegura que los inputs ocupen todo el ancho disponible
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15, // Espacio entre los inputs
  },
  clearButton: {
    padding: 10,
    backgroundColor: "#444",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonWrapper: {
    width: "90%",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#555",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  buttonText: {
    color: "#fff",
  },
  registerContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  smallText: {
    color: "#fff",
    fontSize: 14,
  },
  registerText: {
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  footer: {
    alignItems: "center", // Centrar el texto en el footer
    paddingVertical: 10, // Espacio extra en el footer
  },
  footerText: {
    color: "#888",
    fontSize: 14,
  },
  footerTextBold: {
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40, // Mueve el botón hacia abajo
  },
  backButton: {
    backgroundColor: "#444", // Fondo oscuro para el botón redondo
    borderRadius: 50, // Hace el botón redondo
    marginBottom: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  plusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  plusIcon: {
    alignSelf: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    padding: 0,
    marginTop: 0, // Ajustado para eliminar el espacio superior
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 18, // Ajuste del tamaño del texto
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
  label: {
    fontSize: 12, // Tamaño reducido para centrar mejor las leyendas
    textAlign: "center",
    marginTop: -5, // Reducido para disminuir la separación entre el icono y la leyenda
  },
  packageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },

  packageButton: {
    width: "45%", // Ajusta el ancho de los botones de paquete
    marginBottom: 20,
  },
  packageButtonText: {},
  formButton: {
    marginBottom: 10,
    backgroundColor: "#555555",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  limpiarButton: {
    backgroundColor: "#666666",
    borderColor: "#ffffff",
    borderWidth: 1,
    marginTop: 0, // Elimina cualquier margen superior adicional
  },
  modificarButton: {
    backgroundColor: "#777777",
    borderColor: "#ffffff",
    borderWidth: 1,
    marginTop: 10, // Elimina cualquier margen superior adicional
  },
  autocompleteContainer: {
    width: "100%",
    position: "relative",
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: "#555555",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: "#fff",
  },
  suggestionsContainer: {
    backgroundColor: "#333333",
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  leftButtonColumn: {
    flexDirection: "column",
    width: "45%", // Ajusta el ancho de las columnas de botones
  },
  rightButtonColumn: {
    flexDirection: "column",
    width: "45%", // Ajusta el ancho de las columnas de botones
  },
  appbar: {
    backgroundColor: "#000",
  },
  appbarTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pickerContainer: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  picker: {
    color: "#ffffff",
    width: "75%",
    backgroundColor: "#888888",
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: -10, // Reducción del margen superior
  },
  pickerItem: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  customPicker: {
    color: "#ffffff", // Texto blanco
    backgroundColor: "#333", // Fondo negro
    borderColor: "#ffffff", // Borde blanco
    borderWidth: 1,
    width: "142%",
    left: -47,
  },
  packageTitle: {
    color: "#fff",
    marginBottom: 0, // Eliminar el margen inferior del título
  },

  packageTitle1: {
    color: "#fff",
    marginBottom: 10,
  },
});
