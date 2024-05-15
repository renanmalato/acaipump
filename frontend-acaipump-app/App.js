import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import BottomTabNavigation from './navigation/BottomTabNavigation'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Cart, Home, Profile, Search, ProductDetails, Products, LoginPage, Orders, Favorites, SignUp } from "./screens"

const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  

  return (



    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Bottom Navigation"
        component={BottomTabNavigation}
        options={{headerShown:false}} />

        <Stack.Screen name="Cart"
        component={Cart}
        options={{headerShown:false}} />

        <Stack.Screen name="ProductDetails"
        component={ProductDetails}
        options={{headerShown:false}} />

        <Stack.Screen name="ProductsList"
        component={Products}
        options={{headerShown:false}} />

        <Stack.Screen name="LoginPage"
        component={LoginPage}
        options={{headerShown:false}} />

        <Stack.Screen name="Orders"
        component={Orders}
        options={{headerShown:false}} />

        <Stack.Screen name="Favorites"
        component={Favorites}
        options={{headerShown:false}} />


        <Stack.Screen name="SignUp"
        component={SignUp}
        options={{headerShown:false}} />



      </Stack.Navigator>

    </NavigationContainer>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
