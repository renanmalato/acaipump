import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const SearchTile = ({ item }) => {

    const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={styles.stContainer}
        onPress={() => navigation.navigate('ProductDetails', {item})}
      >

        <View style={styles.slImage}>
          <Image source={{ uri: item.imageUrl }} style={styles.slProductImg} />
        </View>

        <View style={styles.slTextContainer}>
          <Text style={styles.slProductTitle}>{item.title}</Text>
          <Text style={styles.slProductSubtitle}>{item.subtitle}</Text>
          <Text style={styles.slProductPrice}>R$ {item.price}</Text>
        </View>

      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;
