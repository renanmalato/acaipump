import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native";
import styles from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants/index";
import fetchCart from "../hook/fetchCart";
import { Button, CartTile } from "../components";

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selected, setSelected] = useState(null);
  const [ select, setSelect ] = useState(false);
  
  return (
    <SafeAreaView style={styles.favContainer}>
      <View style={styles.favTitleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={SIZES.large}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.favTitleText}>Cart</Text>
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


    </SafeAreaView>
  );
};

export default Cart;
