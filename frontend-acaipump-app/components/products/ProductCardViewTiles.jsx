import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/index";
import React from "react";
import styles from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import EmptyBottom from "../EmptyBottom";

const ProductCardViewTiles = ({ item }) => {
  const navigation = useNavigation();

  return (
    
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.pcvtContainer}>
        <TouchableOpacity
          style={styles.pcvtCardView}
          onPress={() => navigation.navigate("ProductDetails", { item })}
        >
          <View style={styles.pcvtImage}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.pcvtProductImg}
            />
          </View>

          <View style={styles.pcvtTextContainer}>
            <Text style={styles.pcvtProductTitle}>{item.title}</Text>

            <Text numberOfLines={1} style={styles.pcSubtitle}>
              {item.subtitle}
            </Text>

            <Text numberOfLines={1} style={styles.pcUnity}>
              {item.unity} unid.
            </Text>

            <View style={styles.pcvtPriceView}>
              <Text style={styles.pdCurrencySign}>
                R$ <Text style={styles.pcPrice}>{item.price}</Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity>
          <View style={styles.pcvtButtonContainer}>
            <Ionicons name='add-circle' size={SIZES.large} color={COLORS.lightWhite}/>

              <Text style={styles.pcvtButtonText}>Add à Sacola</Text>
            
          </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    
    
  );
};

export default ProductCardViewTiles;
