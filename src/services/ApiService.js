// /src/services/ApiService.js

import * as Crypto from "expo-crypto";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzl_K0a0qz26hyVt989hwoTJfcBHDIQntCYHivWMFujGXDtPAj1eDJcVBLw5SOYrgyhQw/exec"; // Reemplaza con tu URL real

// Función para hashear la contraseña
export const hashPassword = async (password) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return digest;
};

// Función para iniciar sesión
export const loginUser = async (username, password) => {
  const passwordHash = await hashPassword(password);

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      username,
      passwordHash,
    }),
  });

  const data = await response.json();
  return data;
};

// Función para registrar usuario
export const registerUser = async (name, username, password) => {
  const passwordHash = await hashPassword(password);

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "register",
      name,
      username,
      passwordHash,
    }),
  });

  const data = await response.json();
  return data;
};
