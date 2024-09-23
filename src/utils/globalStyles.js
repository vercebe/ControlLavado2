// globalStyles.js

import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 20,
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  titlealt: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
    marginTop: 80,
  },
  date: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
    color: "#fff",
  },
  time: {
    fontSize: 18,
    marginBottom: 90,
    textAlign: "center",
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    marginBottom: 20,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input1: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  inputmodelo: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15,
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
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 30,
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
    marginTop: 40,
  },
  backButton: {
    backgroundColor: "#444",
    borderRadius: 50,
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
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 18,
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
    fontSize: 12,
    textAlign: "center",
    marginTop: -5,
  },
  packageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  packageButton: {
    width: "45%",
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
    marginTop: 0,
  },
  modificarButton: {
    backgroundColor: "#777777",
    borderColor: "#ffffff",
    borderWidth: 1,
    marginTop: 10,
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
    width: "45%",
  },
  rightButtonColumn: {
    flexDirection: "column",
    width: "45%",
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
    marginTop: -10,
  },
  pickerItem: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  customPicker: {
    color: "#ffffff",
    backgroundColor: "#333",
    borderColor: "#ffffff",
    borderWidth: 1,
    width: "142%",
    left: -47,
  },
  packageTitle: {
    color: "#fff",
    marginBottom: 0,
  },
  packageTitle1: {
    color: "#fff",
    marginBottom: 10,
  },
  bottomNav: {
    backgroundColor: "#000",
  },
  disabledButton: {
    opacity: 0.5,
  },
  pendienteItem: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
  },
  legendText: {
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
  },
  pendientesContainer: {
    paddingVertical: 20,
    backgroundColor: "#1a1a1a",
  },

  picker: {
    color: "#ffffff",
    width: "75%",
    backgroundColor: "#888888",
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: -10,
  },
  disabledPicker: {
    backgroundColor: "#555555",
    opacity: 0.5,
  },

  // Estilos exclusivos para RegisterScreen
  registerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 20,
  },
  registerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
    marginTop: 60,
  },
  registerInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "105%",
    marginBottom: 20,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  registerInput: {
    width: "80%",
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerClearButton: {
    padding: 10,
    backgroundColor: "#444",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  registerButtonWrapper: {
    width: "90%",
    marginVertical: 5,
  },
  registerButton: {
    backgroundColor: "#555",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  registerButtonText: {
    color: "#fff",
  },
  registerBackButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  registerBackButton: {
    backgroundColor: "#444",
    borderRadius: 50,
    marginBottom: 5,
  },
  registerBackButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  registerSmallText: {
    color: "#fff",
    fontSize: 14,
  },
  registerText: {
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  registerFooter: {
    alignItems: "center",
    paddingVertical: 10,
  },
  registerFooterText: {
    color: "#888",
    fontSize: 14,
  },
  registerFooterTextBold: {
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Estilos exclusivos para HomeScreen
  homeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  homeInput: {
    width: "83%",
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  homeClearButton: {
    padding: 10,
    backgroundColor: "#444",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  homeButtonWrapper: {
    width: "90%",
    marginVertical: 5,
  },
  homeButton: {
    backgroundColor: "#555",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  homeButtonText: {
    color: "#fff",
  },
  homeRegisterContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  homeSmallText: {
    color: "#fff",
    fontSize: 14,
  },
  homeRegisterText: {
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default globalStyles;
