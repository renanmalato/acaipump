import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import styles from "../constants/styles";
import { SIZES, COLORS } from "../constants/index";
import fetchCart from "../hook/fetchCart";
import { Button, CartTile } from "../components";
import { LogoSymbol } from "../assets/images/SVG/SvgIndex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

const Cart = ({ navigation }) => {
  const { data, loading } = fetchCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);
  const deliveryFee = 10.0;
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [paymentUrl, setPaymentUrl] = useState(null);


  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.cartItem.price * item.quantity, 0).toFixed(2);
  };

  useEffect(() => {
    const newSubtotal = calculateSubtotal(cartItems);
    const newTotalCart = (parseFloat(newSubtotal) + deliveryFee).toFixed(2);
    setCartTotal(newTotalCart);
    AsyncStorage.setItem("cartTotal", newTotalCart);
  }, [cartItems]);

  const updateCartItem = async (updatedItem) => {
    try {
      // Update the item in the database
      await AddToCart(updatedItem.cartItem._id, updatedItem.quantity);

      // Fetch the updated cart data
      const updatedCart = await fetchCart();
      setCartItems(updatedCart.data);
    } catch (error) {
      console.error("Failed to update cart item", error);
    }
  };


  // Total Cart State and Function Declarations


  // -------------------------------------- //
  //      Check if User is Logged In        //
  // -------------------------------------- //

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");

      if (id !== null) {
        setIsLoggedIn(true);
        console.log("User is logged in");
      } else {
        setIsLoggedIn(false);
        console.log("User is NOT logged in");
      }
    } catch (error) {
      console.log("Error checking user login status", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // -------------------------------------- //
  // Stripe Checkout Functions and States   //
  // -------------------------------------- //

  const createCheckOut = async () => {
    const id = await AsyncStorage.getItem("id");
    const totalAmount = parseFloat(calculateSubtotal(cartItems)) + deliveryFee;

    const response = await fetch(
      "http://acaipump-production.up.railway.app/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(id),
          totalAmount: totalAmount,
          cartItems: cartItems.map((item) => ({
            name: item.cartItem.title,
            id: item.cartItem._id,
            price: item.cartItem.price,
            cartQuantity: item.quantity,
          })),
        }),
      }
    );

    const { url } = await response.json();
    setPaymentUrl(url);
  };

  const handleBuy = () => {
    if (!isLoggedIn) {
      navigation.navigate("LoginPage");
    } else {
      createCheckOut();
    }
  };

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;
    if (url && url.includes("checkout-success")) {
      navigation.navigate("Orders");
    } else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.pgContainer}>
      <SafeAreaView style={styles.pgvTopSafeArea}>
        <View style={{ paddingTop: SIZES.large * 1.5 }} />
      </SafeAreaView>

      <View style={styles.pgContainer}>
        {paymentUrl ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <WebView
              source={{ uri: paymentUrl }}
              onNavigationStateChange={onNavigationStateChange}
            />
          </SafeAreaView>
        ) : (
          <>
            {/* ---------------------------- */}
            {/*   Top Back and Heart Icons   */}
            {/* ---------------------------- */}
            <View style={[styles.pgvTopWrapper, { overflow: "hidden" }]}>
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
                        <Text style={styles.headerTitleWhite}>Sacola</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                {/* ------------------- */}
                {/*      Flat List      */}
                {/* ------------------- */}
                <FlatList
                  data={data}
                  contentContainerStyle={[
                    styles.pgvFlatList,
                    { marginTop: SIZES.large },
                  ]}
                  ItemSeparatorComponent={() => (
                    <View
                      style={[
                        styles.separator,
                        { marginTop: SIZES.xSmall * 0.1 },
                      ]}
                    />
                  )}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <CartTile
                      item={item}
                      onPress={() => {
                        setSelect(!select), setSelected(item);
                      }}
                      select={select}
                      updateCartItem={updateCartItem}
                    />
                  )}
                  //  ------------------ //
                  //  SubTotal Total     //
                  //  Delivery Fee       //
                  //  ------------------ //

                  ListFooterComponent={
                    <>
                      <View style={styles.cartTotalsCheckoutContainer}>
                        {/* -------- */}
                        {/* Subtotal */}
                        {/* -------- */}
                        <View style={styles.cartTotalsCheckoutView}>
                          <Text style={styles.cartTotalsText("semibold")}>
                            {" "}
                            Subtotal
                          </Text>

                          <Text style={styles.cartTotalsText("regular")}>
                          R$ {calculateSubtotal(cartItems)}
                          </Text>
                          <View style={styles.lineDivTop(SIZES.large * 1)} />
                        </View>

                        {/* ------------ */}
                        {/* Delivery Fee */}
                        {/* ------------ */}
                        <View style={styles.cartTotalsCheckoutView}>
                          <Text style={styles.cartTotalsText("semibold")}>
                            {" "}
                            Entrega:
                          </Text>

                          <Text style={styles.cartTotalsText("regular")}>
                            R$ {deliveryFee.toFixed(2)}
                          </Text>
                          <View style={styles.lineDivTop(SIZES.large * 1)} />
                        </View>

                        {/* ------------ */}
                        {/*  Totalzão   */}
                        {/* ------------ */}
                        <View style={styles.cartTotalsCheckoutView}>
                          <Text
                            style={[
                              styles.cartTotalsText("semibold"),
                              { color: COLORS.black },
                            ]}
                          >
                            {" "}
                            Subtotal
                          </Text>

                          <Text
                            style={[
                              styles.cartTotalsText("semibold"),
                              { color: COLORS.black },
                            ]}
                          >
                            R$ {cartTotal}
                          </Text>
                          <View style={styles.lineDivTop(SIZES.large * 1)} />
                        </View>
                      </View>

                      {/* --------------- */}
                      {/* CTA Button Row  */}
                      {/* --------------- */}
                      <View style={styles.pgvCtaBtnRow}>
                        <TouchableOpacity
                          style={styles.pdCtaBtn}
                          onPress={handleBuy}
                        >
                          <Text style={styles.pdCtaBtnText}>
                            Revisar e Pedir Açaí
                          </Text>
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

                    </>
                  }
                />
              </>
            )}

            {select === false ? (
              <View></View>
            ) : (
              <Button title={"Checkout"} onPress={() => {}} isValid={select} />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Cart;
