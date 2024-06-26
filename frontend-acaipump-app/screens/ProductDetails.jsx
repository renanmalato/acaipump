import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../constants/styles";
import { COLORS, SIZES } from "../constants/index";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import Hypher from "hypher";
import english from "hyphenation.en-us";
import { CtaButton, EmptyBottom } from "../components";
import AddToCart from "../hook/addToCart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

const h = new Hypher(english);
/* <Text style={styles.pdDescriptionText}>
 {h.hyphenateText("hyphenation text")}
 </Text> */

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    checkUser();
    checkFavorites();
  }, []);

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");

      if (id !== null) {
        setIsLoggedIn(true);
        console.log(isLoggedIn, "user IS logged in");
      } else {
        setIsLoggedIn(false);
        console.log("user is NOT logged in");
      }
    } catch (error) {}
  };

  const createCheckOut = async () => {
    const id = await AsyncStorage.getItem("id");

    const response = await fetch(
      "https://acaipump-production.up.railway.app/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(id),
          cartItems: [
            {
              name: item.title,
              id: item._id,
              price: item.price,
              cartQuantity: count,
            },
          ],
        }),
      }
    );
    const { url } = await response.json();
    setPaymentUrl(url);
  };

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;

    if (url && url.includes("checkout-success")) {
      navigation.navigate("Orders");
    } else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  };

  const addToFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      subtitle: item.subtitle,
      price: item.price,
      unity: item.unity,
      imageUrl: item.imageUrl,
    };

    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];

        setFavorites(false);
      } else {
        favoritesObj[productId] = productObj;
        setFavorites(true);
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = () => {
    if (isLoggedIn === false) {
      navigation.navigate("LoginPage");
    } else {
      addToFavorites();
    }
  };

  const handleBuy = () => {
    if (isLoggedIn === false) {
      navigation.navigate("LoginPage");
    } else {
      createCheckOut();
    }
  };

  const handleCart = () => {
    if (isLoggedIn === false) {
      navigation.navigate("LoginPage");
    } else {
      AddToCart(item._id, count);
    }
  };

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    console.log(favoritesId);

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);

        if (favorites[item._id]) {
          console.log(item._id);
          setFavorites(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.pdContainer}>
        {paymentUrl ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <WebView
              source={{ uri: paymentUrl }}
              onNavigationStateChange={onNavigationStateChange}
            />
          </SafeAreaView>
        ) : (
          <View style={styles.pdContainer}>
            {/* ---------------------------- */}
            {/*   Top Back and Heart Icons   */}
            {/* ---------------------------- */}

            <View style={styles.pdUpperRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-circle"
                  size={SIZES.xLarge}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePress()}>
                <Ionicons
                  name={favorites ? "heart" : "heart-outline"}
                  size={SIZES.xLarge}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            {/* --------- */}
            {/*   Image   */}
            {/* --------- */}
            <ScrollView style={{ zIndex: -1 }}>
              <View style={styles.pdImageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.pdImage} />

                {/* --------- */}
                {/*   Title   */}
                {/* --------- */}

                <View style={styles.pdDetails}>
                  <View style={styles.pdTitleRow}>
                    <Text style={styles.pdTitle} numberOfLines={2}>
                      {item.title}{" "}
                      <Text style={styles.pdSubTitle}>
                        {" "}
                        {"\n"}
                        {item.subtitle}
                        <Text style={styles.pdSize}> {item.size}</Text>
                      </Text>
                    </Text>

                    <View style={styles.pdPriceAndUnityWrapper}>
                      <View style={styles.pdPriceWrapper}>
                        <Text style={styles.pdCurrencySign}>R$ </Text>
                        <Text style={styles.pdPriceInteger}>{item.price}</Text>
                        <Text style={styles.pdPriceDecimals}> </Text>
                      </View>

                      <View style={styles.pdUnityView}>
                        <Text style={styles.pdUnity}>
                          {item.unity} {item.unity > 1 ? "unidades" : "unidade"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* -------------------------------- */}
                {/*   Rating and How many you Want   */}
                {/* -------------------------------- */}
                <View style={styles.lineDiv(-SIZES.small)} />

                <View style={styles.pdRatingRow}>
                  <View style={styles.pdHowManyView}>
                    <Text style={styles.pdHowManyText}>Quantos você quer?</Text>
                  </View>
                </View>

                {/* ----------------------- */}
                {/*   Add to Cart Row       */}
                {/* ----------------------- */}

                <View style={styles.pdAddToCartRowWrapper}>
                  <View style={styles.pdIncrementCartWrapper}>
                    <TouchableOpacity onPress={() => increment()}>
                      <Ionicons
                        name="add-circle"
                        size={SIZES.large * 1.2}
                        color={COLORS.gray2}
                      />
                    </TouchableOpacity>

                    <Text style={styles.pdIncrementCartText}> {count} </Text>

                    <TouchableOpacity onPress={() => decrement()}>
                      <Ionicons
                        name="remove-circle"
                        size={SIZES.large * 1.2}
                        color={COLORS.gray2}
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => handleCart()}>
                    <View style={styles.pdAddToCartButtonView}>
                      <Text style={styles.pdAddToCartButtonText}>
                        + Adicionar à Sacola
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.lineDiv(1), { marginTop: -1 }]} />
                {/* closing view */}
              </View>

              {/* --------------- */}
              {/*   Description   */}
              {/* --------------- */}

              <View style={styles.pdDescriptionWrapper}>
                <Text style={styles.pdDescriptionTitle}>Benefícios </Text>
                <Text style={styles.pdDescriptionText}>{item.description}</Text>
              </View>

              {/* --------------- */}
              {/*   Delivery Row  */}
              {/* --------------- */}

              <View style={styles.pdDeliveryRow}>
                <View style={styles.pdLocationWrapper}>
                  
                  <View>
                    <MaterialCommunityIcons
                      name="motorbike"
                      size={SIZES.large}
                    />
                    </View>

                  <View>
                    <Text style={styles.pdLocationText}>
                    {"    "}Entregas: Região Metropolitana de Belém{" "}
                    </Text>
                  </View>
                  
                </View>
              </View>

              {/* --------------- */}
              {/*   Nutri Facts   */}
              {/* --------------- */}

              <View style={styles.pdNutriFactsWrapper}>
                <Text style={styles.pdNutriFactsTitle}>Nutricional</Text>

                <View style={styles.pdNutriFactsRow}>
                  <Text style={styles.pdNutriFactsText}>Calorias</Text>
                  <Text style={styles.pdNutriFactsText}>
                    {item.product_calories}
                  </Text>
                </View>

                <View style={styles.pdNutriFactsRow}>
                  <Text style={styles.pdNutriFactsText}>Proteínas</Text>
                  <Text style={styles.pdNutriFactsText}>
                    {item.product_protein}
                  </Text>
                </View>

                <View style={styles.pdNutriFactsRow}>
                  <Text style={styles.pdNutriFactsText}>Carboidratos</Text>
                  <Text style={styles.pdNutriFactsText}>
                    {item.product_carbs}
                  </Text>
                </View>

                <View style={styles.pdNutriFactsRow}>
                  <Text style={styles.pdNutriFactsText}>Açúcar Adicionado</Text>
                  <Text style={styles.pdNutriFactsText}>
                    {item.product_addedsugar}
                  </Text>
                </View>

                <View style={styles.pdNutriFactsRow}>
                  <Text style={styles.pdNutriFactsText}>Vitaminas</Text>
                  <Text style={styles.pdNutriFactsText}>
                    {item.product_vitamins}
                  </Text>
                </View>
              </View>
              <EmptyBottom />
            </ScrollView>

            {/* --------------- */}
            {/* CTA Button Row  */}
            {/* --------------- */}

            <View style={styles.pgvCtaBtnRow}>
              <TouchableOpacity
                style={styles.pdCtaBtn}
                onPress={() => handleBuy()}
              >
                <Text style={styles.pdCtaBtnText}>Revisar e Pedir Açaí</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.pdCtaCart}
                onPress={() => handleCart()}
              >
                <Fontisto
                  name="shopping-bag"
                  size={SIZES.large}
                  color={COLORS.secondary2}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: SIZES.large }}></View>
          </View>
        )}
      </View>
    </>
  );
};

export default ProductDetails;
