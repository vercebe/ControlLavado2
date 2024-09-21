import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ControlLavadosScreen from "../screens/ControlLavadosScreen";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isFirstLogin, checkingAuth } =
    useContext(AuthContext);
  const [userConfirmed, setUserConfirmed] = useState(false); // Local state to confirm user

  useEffect(() => {
    if (isAuthenticated) {
      setUserConfirmed(false); // Reset confirmation when authentication changes
    }
  }, [isAuthenticated]);

  // If the authentication check is still happening, show a loading indicator
  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated && (isFirstLogin || userConfirmed) ? (
          <Stack.Screen
            name="ControlLavados"
            component={ControlLavadosScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              children={(props) => (
                <HomeScreen {...props} setUserConfirmed={setUserConfirmed} />
              )}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default AppNavigator;
