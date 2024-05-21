import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import styles from "../../constants/styles";
import { SIZES, COLORS } from "../../constants";
import useFetch from "../../hook/useFetch";
import ProductCardViewTiles from "./ProductCardViewTiles";
import EmptyBottom from "../EmptyBottom";

const ProductsGridVew = () => {
  const { data, isLoading, error } = useFetch();

  console.log(data);

  if (isLoading) {
    return (
      <View style={styles.pgvLoadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  return (
    
    <View style={styles.pgvContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductCardViewTiles item={item} />}
        contentContainerStyle={styles.pgvFlatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={<View style={{marginTop: SIZES.large * 5}}><EmptyBottom /></View>}
      />
    </View>
   
     
  );
};

export default ProductsGridVew;
