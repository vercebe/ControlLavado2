import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Para que el footer quede en la parte inferior
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
    marginTop: 40,
    marginBottom: 30,
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
    marginBottom: 110,
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
    flex: 1,
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
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
  button1: {
    backgroundColor: "#555",
    borderColor: "#ffffff",
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
  registerContainer: {
    marginTop: 20,
    marginBottom: 40,
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
    marginTop: 20,
    width: "80%",
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
});
