import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Image,
  Touchable,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import styles from "../constants/styles";
import { SIZES, COLORS } from "../constants/index";
import fetchCart from "../hook/fetchCart";
import { Button, CartTile, ClosedMessage } from "../components";
import { LogoSymbol, Oops } from "../assets/images/SVG/SvgIndex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

// -------------------------------------- //

const Cart = ({ navigation }) => {
  // -------------------------------------- //
  //                                        //
  //      Fetch Cart Items and States       //
  //                                        //
  // -------------------------------------- //

  const { data, loading, error, refetch } = fetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const deliveryFee = 10.0;

  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  // -------------------------------------- //
  //                                        //
  //      Subtotal + Total Functions        //
  //                                        //
  // -------------------------------------- //

  const subtotal = useMemo(() => {
    return cartItems
      .reduce((total, item) => total + item.cartItem.price * item.quantity, 0)
      .toFixed(2);
  }, [cartItems]);

  useEffect(() => {
    const newTotalCart = (parseFloat(subtotal) + deliveryFee).toFixed(2);
    setCartTotal(newTotalCart);
    AsyncStorage.setItem("cartTotal", newTotalCart);
  }, [subtotal, deliveryFee]);

  const updateCartItem = (updatedItem) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
  };

  // -------------------------------------- //
  //                                        //
  //      Check if User is Logged In        //
  //                                        //
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
  //                                        //
  //  Stripe Checkout Functions and States  //
  //                                        //
  // -------------------------------------- //

  const [paymentUrl, setPaymentUrl] = useState(null);

  const createCheckOut = async () => {
    const id = await AsyncStorage.getItem("id");

    const totalAmount = parseFloat(subtotal) + deliveryFee;

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
      },
    );
    const { url } = await response.json();
    setPaymentUrl(url);
  };

  const handleBuy = () => {
    console.log("Is Logged In:", isLoggedIn);
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

  // ------------------------------------------- //
  //                                             //
  //  Modal Calendar Functions and Declarations  //
  //                                             //
  // ------------------------------------------- //

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY-MM-DD",
  );

  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(startDate);

  const handleCalendarOpen = () => {
    setOpenCalendar(!openCalendar);
  };

  const handleChangeDate = (propDate) => {
    setDate(propDate);
  };

  const customDatePickerConfigs = {
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    selectedFormat: "YYYY/MM/DD",
    dateFormat: "YYYY/MM/DD",
    monthYearFormat: "YYYY MM",
    timeFormat: "HH:mm",
    hour: "Hora",
    minute: "Minuto",
    timeSelect: "Select",
    timeClose: "Close",
  };

  // Select Time Slot

  const [selectedTime, setSelectedTime] = useState(null);

  const handleSelectedTime = (timeSlot) => {
    console.log(timeSlot);
    setSelectedTime(timeSlot);
  };


  // ------------------------------------------- //
  //                                             //
  //  We are CLOSED - schedule - Functions Decl  //
  //                                             //
  // ------------------------------------------- //





  // -------------------------------------- //
  //                                        //
  //          Component Return              //
  //                                        //
  // -------------------------------------- //

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
            ) : cartItems.length === 0 ? ( 
              

                      // --------------------------------------- //
                      // Empty State - Cart without items        //
                      // --------------------------------------- //


                      <View style={styles.emptyStateView}>

                      <Oops />

                      <Image
                        style={styles.emptyStateImage}
                        source={require("../assets/images/oops-sacolavazia.jpg")}
                      />

                      <Text style={styles.emptyStateText}>
                      {`\n`}{`\n`}
                        Você ainda não marcou {`\n`} nenhum item como favoritos.
                      </Text>

                      {/* --------------- */}
                      {/* CTA Button Row  */}
                      {/* --------------- */}

                          <View style={styles.emptyStateButton}>
                            <TouchableOpacity style={styles.pdCtaBtn} onPress={() => navigation.navigate('ProductsList')}>
                              <Text style={styles.pdCtaBtnText}>Escolher Produtos</Text>
                            </TouchableOpacity>
                          </View>



                      </View>

              
            ) : (
              <>
                {/* ------------------- */}
                {/*      Flat List      */}
                {/* ------------------- */}

                <FlatList
                  data={data}
                  contentContainerStyle={[
                    styles.pgvFlatList,
                    {
                      marginTop: -SIZES.xSmall,
                      paddingBottom: SIZES.large * 6,
                    },
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
                  //                     //
                  //  Header FlatList    //
                  //  Empty States       //
                  //  Oops - Endereço    //
                  //  Oops - Horár       //
                  //                     //
                  //  ------------------ //

                  ListHeaderComponent={
                    <>

                      {/* --------------------------------------- */}
                      {/* Empty State - wrong address Button Row  */}
                      {/* --------------------------------------- */}

                      <View style={styles.cartEmptyStateView}>
                        <View
                          style={{
                            alignSelf: "flex-start",
                            marginLeft: SIZES.xSmall * 0.1,
                          }}
                        >
                          <Oops />
                        </View>

                        <View style={styles.cartEmptyStateTextImageRow}>
                          <View style={styles.cartEmptyStateTextView}>
                            <Text style={styles.cartEmptyStateText}>
                              Parece que você ainda não cadastrou seu endereço
                              de entrega ou Infelizmente ainda não entregamos na
                              sua região.
                            </Text>
                          </View>

                          <Image
                            style={styles.cartEmptyStateImage}
                            source={require("../assets/images/oops-endereco-nao-entrega.jpg")}
                          />
                        </View>

                        {/* --------------- */}
                        {/* CTA Button Row  */}
                        {/* --------------- */}

                        <View style={styles.cartEmptyStateButtonView}>
                          <TouchableOpacity
                            style={styles.cartEmptyStateCtaBtn}
                            onPress={() => navigation.navigate("Profile")}
                          >
                            <Text style={styles.cartCtaBtnText}>
                              Ir para o perfil e mudar endereço
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* --------------------------------------- */}
                      {/* Empty State - We are closed Schedule    */}
                      {/* --------------------------------------- */}

                      <ClosedMessage />


                      <View style={styles.cartEmptyStateView}>
                        <View
                          style={{
                            alignSelf: "flex-start",
                            marginLeft: SIZES.xSmall * 0.1,
                          }}
                        >
                          <Oops />
                        </View>

                        <View style={styles.cartEmptyStateTextImageRow}>
                          <View style={styles.cartEmptyStateTextView}>
                            <Text style={styles.cartEmptyStateText}>
                              Nossa entrega funciona de terça a domingo, das
                              10:00 às 17:00.{" "}
                              <Text
                                style={[
                                  styles.cartEmptyStateText,
                                  {
                                    color: COLORS.primary3,
                                    fontFamily: "semibold",
                                  },
                                ]}
                              >
                                Que tal agendar para a próxima hora disponível?
                              </Text>
                            </Text>
                          </View>

                          <Image
                            style={styles.cartEmptyStateImage}
                            source={require("../assets/images/oops-foradehora.jpg")}
                          />
                        </View>

                        {/* --------------------- */}
                        {/*     Calendar Modal    */}
                        {/* --------------------- */}

                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={openCalendar}
                          onRequestClose={() => handleCalendarOpen()}
                        >
                          <View style={styles.cartModalCenteredView}>
                            <View style={styles.cartModalInnerView}>
                              {/*------ Button CLOSE Modal ------*/}

                              <TouchableOpacity
                                style={styles.cartCalendarCloseButton}
                                onPress={handleCalendarOpen}
                              >
                                <Ionicons
                                  name="close-circle"
                                  size={SIZES.large * 1.2}
                                  color={COLORS.gray}
                                />
                              </TouchableOpacity>

                              <DatePicker
                                mode="calendar"
                                minimumDate={startDate}
                                selected={date}
                                onDateChanged={handleChangeDate}
                                configs={customDatePickerConfigs}
                                options={{
                                  backgroundColor: COLORS.lightWhite,
                                  textHeaderColor: COLORS.primary,
                                  textDefaultColor: COLORS.gray,
                                  selectedTextColor: COLORS.white,
                                  mainColor: COLORS.primary,
                                  textSecondaryColor: COLORS.gray,
                                  borderColor: COLORS.gray2,
                                }}
                              />

                              {/*     Select Time    */}

                              <View style={styles.cartCalendarTimeView}>
                                <TouchableOpacity
                                  style={[
                                    styles.cartCalendarHourButton,
                                    selectedTime === "9:00-12:00" &&
                                      styles.cartCalendarHourButtonSelected,
                                  ]}
                                  onPress={() =>
                                    handleSelectedTime("9:00-12:00")
                                  }
                                >
                                  <Text
                                    style={[
                                      styles.cartCalendarHourButtonText,
                                      selectedTime === "9:00-12:00" && {
                                        color: COLORS.primary,
                                        fontFamily: "semibold",
                                      },
                                    ]}
                                  >
                                    9:00-12:00
                                  </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={[
                                    styles.cartCalendarHourButton,
                                    selectedTime === "13:00-17:00" &&
                                      styles.cartCalendarHourButtonSelected,
                                  ]}
                                  onPress={() =>
                                    handleSelectedTime("13:00-17:00")
                                  }
                                >
                                  <Text
                                    style={[
                                      styles.cartCalendarHourButtonText,
                                      selectedTime === "13:00-17:00" && {
                                        color: COLORS.primary,
                                        fontFamily: "semibold",
                                      },
                                    ]}
                                  >
                                    13:00-17:00
                                  </Text>
                                </TouchableOpacity>
                              </View>

                              {/*------ Button SELECT DATA E HORA ------*/}

                              <TouchableOpacity
                                style={styles.cartCalendarConfirmButton}
                                onPress={handleCalendarOpen}
                              >
                                <Text
                                  style={styles.cartCalendarConfirmButtonText}
                                >
                                  Selecionar data e hora
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>

                        {/*------ Button Open Calendar ------*/}

                        <View style={styles.cartCalendarButtonView}>
                          <TouchableOpacity
                            style={styles.cartCalendarBtn}
                            onPress={handleCalendarOpen}
                          >
                            <Text style={styles.cartCalendarBtnText}>
                              Escolher data e hora
                            </Text>
                            <View style={styles.cartCalendarIcon}>
                              <Ionicons
                                name="calendar"
                                size={SIZES.large}
                                color={COLORS.primary}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>

                        {/*     Render Schedule Picked    */}

                        <View style={styles.cartRenderDeliverySchedule}>
                          <Text
                            style={[
                              styles.cartCalendarTextView,
                              styles.cartEmptyStateText,
                            ]}
                          >
                            Selecione uma data e horário
                          </Text>
                          <Text
                            style={[
                              styles.cartEmptyStateText,
                              {
                                color: COLORS.primary3,
                                fontFamily: "semibold",
                                textAlign: "right",
                              },
                            ]}
                          >
                            Entrega agendada para:
                          </Text>
                          <Text
                            style={[
                              styles.cartEmptyStateText,
                              {
                                color: COLORS.red,
                                fontFamily: "semibold",
                                textAlign: "right",
                              },
                            ]}
                          >
                            Terça-feira, 21, 13:00-17:00
                          </Text>
                        </View>
                      </View>
                    </>
                  }
                  //  ------------------ //
                  //                     //
                  //  Footer Flatlist    //
                  //  SubTotal Total     //
                  //  Delivery Fee       //
                  //                     //
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
                        {/*  Totalzão    */}
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

                              {/* <View style={styles.pgvCtaBtnRow}>
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
                              </View> */}
                    </>
                  }
                />
              </>
            )}

            { cartItems.length > 0 ?  (
              //  ------------------------ //
              //                           //
              //  Checkout Bottom Section  //
              //                           //
              //  ------------------------ //

              <>
                <View style={styles.cartCheckoutBottomContainer}>
                  <View style={styles.cartCheckoutBottomView}>
                    <View style={styles.cartCheckoutBottomRow}>
                      <View style={styles.cartCheckoutRenderPriceColumn}>
                        <Text style={[styles.ctSubtitle, {fontSize: SIZES.small * 0.7}]}>Total:</Text>

                      <View style={styles.pcvtPriceView}>
                        <Text style={styles.pdCurrencySign}>
                          R$ <Text style={styles.cartCheckoutRenderPriceText}>{cartTotal}</Text>
                         </Text>
                        </View>
                      </View>



                      <View style={styles.cartCheckoutButtonView}>

                        <TouchableOpacity style={styles.cartCheckoutButtonWrapper} onPress={handleBuy}>
                          <Text style={styles.cartCheckoutButtonText}>
                            Checkout
                          </Text>

                          <Ionicons
                            name="arrow-forward-outline"
                            size={SIZES.large}
                            color={COLORS.white}
                          />
                        </TouchableOpacity>

                      </View>
                    </View>
                  </View>
                </View>


                
                <SafeAreaView style={styles.pgvBottomSafeArea}>
                  <View style={{ paddingTop: SIZES.large * 1.5 }} />
                </SafeAreaView>
              </>
            ) : (
              <View></View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Cart;
