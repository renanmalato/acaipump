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

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);

  const deliveryFee = 10.00;

  // Total Cart State and Function Declarations
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newTotalCart = parseFloat(subtotal) + deliveryFee;
    setCartTotal(newTotalCart.toFixed(2));
  }, [subtotal, deliveryFee]);

  //Function to receive the Cart subtotals and totals
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
    }, [data]);

  const updateCartItem = (updatedItem) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      console.log(`Price: ${item.cartItem.price}, Quantity: ${item.quantity}`);
      return total + item.cartItem.price * item.quantity;
    }, 0).toFixed(2);
  }, [cartItems]);

  return (
    <View style={styles.pgContainer}>
      <SafeAreaView style={styles.pgvTopSafeArea}>
        <View style={{ paddingTop: SIZES.large * 1.5 }} />
      </SafeAreaView>

      <View style={styles.pgContainer}>
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

                <View style={styles.cartTotalsCheckoutContainer}>
                  
                  {/* -------- */}
                  {/* Subtotal */}
                  {/* -------- */}

                  <View style={styles.cartTotalsCheckoutView}>
                  <Text style={styles.cartTotalsText('semibold')}>
                    {" "}
                    Subtotal
                  </Text>

                  <Text style={styles.cartTotalsText('regular')}>R$ {subtotal}</Text>
                  <View style={styles.lineDivTop(SIZES.large * 1)} />

                  </View>



                  {/* ------------ */}
                  {/* Delivery Fee */}
                  {/* ------------ */}
                  
                  <View style={styles.cartTotalsCheckoutView}>
                  <Text style={styles.cartTotalsText('semibold')}>
                    {" "}
                    Entrega:
                  </Text>

                  <Text style={styles.cartTotalsText('regular')}>R$ {deliveryFee.toFixed(2)}</Text>
                  <View style={styles.lineDivTop(SIZES.large * 1)} />

                  </View>



                  {/* ------------ */}
                  {/*  Totalzão   */}
                  {/* ------------ */}

                  <View style={styles.cartTotalsCheckoutView}>
                  <Text style={[styles.cartTotalsText('semibold'), {color: COLORS.black}]}>
                    {" "}
                    Subtotal
                  </Text>

                  <Text style={[styles.cartTotalsText('semibold'), {color: COLORS.black}]}>R$ {cartTotal}</Text>
                  <View style={styles.lineDivTop(SIZES.large * 1)} />

                  </View>


                </View>
              }
            />
          </>
        )}

        {select === false ? (
          <View></View>
        ) : (
          <Button title={"Checkout"} onPress={() => {}} isValid={select} />
        )}
      </View>
    </View>
  );
};

export default Cart;
