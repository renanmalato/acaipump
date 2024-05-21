import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import styles from "./home.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import {
  Welcome,
  Carroussel,
  Headings,
  ProductsRow,
  CtaButton,
  EmptyBottom,
} from "../components/index";
import { SIZES, COLORS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogoSymbol } from "../assets/images/SVG/SvgIndex";


const Home = ({ navigation }) => {
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

  // Truncate text 20 characters Location

const truncateText = (text, maxCharacters) => {
  return text.length > maxCharacters ? `${text.substring(0, maxCharacters)}...` : text;
};

const locationText = userData ? userData.location : "Belém, PA";
const truncatedLocationText = truncateText(locationText, 20);


  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.topContainer}>
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>

            <Text style={styles.entregarEm}>Entregar em:</Text>



            <View style={styles.locationWrapper}>
            <Ionicons name="location-outline" size={SIZES.large * 0.8} color={COLORS.offwhite} />
          
            <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
            <Text style={styles.location}>
              {truncatedLocationText}
            </Text>
            </TouchableOpacity>
            </View>



            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>8</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="bag" size={26} color={COLORS.offwhite} />
              </TouchableOpacity>


            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView>
        <Welcome />
        <Carroussel navigation={navigation} />
        <Headings />
        <ProductsRow />
       
       <EmptyBottom />
      </ScrollView>

      <View style={{ bottom: SIZES.large * 6 }}>
        {/* --------------- */}
        {/* CTA Button Row  */}
        {/* --------------- */}
        {/* 
        <View style={styles.pgvCtaBtnRow}>
        <TouchableOpacity style={styles.pdCtaBtn} onPress={() => {}}>
          <Text style={styles.pdCtaBtnText}>Pedir Açaí</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pdCtaCart} onPress={() => AddToCart(item._id, count )}>
          <Fontisto
            name="shopping-bag"
            size={SIZES.large} 
            color={COLORS.secondary2}
          />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default Home;
