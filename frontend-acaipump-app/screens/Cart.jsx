import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import styles from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants/index";
import fetchCart from "../hook/fetchCart";
import { Button, CartTile } from "../components";
import { LogoSymbol } from "../assets/images/SVG/SvgIndex";
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(10.0); 
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);
  // Total Cart State and Function Declarations

  const subtotal = useMemo(() => {
    const calculatedSubtotal = cartItems
      .reduce((total, item) => {
        console.log(
          `Price: ${item.cartItem.price}, Quantity: ${item.quantity}`
        );
        return total + item.cartItem.price * item.quantity;
      }, 0)
      .toFixed(2);
    console.log(`Calculated Subtotal: ${calculatedSubtotal}`);
    return calculatedSubtotal;
  }, [cartItems]);

  useEffect(() => {
    const newTotalCart = parseFloat(subtotal) + parseFloat(deliveryFee);
    console.log(`New Cart Total: ${newTotalCart} (Subtotal: ${subtotal}, Delivery Fee: ${deliveryFee})`);
    setCartTotal(newTotalCart.toFixed(2));
  }, [subtotal, deliveryFee]);


  const updateCartItem = (updatedItem) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };



  // -------------------------------------- //
  //      Check if User is Logged In        //
  // -------------------------------------- //

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");

      if (id !== null) {
        setIsLoggedIn(true);
        console.log(isLoggedIn, "user Is Logged in");
      } else {
        setIsLoggedIn(false);
        console.log("user is NOT logged in");
      }
    } catch (error) {
      console.log("Error checking user login Status", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // -------------------------------------- //
  // Stripe Checkout Functions and States   //
  // -------------------------------------- //
  const [paymentUrl, setPaymentUrl] = useState(null);

  const createCheckOut = async () => {
    const id = await AsyncStorage.getItem("id");

    const response = await fetch(
      "http://acaipump-production.up.railway.app/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(id),
          cartItems: cartItems.map((item) => ({
            ...item.cartItem,
            cartQuantity: item.quantity,
          })),
        }),
      }
    );

    if (response.ok) {
      const { url } = await response.json();
      setPaymentUrl(url);
    } else {
      const errorText = await response.text();
      console.error("Error creating checkout session:", errorText);
    }
  };

  

  const handleBuy = () => {
    if (!isLoggedIn) {
      navigation.navigate("LoginPage");
    } else {
      createCheckOut();
    }
  };

  // handle Navigation Change

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
                      style={[styles.separator, { marginTop: SIZES.xSmall * 0.1 }]}
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
                            R$ {subtotal}
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
