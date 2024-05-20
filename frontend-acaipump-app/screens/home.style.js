import { StyleSheet, Platform } from "react-native";
import { COLORS, SIZES } from "../constants/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: COLORS.primary3,
    
  },
  textStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
    paddingBottom: SIZES.large * 0.5,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  entregarEm: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    color: COLORS.offwhite,
  },

  locationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.secondary3,
    padding: SIZES.xSmall * 0.6,
    borderRadius: SIZES.small,
  },

  location: {
    fontFamily: "semibold",
    fontSize: SIZES.small,
    color: COLORS.offwhite,
  },
  cartCount: {
    position: "absolute",
    bottom: SIZES.xSmall * 0.5,
    left: SIZES.xSmall,
    width: SIZES.large * 0.8,
    height: SIZES.large * 0.8,
    borderRadius: SIZES.large,
    alignItems: "center",
    backgroundColor: COLORS.primary2,
    justifyContent: "center",
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: "semibold",
    fontWeight: "600",
    fontSize: 12,
    color: COLORS.primary,
  },
  emptyBottomView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.large *5,
  },
  emptyBottom: {
    width: SIZES.large *10,
    height: SIZES.large * 10,
  },
  emptyBottomText: {
    fontFamily: "semibold",
    fontSize: SIZES.small,
    color: COLORS.primary3,
  },

});

export default styles;
