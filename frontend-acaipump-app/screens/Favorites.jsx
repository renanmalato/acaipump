import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../constants/styles";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";


const Favorites = ({ navigation }) => {
  const [favData, setFavData] = useState([]);
  console.log(favData);
  useEffect(() => {
    checkFavorites();
  }, [])

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;


    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        const favList = Object.values(favorites);
        setFavData(favList);
        console.log(favList.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorites = async (product) => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    let productId = product;

    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];
        checkFavorites();
        // navigation.goBack();
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.favContainer}>
      <View style={styles.favTitleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={SIZES.large}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.favTitleText}>Favorites</Text>
      </View>

      <FlatList 

      data={favData}
      renderItem={({ item }) => (

      <View style={styles.favTileContainer}>

        <View style={styles.favTileImageContainer}>
          <Image source={{uri: item.imageUrl}} 
          style={styles.favTileImage}/>
        </View>

        <View style={styles.favTileTextContainer}>
          <Text style={styles.favTileTitle}>{item.title}</Text>
          <Text style={styles.favTileSubtitle}>{item.subtitle}</Text>
          <Text style={styles.favTilePrice}>$ {item.price}</Text>
        </View>

          <SimpleLineIcons
          onPress={() => deleteFavorites(item.id)}
           name='trash' size={SIZES.large} color={COLORS.red}/>

      </View>

      )}
      keyExtractor={(item, index) => index.toString()}
      
      />

    </SafeAreaView>
  );
};

export default Favorites;
