import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  Platform,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(!isValid ? COLORS.gray : COLORS.primary)}
    >
      {!loader ? (
        <Text style={styles.btnText}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "semibold",
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  btnStyle: (backgroundColor) => ({
    ...Platform.select({
      ios: {
        bottom: SIZES.small,
        height: SIZES.xxLarge * 1.8,
      },
      android: {
        bottom: SIZES.xSmall / 10,
        height: SIZES.xxLarge * 1.6,
      },
    }),
    width: "100%",
    marginVertical: SIZES.large,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
  }),
});
