import { StyleSheet, Platform, Animated } from "react-native";
import { COLORS, SHADOWS, SIZES } from "./index";

const styles = StyleSheet.create({
  // ----------------------- //
  //   Welcome Page Styles   //
  // ----------------------- //

  container: {
    width: "100%",
    marginHorizontal: 30,
    top: SIZES.small,
  },
  welcomeTxt: {
    fontSize: SIZES.xxLarge,
    fontFamily: "bold",
  },
  welcomeTxt2: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    color: COLORS.primary,
  },

  // ------------------------- //
  //   ANDROID Safe Area View //
  // ------------------------ //

  safeAreaView: {

    ...Platform.select({
        ios: {

        },
        android: {
            top: + SIZES.large,

        }
    })
  },


  // ----------------------- //
  //   Search Bar Styles     //
  // ----------------------- //

  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small,
    marginHorizontal: SIZES.small,
    marginVertical: SIZES.large,
  },
  searchIcon: {
    color: COLORS.gray2,
    paddingLeft: SIZES.small,
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.large,
    borderRadius: SIZES.small,
    padding: SIZES.large - 5,
    paddingLeft: SIZES.small,
    width: "100%",
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
  },
  searchRightBtn: {
    width: SIZES.xxLarge + 10,
    height: SIZES.xxLarge + 10,
    backgroundColor: COLORS.secondary2,
    borderRadius: SIZES.xSmall - 5,
    justifyContent: "center",
    alignItems: "center",
  },
  searchImage: {
    resizeMode: "contain",
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.5,
    opacity: 0.5,
  },

  // ----------------------- //
  //   SearchTile.JSX        //
  //  Cards render in Search //
  //                         //
  //   st = SearchTile       //
  //                         //
  // ----------------------- //

  stContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
    flexDirection: 'row',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
  },
  slImage: {
    width: SIZES.large * 4,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignContent: 'center',
  },
  slProductImg: {
    width: '100%',
    height: SIZES.large * 4,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  slTextContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  slProductTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'semibold',
    color: COLORS.primary,
  },
  slProductSubtitle: {
    fontSize: SIZES.small,
    fontFamily: 'semibold',
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  slProductPrice: {
    fontSize: SIZES.small,
    fontFamily: 'semibold',
    color: COLORS.gray,
    marginTop: SIZES.small,
  },

  // ----------------------- //
  //   Headings   Styles     //
  // ----------------------- //

  headingsContainer: {
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.large * 0.9,
  },

  // ----------------------- //
  //   Home.JSX              //
  //   Products Cards        //
  //                         //
  //   pc = productCard      //
  //                         //
  //   pr = productRow       //
  //                         //
  // ----------------------- //

  prContainer: {
    marginTop: SIZES.small,
    marginBottom: 300,
  },
  pcContainer: {
    width: SIZES.xxLarge * 5,

    ...Platform.select ({
      ios: {
        height: SIZES.xLarge * 10,
      },
      android: {
        height: SIZES.xLarge * 11,
      },
    }),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
  },
  pcImageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.primary,
    overflow: "hidden",
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  pcImage: {
    resizeMode: "cover",
    // width: "100%",
    height: "100%",
  },
  pcDetails: {
    paddingTop: SIZES.small,
    paddingLeft: SIZES.small,
    paddingRight: SIZES.small,
  },
  pcTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium * 1.1,
    marginBottom: SIZES.xSmall * 0.3,
  },
  pcSubtitle: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: -SIZES.small * 0.3,
  },
  pcUnity: {
    fontFamily: "semibold",
    fontSize: SIZES.small * 0.8,
    color: COLORS.primary,
    marginTop: SIZES.xSmall * 0.3,
  },
  pcPrice: {
    fontFamily: "semibold",
    fontSize: SIZES.medium * 1.2,
  },
  pcAddBtn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.xSmall * 0.8,
    bottom: 0,
    width: "100%",
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
  },
  pcAddBtnTxt: {
    fontFamily: "semibold",
    color: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  // ----------------------- //
  //   ProductDetails.JSX    //
  //                         //
  //  Product Details Styles //
  //                         //
  //   pd = productDetails   //
  // ----------------------- //

  // Product Image

  pdContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  pdWrapper:{
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  pdUpperRow: {
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge * 1.5,
    width: SIZES.width * 0.85,
    zIndex: 999,
  },
  pdImageContainer: {
    height: SIZES.xxLarge * 9,
  },
  pdImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },

  // Product Details
  // Product Title

  pdDetails: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.large,
    borderTopRightRadius: SIZES.large,
  },
  pdTitleRow: {
    top: SIZES.large,
    marginHorizontal: SIZES.xLarge,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    zIndex: 999,
  },
  pdTitle: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  pdSubTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.medium * 1.2,
    color: COLORS.gray,
  },
  pdSize: {
    fontFamily: "regular",
    fontSize: SIZES.small,
  },

  // Product Price

  pdPriceWrapper: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.medium * 0.5,
    paddingHorizontal: SIZES.large,
    borderRadius: SIZES.large,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  pdPriceInteger: {
    fontFamily: "semibold",
    fontSize: SIZES.medium * 1.2,
  },
  pdCurrencySign: {
    fontFamily: "regular",
  },
  pdPriceDecimals: {
    fontFamily: "regular",
  },

  // Product Rating

  pdRatingRow: {
    top: SIZES.medium,
    marginHorizontal: SIZES.large,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  pdRating: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdRatingText: {
    color: COLORS.gray,
    fontFamily: "regular",
  },

  // Product Description

  pdDescriptionWrapper: {
    marginTop: SIZES.xxLarge * 2.5,
    marginHorizontal: SIZES.xLarge,
  },
  pdDescriptionTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.medium * 1.1,
    marginTop: SIZES.xxLarge,
  },
  pdDescriptionText: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    textAlign: "justify",
    lineHeight: SIZES.large * 0.8,
    marginTop: SIZES.small,
  },

  // Product Location Row

  pdDeliveryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SIZES.xLarge,
    backgroundColor: COLORS.secondary,
    marginTop: SIZES.large,
    borderRadius: SIZES.xSmall * 0.8,
  },

  pdLocationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.small,
    height: SIZES.xxLarge * 1.3,
  },
  pdLocation: {},
  pdLocationText: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
  },

  // Product CTA Btn Row

  pdCtaBtnRow: {
    marginVertical: SIZES.small,
    justifyContent: "center",

    ...Platform.select({
      ios: {
        bottom: SIZES.small,
        height: SIZES.xxLarge * 2.2,
      },
      android: {
        bottom: SIZES.xSmall / 10,
        height: SIZES.xxLarge * 1.6,
      },
    }),

    backgroundColor: COLORS.lightWhite,
  },
  pdCtaBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.xLarge,
    height: SIZES.xxLarge * 1.8,
    borderRadius: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  pdCtaBtnText: {
    color: COLORS.lightWhite,
    fontFamily: "semibold",
    fontSize: SIZES.medium,
  },
  pdCtaCart: {
    height: SIZES.xxLarge * 1.8,
    position: "absolute",
    right: SIZES.xLarge,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall,
  },

  // Product Nutri Facts Row

  pdNutriFactsWrapper: {
    paddingHorizontal: SIZES.xxLarge,
    marginTop: SIZES.xLarge,
  },
  pdNutriFactsTitle: {
    fontFamily: "semibold",
    color: COLORS.gray,
  },
  pdNutriFactsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1,
    paddingVertical: SIZES.xSmall,
  },
  pdNutriFactsText: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    color: COLORS.gray,
  },

  // ----------------------- //
  //      Products.JSX       //
  //                         //
  //   Screen Container      //
  //   for Products Grid     //
  //                         //
  //   pg = productGrid      //
  // ----------------------- //

  pgContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  pgvTopWrapper: {
    height: SIZES.xxLarge * 1.3,
    backgroundColor: COLORS.lightWhite,
  },
  pgUpperRow: {
    marginHorizontal: SIZES.xLarge,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: SIZES.width * 0.85,
    zIndex: 999,
  },

  pgScreenTitleContainer: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small * 0.7,
    borderRadius: SIZES.large,
  },
  pgScreenTitle: {
    fontFamily: "semibold",
    backgroundColor: COLORS.primary,
    color: COLORS.lightWhite,
  },

  // ----------------------- //
  //                         //
  //  ProductsGridView.JSX   //
  //        (Components)     //
  //                         //
  //   Grid Exibition        //
  //                         //
  //   pg = productGrid      //
  // ----------------------- //

  pgvLoadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pgvContainer: {
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
  },
  pgvTopSafeArea: {
    flex: 0,
    marginTop: -SIZES.large * 1.2,
    backgroundColor: COLORS.lightWhite,
    ...Platform.select ({
      ios:{}, android: {marginTop: SIZES.large}
    })
  },
  pgvBottomSafeArea: {
    flex: 0,
    marginBottom: -SIZES.large * 2,
    backgroundColor: COLORS.white,
  },
  pgvColumnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: SIZES.large,
  },
  pgvFlatList: {
    top: SIZES.xLarge,
    paddingBottom: 300,
  },
  separator: {
    height: SIZES.small,
  },
  pgvCtaBtnRow: {
    justifyContent: "center",
    bottom: 0,
    ...Platform.select({
      ios: {
        height: SIZES.xxLarge * 2.2,
      },
      android: {
        bottom: SIZES.xSmall / 10,
        height: SIZES.xxLarge * 1.6,
      },
    }),
    backgroundColor: COLORS.white,
  },



  // ----------------------- //
  //                         //
  //    Profile.JSX          //
  //                         //
  // ----------------------- //

  profilePageContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  
  profileCoverImage: {
    height: SIZES.large * 10,
    width: SIZES.width,
    resizeMode: 'cover',
  },

  profileContainer: {
    flex: 1,
    alignItems: "center",
  },

  profileImage: {
    height: SIZES.large * 5,
    width: SIZES.large * 5,
    borderRadius: SIZES.large *10,
    borderWidth: SIZES.xSmall * 0.2,
    borderColor: COLORS.primary,
    resizeMode: 'cover',
    marginTop: -SIZES.large *3,
  },

  profileName: {
    fontFamily: 'bold',
    color: COLORS.primary,
    marginVertical: SIZES.small,
  },

  profilePageCtaBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.xLarge,
    width: SIZES.width * 0.8,
    height: SIZES.xxLarge * 1.8,
    borderRadius: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePageBtnText: {
    color: COLORS.lightWhite,
    fontFamily: "semibold",
    fontSize: SIZES.medium,
  },

  profilePageSecondaryBtn: {
    backgroundColor: COLORS.gray,
    marginHorizontal: SIZES.xLarge,
    width: SIZES.width * 0.8,
    height: SIZES.xxLarge * 1.8,
    borderRadius: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },

  profilePageMenuWrapper: {
    marginTop: SIZES.xxLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.xxLarge,
  },

  profilePageMenuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: 'row',
    paddingVertical: SIZES.large * 0.8,
    paddingHorizontal: SIZES.large *1.2,
    borderColor: SIZES.gray,
  }),

  profilePageMenuText: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    paddingLeft: SIZES.large,
  },


  // ----------------------- //
  //                         //
  //    LoginPage.JSX        //
  //                         //
  //    lp = Login Page      //
  //                         //
  // ----------------------- //

  loginPageContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  loginPageCover: {
    height: SIZES.large * 8,
    width: SIZES.width,
    resizeMode: 'contain',
    marginBottom: SIZES.xxLarge,
  },

  loginPageTitle: {
    fontFamily: 'bold',
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.xxLarge,
  },

  // Text Inputs

  lpFormWrapper: {
    marginBottom: SIZES.large,
    marginHorizontal: SIZES.small * 0.2,
  },


  lpFormLabel: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    backgroundColor: COLORS.lightWhite,
    top: SIZES.small * 1.4,
    textAlign: 'left',
    marginHorizontal: SIZES.large * 1.3,
    zIndex: 0,
    position: 'absolute',
    pointerEvents: 'none',
  },



  lpInputWrapper: (borderColor, borderWidth) => ({
    borderColor: borderColor,
    borderWidth: borderWidth,
    height: SIZES.large *2.5,
    borderRadius: SIZES.small,
    flexDirection: "row",
    paddingHorizontal: SIZES.small,
    alignItems: 'center',
    zIndex: 1,
  }),
  lpTextInputValue: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    flex: 1,
  },
  lpIconStyle: {
    marginRight: SIZES.medium,
  },
  lpErrorMessage: {
    color: COLORS.red,
    fontFamily: 'regular',
    fontSize: SIZES.xSmall,
    marginTop: SIZES.small * 4.5,
    marginLeft: SIZES.small,
    position: 'absolute'
  },

  // Registration

  lpRegistration: {
    marginTop: SIZES.large,
    textAlign: 'center',
  },

  // ----------------------- //
  //                         //
  //    Tests.JSX            //
  //                         //
  //    Reanimated Study     //
  //                         //
  // ----------------------- //


  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },


  // ----------------------- //
  //                         //
  //    Favourites.JSX       //
  //                         //
  //    fav = Favourites     //
  //                         //
  // ----------------------- //


  favContainer: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
  },

  favTitleRow: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SIZES.width - 50,
    marginBottom: SIZES.large,
  },

  favTitleText: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    letterSpacing: 4,
    marginLeft: SIZES.small,
  },
  favTileContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.large,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium, 
    shadowColor: COLORS.primary,
  },
  favTileImageContainer: {
    width: SIZES.large * 5,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favTileImage: {
    width: '100%',
    height: SIZES.large *5,
    borderRadius: SIZES.medium,
    reszeMode: 'cover',
  },
  favTileTextContainer: {
    flex: 1,
    marginHorizontal: SIZES.large,
  },
  favTileTitle: {
    fontFamily: 'semibold',
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  favTileSubtitle: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  favTilePrice: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },


  // ----------------------- //
  //                         //
  //    Cart.JSX             //
  //                         //
  //    Cart = Cart          //
  //                         //
  // ----------------------- //


  favContainer: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
  },

   // ----------------------- //
  //                         //
  //    CartTile.JSX       //
  //                         //
  //    ct = cartTile     //
  //                         //
  // ----------------------- //




  ctTitleRow: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SIZES.width - 50,
    marginBottom: SIZES.large,
  },

  ctTitleText: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    letterSpacing: 4,
    marginLeft: SIZES.small,
  },
  ctContainer: (color) => ( {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.large,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: color,
    ...SHADOWS.medium, 
    shadowColor: COLORS.primary,
    // marginTop: SIZES.large,
    // marginHorizontal: SIZES.large,
  }),

  ctImageContainer: {
    width: SIZES.large * 5,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctImage: {
    width: '100%',
    height: SIZES.large *5,
    borderRadius: SIZES.medium,
    reszeMode: 'cover',
  },
  ctTextContainer: {
    flex: 1,
    marginHorizontal: SIZES.large,
  },
  ctTitle: {
    fontFamily: 'semibold',
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  ctSubtitle: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  ctPrice: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  ctUnity: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },



});

export default styles;
