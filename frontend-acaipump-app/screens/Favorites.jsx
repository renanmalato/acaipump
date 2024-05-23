import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../constants/styles";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";
import { Oops, LogoSymbol } from "../assets/images/SVG/SvgIndex";
import { EmptyBottom, SkeletonLoading } from "../components";
import ContentLoader, { Rect } from "react-content-loader/native";


const Favorites = ({ navigation }) => {
  const [favData, setFavData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  //Substitute UseEffect function and CheckFavorites when you finish styles
  // useEffect(() => {
  //   checkFavorites(); // Fetch data when component mounts
  // }, []);

  // const checkFavorites = async () => {
  //   setIsLoading(true); // Set loading state to true when starting data fetching

  //   const id = await AsyncStorage.getItem("id");
  //   const favoritesId = `favorites${JSON.parse(id)}`;

  //   try {
  //     const favoritesObj = await AsyncStorage.getItem(favoritesId);
  //     if (favoritesObj !== null) {
  //       const favorites = JSON.parse(favoritesObj);
  //       const favList = Object.values(favorites);
  //       setFavData(favList);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false); // Set loading state to false once data fetching is complete
  //   }
  // };


  console.log(favData);

  useEffect(() => {
    // Simulate a delay for testing the skeleton loader
    const timer = setTimeout(() => {
      checkFavorites();
      setIsLoading(false); // Set loading state to false after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        const favList = Object.values(favorites);
        setFavData(favList);
        console.log(favList.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorites = async (product) => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    let productId = product;

    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];
        checkFavorites();
        // navigation.goBack();
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                      <Text style={styles.headerTitleWhite}>Mais Queridos</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* ---------------------------- */}
          {/*           Content            */}
          {/* ---------------------------- */}

          {/* check if it has Content - if it's not show empty state image */}
          {/* ------------------------------------------------------------ */}

          { isLoading? (
            <SkeletonLoading />
          )
          
          : favData.length === 0 ? (
            
            <ScrollView>
              <>
            <View style={styles.emptyStateView}>


              <Oops />

              <Image
                style={styles.emptyStateImage}
                source={require("../assets/images/oops-favoritos.jpg")}
              />

              <Text style={styles.emptyStateText}>
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
            </>
            </ScrollView>
            
          ) : (
            <FlatList
              data={favData}
              contentContainerStyle={[
                styles.pgvFlatList,
                { marginTop: SIZES.large },
              ]}
              ItemSeparatorComponent={() => (
                <View style={[styles.separator, { marginTop: SIZES.large }]} />
              )}
              renderItem={({ item }) => (
                <View style={styles.pcvtContainer}>
                  <TouchableOpacity
                    style={styles.pcvtCardView}
                    onPress={() =>
                      navigation.navigate("ProductDetails", { item })
                    }
                  >
                    <View style={styles.pcvtImage}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.pcvtProductImg}
                      />
                    </View>

                    <View style={styles.pcvtTextContainer}>
                      <Text style={styles.pcvtProductTitle}>{item.title}</Text>

                      <Text numberOfLines={1} style={styles.pcSubtitle}>
                        {item.subtitle}
                      </Text>

                      <Text numberOfLines={1} style={styles.pcUnity}>
                        {item.unity} unid.
                      </Text>

                      <View style={styles.pcvtPriceView}>
                        <Text style={styles.pdCurrencySign}>
                          R$ <Text style={styles.pcPrice}>{item.price}</Text>
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity>
                      <View style={styles.pcvtButtonContainer}>
                        <Ionicons
                          name="add-circle"
                          size={SIZES.large}
                          color={COLORS.lightWhite}
                        />

                        <Text style={styles.pcvtButtonText}>Add à Sacola</Text>
                      </View>
                    </TouchableOpacity>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteFavorites(item.id)}>
                    <View style={styles.trashIcon}>
                      <Text style={styles.trashText}>Remover Favoritos</Text>
                      <Ionicons
                        name="trash"
                        size={SIZES.small * 1.5}
                        color={COLORS.red}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={
                <View>
                  <Text
                    style={[
                      styles.pcSubtitle,
                      {
                        textAlign: "center",
                        marginTop: SIZES.large * 2,
                        marginBottom: SIZES.large,
                      },
                    ]}
                  >
                    {" "}
                  </Text>
                  <EmptyBottom />
                  <Text
                    style={[
                      styles.pcSubtitle,
                      {
                        textAlign: "center",
                        marginTop: SIZES.large * 2,
                        marginBottom: SIZES.large,
                      },
                    ]}
                  >
                    {" "}
                  </Text>
                </View>
              }
            />
          )}
          {/* ---------------------------- */}
          {/*           End Content        */}
          {/* ---------------------------- */}
        </View>
      </View>
    </>
  );
};

export default Favorites;
