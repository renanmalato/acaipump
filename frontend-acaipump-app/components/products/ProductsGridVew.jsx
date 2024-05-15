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
import ProductCardView from "./ProductCardView";

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
        numColumns={2}
        renderItem={({ item }) => <ProductCardView item={item} />}
        contentContainerStyle={styles.pgvFlatList}
        columnWrapperStyle={styles.pgvColumnWrapper}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductsGridVew;
