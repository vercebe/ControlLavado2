import axios from "axios";
import CryptoJS from "crypto-js"; // Asegúrate de que esté importado

const API_URL =
  "https://script.google.com/macros/s/AKfycbwsKxwJEcsgSbszhDJXkcN0hUxmPeamK9kiGB4KT61fKWpakOJRo3nhmf903RtiCZQ9aw/exec"; // Reemplaza con tu script de Google Apps

// Función para autenticar usuarios
export const loginUser = async (username, password) => {
  try {
    // Generar el hash de la contraseña
    const passwordHash = CryptoJS.SHA256(password).toString();

    const payload = {
      action: "login",
      username,
      passwordHash,
    };

    const response = await axios.post(API_URL, payload);

    return response.data; // Debería devolver el token, username y fecha de expiración
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw error;
  }
};

// Función para registrar usuarios
export const registerUser = async (name, username, password) => {
  try {
    const passwordHash = CryptoJS.SHA256(password).toString();

    const payload = {
      action: "register",
      name,
      username,
      passwordHash,
    };

    const response = await axios.post(API_URL, payload);

    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};
