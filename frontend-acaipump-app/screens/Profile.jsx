import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../constants/styles";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);




  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;
    
console.log(id)
    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser)
        setUserData(parseData)
        setUserLogin(true)
      } else {
        navigation.navigate('LoginPage')
      }
    } catch (error) {
      console.log("Error retrieving the data:", error)
    }
  }

  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([useId, 'id'])
      navigation.replace('Bottom Navigation')
    } catch (error) {
      console.log("Error logging out the user:", error)

    }
  }
  

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [ 
      {
        text: "Cancel", onPress: () => console.log("Cancel Pressed")

      },
      {
        text: "Continue", onPress: () => userLogout()

      },
      {defaultIndex : 1}
      ]
    )
  }

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device?",
      [ 
      {
        text: "Cancel", onPress: () => console.log("Cancel Clear Cache Pressed")

      },
      {
        text: "Continue", onPress: () => console.log("Continue Cache Pressed")

      },
      {defaultIndex : 1}
      ]
    )
  }

  const deleteAccount = () => {
    Alert.alert(
      "Delete Accoung",
      "Are you sure do you want to delete your account?",
      [ 
      {
        text: "Cancel", onPress: () => console.log("Cancel Delete Account Pressed")

      },
      {
        text: "Continue", onPress: () => console.log("Delete Account Confirm Pressed")

      },
      {defaultIndex : 1}
      ]
    )
  }
  

  return (
    <ScrollView>
    <View style={styles.profilePageContainer}>
      <View style={styles.profilePageContainer}>
        <StatusBar backgroundColor={COLORS.gray} />

        {/* ------------------------ */}
        {/* Profile Cover Image View */}
        {/* ------------------------ */}

        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.profileCoverImage}
          />
        </View>

        {/* ------------------ */}
        {/* Profile Image View */}
        {/* ------------------ */}

        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profileImage}
          />

          {/* ------------------ */}
          {/*    Profile Name    */}
          {/* ------------------ */}

          <Text style={styles.profileName}>
            {userLogin === true ? userData.username : "Please login into your account"}
          </Text>

          {/* -------------------------------------------- */}
          {/*    if NOT Logged in -> Fazer Login           */}
          {/*    if Logged in -> Profile name and email    */}
          {/* -------------------------------------------- */}

          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <View style={styles.profilePageCtaBtn}>
                <Text style={styles.profilePageBtnText}>Fazer login</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.profilePageSecondaryBtn}>
              <Text style={styles.profilePageBtnText}>random@email.com</Text>
            </View>
          )}

          {/* -------------------------------------------- */}
          {/*    if Logged in -> Profile Menu Wrapper      */}
          {/*    if NOT Logged in -> Fazer Login           */}
          {/* -------------------------------------------- */}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.profilePageMenuWrapper}>


              {/* Favorites */}


              <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <View style={styles.profilePageMenuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={SIZES.large}
                  />
                  <Text style={styles.profilePageMenuText}>Favorites</Text>
                </View>
              </TouchableOpacity>


               {/* Orders */}


              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.profilePageMenuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={SIZES.large}
                  />
                  <Text style={styles.profilePageMenuText}>Pedidos</Text>
                </View>
              </TouchableOpacity>


               {/* Cart */}


              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.profilePageMenuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={SIZES.large}
                  />
                  <Text style={styles.profilePageMenuText}>Sacola</Text>
                </View>
              </TouchableOpacity>


               {/* Clear Cache */}


              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.profilePageMenuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    color={COLORS.primary}
                    size={SIZES.large}
                  />
                  <Text style={styles.profilePageMenuText}>Delete Cache</Text>
                </View>
              </TouchableOpacity>


              {/* Delete Account */}
              

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.profilePageMenuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    color={COLORS.primary}
                    size={SIZES.large}
                  />
                  <Text style={styles.profilePageMenuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>


               {/* Logout */}


              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.profilePageMenuItem(0.2)}>
                  <AntDesign
                    name="logout"
                    color={COLORS.primary}
                    size={SIZES.large}
                  />
                  <Text style={styles.profilePageMenuText}>Logout</Text>
                </View>
              </TouchableOpacity>

            </View>
          )}
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default Profile;
