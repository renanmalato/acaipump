import { StyleSheet, Platform, Animated, ImageBackground } from "react-native";
import { COLORS, SHADOWS, SIZES } from "./index";

const styles = StyleSheet.create({



  // ----------------------- //
  //   Welcome Page Styles   //
  // ----------------------- //

  container: {
    width: "100%",
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.large,
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
  logoWrapper: {
    backgroundColor: COLORS.primary3,
    marginTop: -SIZES.large,
    paddingHorizontal: SIZES.large,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logo: {
    width: SIZES.large * 8,
    height: SIZES.large * 4,
    top: SIZES.xSmall * 0.5,
  },
  raioBranco: {
    width: SIZES.large *4,
    height: SIZES.large *4,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: SIZES.large,
  },
  topHelloContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  helloUserData:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', 
    width: SIZES.large * 7,
},
  helloUserText: {
    fontFamily: 'regular',
    fontSize: SIZES.xSmall,
    color: COLORS.gray,
  },



  // ----------------------------- //
  //                               //
  //  Bottom Tab Navigation.JSX    //
  //  bTnav = BottomTabNavigation  //
  //                               //
  // ----------------------------  //

  bTnavProductsIcon: {
    marginBottom: SIZES.large * 1.5,
    ...SHADOWS.medium,
    shadowColor: COLORS.black,
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


  // ------------------------- //
  // ProductCardViewTiles.JSX  //
  //                           //
  //   pcvt = SearchTile         //
  //                           //
  // ------------------------- //

  pcvtContainer: {
    marginHorizontal: SIZES.small,
  },
  pcvtCardView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
    flexDirection: 'row',
    paddingLeft: SIZES.medium,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    ...SHADOWS.large,
    shadowColor: COLORS.primary,
  },

  pcvtCardCartView:(backgroundColor) => ({
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
    flexDirection: 'row',
    paddingLeft: SIZES.medium,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: backgroundColor,
    ...SHADOWS.large,
    shadowColor: COLORS.primary,
  }),
  pcvtImage: {
    width: SIZES.large * 4,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pcvtProductImg: {
    width: '100%',
    height: SIZES.large * 4,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  pcvtTextContainer: {
    flex: 1,
    display: 'flex',
    marginHorizontal: SIZES.medium,
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  pcvtProductTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium * 1.1,
    marginBottom: SIZES.xSmall * 0.3,
    color: COLORS.primary,
  },
  pcvtProductSubtitle: {
    fontSize: SIZES.small,
    fontFamily: 'semibold',
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  pcvtProductPrice: {
    fontSize: SIZES.small,
    fontFamily: 'semibold',
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  pcvtButtonContainer: {
    backgroundColor: COLORS.primary3,
    height: '129%',
    width: SIZES.large *3.5,
    paddingHorizontal: 10,
    display: 'flex',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: SIZES.small,
    borderTopEndRadius: SIZES.small,

  },
  pcvtButtonText: {
    fontFamily: 'semibold',
    fontSize: SIZES.small,
    color: COLORS.lightWhite,
    textAlign: 'center',
    marginTop: SIZES.xSmall * 0.5,
  },


  // ----------------------- //
  //   Headings   Styles     //
  // ----------------------- //

  headingsContainerWrapper: {
   flex: 1,
   display: 'flex',
   left: 0,
  },
  headingsContainer: {
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitleView: {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.large * 0.9,
    color: COLORS.primary3,
    paddingLeft: SIZES.large * 2.5,
  },
  headerTitleWhite: {
    fontFamily: "semibold",
    fontSize: SIZES.large * 0.9,
    color: COLORS.white,
    paddingLeft: SIZES.large * 2.5,
  },
  headingLogoSymbolView: {
    width: SIZES.large,
    height: SIZES.large,
    position: 'absolute',
  },
  headingLogoSymbol: {
    width: SIZES.large * 3,
    height: SIZES.large * 3,
    
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
    marginBottom: SIZES.large,
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
    ...SHADOWS.large, 
    shadowColor: COLORS.primary,
    marginBottom: SIZES.large,
    
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
  pdPriceAndUnityWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
    pdUnityView: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SIZES.small,
    },
    pdUnity: {
      fontFamily: 'semibold',
      fontSize: SIZES.xSmall,
      color: COLORS.primary3,
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


  // Product Rating and How Many

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
  pdHowManyView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingTop: SIZES.small,
  },

  pdHowManyText: {
    fontFamily: 'regular',
  },

  // Add to Cart Row
  pdAddToCartRowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.small,
  },
  pdIncrementCartWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdIncrementCartText: {
    fontFamily: 'regular',
    fontSize: SIZES.large * 0.8,
  },
  pdAddToCartButtonView: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.primary3,
    borderRadius: SIZES.xSmall * 0.5,
  },
  pdAddToCartButtonText: {
    fontFamily: 'semibold',
    fontSize: SIZES.small,
    color: COLORS.primary3,
  },

  // Product Description

  pdDescriptionWrapper: {
    marginTop: SIZES.xxLarge * 5.5,
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
    zIndex: 999,
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
    marginBottom: SIZES.xLarge,
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
    height: SIZES.xxLarge * 1.9,
    backgroundColor: COLORS.primary3,
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
    marginBottom: SIZES.large,
  },
  pgvTopSafeArea: {
    flex: 0,
    marginTop: -SIZES.large * 1.2,
    backgroundColor: COLORS.primary3,
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
  },
  separator: {
    height: SIZES.xSmall * 0.1,
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

  cartTotalsCheckoutContainer: {
    marginHorizontal: SIZES.large * 2,
    marginTop: SIZES.large,
    display: 'flex',
    flexDirection: 'column',
    height: 'auto'
  },

  cartTotalsCheckoutView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.large,
  },

  cartTotalsText: (fontFamily) => ({
    fontFamily: fontFamily,
    color: COLORS.gray,
  }),


      // Empty States inside Cart


      cartEmptyStateView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.large * 1.3,
        marginHorizontal: SIZES.large * 1.2,
      },

      cartEmptyStateTextImageRow: {
        flexDirection: 'row',
        marginHorizontal: SIZES.large * 2,
        marginTop: SIZES.medium
      },
      
      cartEmptyStateImage: {
        resizeMode: 'cover',
        width: SIZES.large * 4.5,
        height: SIZES.large * 4.5,
        marginTop: -SIZES.large,
        right: -SIZES.small,
      },

      cartEmptyStateTextView: {
        width: SIZES.large * 8
      },

      cartCalendarTextView: {
        width: '100%'
      },
    
      cartEmptyStateText: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.gray,
      },
    
      cartEmptyStateButtonView: {
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
        width: '120%',
        marginTop: SIZES.large,
      }, 
      
      cartEmptyStateCtaBtn: {
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.xLarge,
        height: SIZES.xxLarge * 1.8,
        borderRadius: SIZES.xSmall,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.primary3,
      },
      cartCtaBtnText: {
        color: COLORS.primary3,
        fontFamily: "semibold",
        fontSize: SIZES.small,
      },

      // Modal
      cartCalendarDatePicker: {
        backgroundColor: COLORS.primary,
      },

      cartModalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.large,
        shadowColor: COLORS.black,
        shadowOpacity: 1,
        shadowRadius: 100,
      },
      cartModalInnerView: {
        backgroundColor: COLORS.lightWhite,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        ...SHADOWS.large,
        shadowColor: COLORS.gray,
        shadowOpacity: 1,
        shadowRadius: 200,
        elevation: 5,
        marginHorizontal: SIZES.large,
        width: SIZES.width * 0.9,
      },

      
      cartCalendarButtonView: {
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
        width: '120%',
        marginTop: SIZES.large,
      }, 
      
      cartCalendarBtn: {
        backgroundColor: COLORS.primary,
        marginHorizontal: SIZES.xLarge,
        height: SIZES.xxLarge * 1.8,
        borderRadius: SIZES.xSmall,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.primary3,
      },
      cartCalendarBtnText: {
        color: COLORS.white,
        fontFamily: "semibold",
        fontSize: SIZES.small,
      },
      cartCalendarIcon: {
        position: 'absolute',
        right: - SIZES.small * 0.3,
        backgroundColor: COLORS.white,
        padding: SIZES.small * 1.1,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderEndEndRadius: SIZES.small,
        borderTopEndRadius: SIZES.small,
      },
      cartRenderDeliverySchedule: {
        display: 'flex',
        width: '100%', 
        marginBottom: SIZES.large * 3,
      },

      cartCalendarTimeView: {
        display: 'flex',
        flexDirection: 'row',
      },
      cartCalendarHourButton: {
        backgroundColor: COLORS.lightWhite,
        padding: SIZES.small,
        borderRadius: SIZES.large,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginHorizontal: SIZES.small,
      },

      cartCalendarHourButtonSelected: {
        backgroundColor: COLORS.secondary4,
        borderColor: COLORS.primary,
        ...SHADOWS.medium,
        shadowColor: 'blue',
        shadowRadius: SIZES.xSmall,
      },

      cartCalendarHourButtonText: {
        fontFamily: 'regular,',
        fontSize: SIZES.small,
        color: COLORS.gray,
      },

      cartCalendarConfirmButton: {
        marginTop: SIZES.large,
        backgroundColor: COLORS.white,
        padding: SIZES.small,
        width: '100%',
        borderRadius: SIZES.large,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginHorizontal: SIZES.small,
      },

      cartCalendarConfirmButtonText: {
        fontFamily: 'semibold',
        fontSize: SIZES.small,
        color: COLORS.primary,
        textAlign: 'center',
      },

      cartCalendarCloseButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        borderRadius: SIZES.large,
        marginHorizontal: SIZES.small,
      },

      cartCalendarCloseButtonText: {
        fontFamily: 'semibold',
        fontSize: SIZES.small,
        color: COLORS.white,
        textAlign: 'center',
      },
      
      
      // Checkout Bottom

      cartCheckoutBottomContainer: {
        paddingTop: SIZES.small,
        backgroundColor: COLORS.lightWhite,
        ...SHADOWS.large,
        shadowColor: COLORS.primary,
        shadowOffset: {
          width: 0,
          height: -10,
        }
      },

      cartCheckoutBottomView: {
        marginRight: SIZES.large,
        marginLeft: SIZES.small,
        backgroundColor: COLORS.lightWhite,
      },

      cartCheckoutBottomRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.large,
        marginBottom: SIZES.large,
      },

      cartCheckoutRenderPriceColumn: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },

      cartCheckoutRenderPriceText: {
        fontFamily: 'semibold',
        fontSize: SIZES.small * 1.5,
        color: COLORS.black,
      },

      cartCheckoutButtonView:{
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        marginHorizontal: SIZES.xLarge,
        height: SIZES.xxLarge * 1.5,
        borderRadius: SIZES.xSmall,
        justifyContent: "center",
        alignItems: "center",
        width: SIZES.large * 9,      
      },

      cartCheckoutButtonWrapper: {
        display:  'flex',
        flexDirection: 'row',
        alignContent: 'center',
      },

      cartCheckoutButtonText: {
        color: COLORS.lightWhite,
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        paddingHorizontal: SIZES.large,
      },

      
      
      



  // ----------------------- //
  //                         //
  //    CartTile.JSX         //
  //                         //
  //    ct = cartTile        //
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


  ctIncrementCartWrapper: {
    flexDirection: "row",
    backgroundColor: COLORS.lightWhite,

    height: '129%',
    width: SIZES.large *4.5,
    paddingHorizontal: SIZES.large,
    display: 'flex',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: SIZES.small,
    borderTopEndRadius: SIZES.small,
  },
  ctIncrementCartText: {
    fontFamily: 'regular',
    fontSize: SIZES.large * 0.8,
  },


  ctTrashIcon: {

    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    right: 0,
    top: -SIZES.large *6,
    backgroundColor: COLORS.lightWhite,
    position: 'absolute',
    paddingVertical: SIZES.small * 0.6,
    paddingHorizontal: SIZES.small * 0.5,
    borderRadius: SIZES.large,
    
    alignItems: 'center',
    ...SHADOWS.large,
    shadowColor: COLORS.black,
    borderWidth: 0.5,
    borderColor: COLORS.gray2,
  },

  ctTrashText: {
    color: COLORS.red,
    fontFamily: 'medium',
    fontSize: SIZES.small * 0.8,
  },


  // ----------------------- //
  //                         //
  //    Orders.JSX           //
  //                         //
  //    orders = orders      //
  //                         //
  // ----------------------- //


  ordersContainer: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
  },

  ordersTitleRow: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SIZES.width - 50,
    marginBottom: SIZES.large,
  },

  ordersTitleText: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    letterSpacing: 4,
    marginLeft: SIZES.small,
  },
  // ordersContainer: (color) => ( {
  //   flex: 1,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   marginBottom: SIZES.large,
  //   padding: SIZES.small,
  //   borderRadius: SIZES.small,
  //   backgroundColor: color,
  //   ...SHADOWS.medium, 
  //   shadowColor: COLORS.primary,
  //   // marginTop: SIZES.large,
  //   // marginHorizontal: SIZES.large,
  // }),

  ordersImageContainer: {
    width: SIZES.large * 5,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ordersImage: {
    width: '100%',
    height: SIZES.large *5,
    borderRadius: SIZES.medium,
    reszeMode: 'cover',
  },
  ordersTextContainer: {
    flex: 1,
    marginHorizontal: SIZES.large,
  },
  ordersTitle: {
    fontFamily: 'semibold',
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  ordersSubtitle: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  ordersPrice: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  ordersUnity: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },


  
  // ----------------------- //
  //                         //
  //    Empty Bottom         //
  //                         //
  //    Empty States         //
  //                         //
  //    component            //
  //                         //
  // ----------------------- //



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

  emptyStateView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  
  emptyStateImage: {
    resizeMode: 'contain',
    width: SIZES.large * 12,
    marginTop: -SIZES.large * 3,
  },

  emptyStateText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: -SIZES.small,
    textAlign: 'center',
    marginTop: -SIZES.large * 3,
  },

  emptyStateButton: {
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
    width: '100%',
    marginTop: SIZES.large,
  },


  // ---------------------- //
  //                        //
  //   Hacks ˆ%ˆ%&*         //
  //   and General          //
  //                        //
  // ---------------------  //


  lineDiv: (marginBottom) => ({ 
    height: 0.5,
    backgroundColor: COLORS.gray2,
    marginTop: SIZES.large * 1.1,
    marginBottom: marginBottom,
    zIndex: 999,
  }),

  lineDivTop: (marginTop) => ({ 
    height: 1,
    top:0,bottom:0,left:0,right:0,
    backgroundColor: COLORS.gray2,
    marginTop: marginTop,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),

    centerView2: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.black,
    },

    centerText: {
     textAlign: 'center',
    },

    trashIcon: {
      backgroundColor: COLORS.lightWhite,
      position: 'absolute',
      paddingVertical: SIZES.small * 0.6,
      paddingHorizontal: SIZES.small,
      borderRadius: SIZES.xSmall,
      right: 0,
      bottom: -SIZES.small,
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      ...SHADOWS.large,
      shadowColor: COLORS.black,
      borderWidth: 0.5,
      borderColor: COLORS.gray2,
    },

    trashText: {
      color: COLORS.red,
      fontFamily: 'medium',
      fontSize: SIZES.small * 0.8,
    },
    


});

export default styles;
