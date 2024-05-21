import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import React from "react";
import styles from "../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";

import { CtaButton, EmptyBottom, ProductsGridVew } from "../components";
import { LogoSymbol } from "../assets/images/SVG/SvgIndex";
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
                  color={COLORS.white}
                />
              </TouchableOpacity>

              <View style={styles.headingsContainerWrapper}>
                <View style={styles.headingsContainer}>
                  <View style={styles.header}>
                    <View style={styles.headingLogoSymbolView}>
                      <LogoSymbol style={styles.headingLogoSymbol} />
                    </View>

                    <View style={styles.headerTitleView}>
                      <Text style={styles.headerTitleWhite}>
                        Produtos e Packs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>


            </View>
          </View>
          
          <ProductsGridVew />
          
          
          
        </View>
        
        

        {/* --------------- */}
        {/* CTA Button Row  */}
        {/* --------------- */}

        <View style={styles.pgvCtaBtnRow}>
          <TouchableOpacity style={styles.pdCtaBtn} onPress={() => {}}>
            <Text style={styles.pdCtaBtnText}>Revisar e Pedir Açaí</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pdCtaCart}
            onPress={() => AddToCart(item._id, count)}
          >
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
