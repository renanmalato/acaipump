import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import styles from "../../constants/styles";
import { SIZES, COLORS } from "../../constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const CartTile = ({ item, onPress, select, updateCartItem }) => {
  console.log(item);

  const [count, setCount] = useState(item.quantity);

  const increment = () => {
    const newQuantity = count + 1;
    setCount(newQuantity);
    const updatedItem = { ...item, quantity: newQuantity };
  
    updateCartItem(updatedItem);
  };

  const decrement = () => {
    if (count > 1) {
      const newQuantity = count - 1;
      setCount(newQuantity);
     const updatedItem = {... item, quantity: newQuantity}
      updateCartItem(updatedItem);
    }
  };

  return (
    <View style={styles.pcvtContainer}>
      <TouchableOpacity
        style={styles.pcvtCardCartView(!select ? "#FFF" : COLORS.secondary)}
        onPress={onPress}
      >
        <View style={styles.pcvtImage}>
          <Image
            source={{ uri: item.cartItem.imageUrl }}
            style={styles.pcvtProductImg}
          />
        </View>

        <View style={styles.pcvtTextContainer}>
          <Text style={styles.pcvtProductTitle}>{item.cartItem.title}</Text>

          <Text numberOfLines={1} style={styles.pcSubtitle}>
            {item.cartItem.subtitle}
          </Text>

          <Text numberOfLines={1} style={styles.pcUnity}>
            {item.cartItem.unity} unid.
          </Text>

          <View style={styles.pcvtPriceView}>
            <Text style={styles.pdCurrencySign}>
              R${" "}
              <Text style={styles.pcPrice}>
                {/*     
              // Show the math - price * quantity = total          
              {`${item.cartItem.price} * ${count} = ${(item.cartItem.price * count).toFixed(2)}`} */}

                {(item.cartItem.price * count).toFixed(2)}
              </Text>
            </Text>
          </View>
        </View>

        {/* ------------------- */}
        {/* Increment Decrement */}
        {/* ------------------- */}

        <View style={styles.ctIncrementCartWrapper}>
          <TouchableOpacity onPress={() => increment()}>
            <Ionicons
              name="add-circle"
              size={SIZES.large * 1.2}
              color={COLORS.gray2}
            />
          </TouchableOpacity>

          <Text style={styles.ctIncrementCartText}> {count} </Text>

          <TouchableOpacity onPress={() => decrement()}>
            <Ionicons
              name="remove-circle"
              size={SIZES.large * 1.2}
              color={COLORS.gray2}
            />
          </TouchableOpacity>
        </View>



        



      </TouchableOpacity>

        {/* ------------------- */}
        {/* Remover da Sacola   */}
        {/* ------------------- */}

        <TouchableOpacity onPress={() => {}}>
          <View style={styles.ctTrashIcon}>
            <Text style={styles.ctTrashText}> </Text>
            <Ionicons
              name="trash"
              size={SIZES.small * 1.2}
              color={COLORS.red}
            />
          </View>
        </TouchableOpacity>

    </View>
  );
};

export default CartTile;
