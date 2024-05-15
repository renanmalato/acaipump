import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/index";
import React from "react";
import styles from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";




const ProductCardView = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.pcContainer}>
        <View style={styles.pcImageContainer}>
          <Image source={{ uri: item.imageUrl }} style={[styles.pcImage ]} 
          />
        </View>

        <View style={styles.pcDetails}>
          <Text numberOfLines={1} style={styles.pcTitle}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.pcSubtitle}>
            {item.subtitle}
          </Text>
          <Text numberOfLines={1} style={styles.pcUnity}>
            {item.unity} unid.
          </Text>
          <Text style={styles.pdCurrencySign}>
            R$ <Text style={styles.pcPrice}>{item.price}</Text>
          </Text>
          <TouchableOpacity style={styles.pcAddBtn}>
            <Text style={styles.pcAddBtnTxt}>+ Add à sacola</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
