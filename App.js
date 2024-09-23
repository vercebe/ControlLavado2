// app.js

import React from "react";
import { AppContextProvider } from "./src/context/AppContext";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <AppContextProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </AppContextProvider>
  );
};

export default App;
