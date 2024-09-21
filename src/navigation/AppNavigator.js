import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ControlLavadosScreen from "../screens/ControlLavadosScreen"; // Verifica esta ruta
import { AuthContext } from "../context/AuthContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [userConfirmed, setUserConfirmed] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setUserConfirmed(false); // Resetear la confirmación cuando el estado de autenticación cambia
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated && userConfirmed ? (
          <Stack.Screen
            name="ControlLavados"
            component={ControlLavadosScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              children={(props) => (
                <HomeScreen {...props} setUserConfirmed={setUserConfirmed} />
              )} // Aquí pasamos setUserConfirmed correctamente
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
