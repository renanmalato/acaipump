import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import React from "react";
import styles from "../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";

import { CtaButton, ProductsGridVew } from "../components";
const Products = ({ navigation }) => {
  return (
    <>
    <View style={styles.pgContainer}>
    <SafeAreaView style={styles.pgvTopSafeArea}></SafeAreaView>

      <View style={styles.pgContainer}>
        {/* ---------------------------- */}
        {/*   Top Back and Heart Icons   */}
        {/* ---------------------------- */}
        <View style={styles.pgvTopWrapper}>
          <View style={styles.pgUpperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={SIZES.xLarge}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <View style={styles.pgScreenTitleContainer}>
              <Text style={styles.pgScreenTitle}>Produtos e Packs</Text>
            </View>

            <TouchableOpacity>
              <Ionicons
                name="heart"
                size={SIZES.xLarge}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ProductsGridVew />
      </View>

        {/* --------------- */}
        {/* CTA Button Row  */}
        {/* --------------- */}

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
        </View>

      <SafeAreaView style={styles.pgvBottomSafeArea}></SafeAreaView>
      </View>
    </>
  );
};

export default Products;
