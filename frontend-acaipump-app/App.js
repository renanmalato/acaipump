import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart, ProductDetails, Products, LoginPage, Orders, Favorites, SignUp } from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'regular': require("./assets/fonts/Poppins-Regular.ttf"),
    'light': require("./assets/fonts/Poppins-Light.ttf"),
    'bold': require("./assets/fonts/Poppins-Bold.ttf"),
    'medium': require("./assets/fonts/Poppins-Medium.ttf"),
    'extrabold': require("./assets/fonts/Poppins-ExtraBold.ttf"),
    'semibold': require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        setAppIsReady(true);
      }
    };
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Bottom Navigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductsList"
            component={Products}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
