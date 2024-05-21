import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import React, {useState} from "react";
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
  const [ select, setSelect ] = useState(false);
  
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

      {loading 
      ? <ActivityIndicator /> 
      : (
        <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CartTile
            item={item}
            onPress={()=> {setSelect(!select), setSelected(item)}}
            select={select}
          />
        )}
      />
        )}

        {select === false 
        ? (<View></View>) 
        : (
        <Button 
          title={'Checkout'} 
          onPress={() => {}}
          isValid={select}
        />
      )
        }


    </View>
    </View>
  );
};

export default Cart;
