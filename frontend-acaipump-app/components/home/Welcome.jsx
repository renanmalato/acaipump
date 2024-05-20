import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../constants/styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/index";
import { useNavigation } from "@react-navigation/native";
import Carroussel from "./Carroussel";
import { Logo, HeyPumpers, RaioBranco } from "../../assets/images/SVG/SvgIndex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { processFontFamily } from "expo-font";

const Welcome = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser);
        setUserData(parseData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.logoWrapper}>
        <Logo style={styles.logo} />
        <RaioBranco style={styles.raioBranco} />
      </View>

      <View style={styles.container}>
        <View style={styles.topHelloContainer}>
          <HeyPumpers />
          <View style={styles.helloUserData}>
            <Text style={[styles.helloUserText, {fontFamily: 'semibold'} ]}>
              {userData ? userData.username : <TouchableOpacity onPress={() => navigation.navigate("Profile")}><Text style={[styles.helloUserText, {fontFamily: 'semibold'} ]}>Fazer login</Text></TouchableOpacity>}
              </Text>
            <Text style={styles.helloUserText}>{userData ? userData.email : "ou registrar-se"}</Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather
            name="search"
            size={SIZES.medium + 5}
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            placeholder="What you are looking for?"
            onPressIn={() => navigation.navigate("Search")}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.searchRightBtn}>
            <Ionicons
              name="camera-outline"
              color={COLORS.secondary3}
              size={SIZES.medium + 8}
            />
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default Welcome;
