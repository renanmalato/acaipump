import { TouchableOpacity, Text, View, Image, ScrollView, FlatList  } from "react-native";
import React, { useState } from "react";
import styles from "../constants/styles";
import { COLORS, SIZES } from "../constants/index";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

import Hypher from 'hypher';
import english from 'hyphenation.en-us';
const h = new Hypher(english);
 /* <Text style={styles.pdDescriptionText}>
 {h.hyphenateText("hyphenation text")}
 </Text> */

const NutriFacts = [
  { name: 'Proteínas', id: '1A', value: '12g'},
  { name: 'Calorias', id: '2B', value: '150'},
  { name: 'Carboidratos2', id: '3C', value: '150'},
];

const NutriItem = ({name, value}) => (
  <View style={styles.pdNutriFactsRow}>
  <Text style={styles.pdNutriFactsText}>{name}</Text>
 <Text style={styles.pdNutriFactsText}>{value}</Text>
</View>
);




const ProductDetails = ({ navigation }) => {

  const [count, setCount] = useState(10);

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if(count > 1) {
      setCount(count -1)
    }
  }
  
  // Nutri Facts Render Item

  const renderItem = ({item}) => <NutriItem name={item.name} value ={item.value} />

  return (
    <View style={styles.pdContainer}>

      {/* ---------------------------- */}
      {/*   Top Back and Heart Icons   */}
      {/* ---------------------------- */}

      <View style={styles.pdUpperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={SIZES.xLarge} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart" size={SIZES.xLarge} color={COLORS.primary} />
        </TouchableOpacity>
      </View>


      {/* --------- */}
      {/*   Image   */}
      {/* --------- */}


      <View style={styles.pdImageContainer}>
        <Image
          source={require("../assets/images/acaipump-product-1.jpg")}
          style={styles.pdImage}
        />

        {/* --------- */}
        {/*   Title   */}
        {/* --------- */}

        <View style={styles.pdDetails}>
          <View style={styles.pdTitleRow}>
            <Text style={styles.pdTitle} numberOfLines={2}>Açaí Pump <Text style={styles.pdSubTitle}> {'\n'}Zero Sugar<Text style={styles.pdSize}> 200g</Text></Text></Text>
            <View style={styles.pdPriceWrapper}>
                <Text style={styles.pdCurrencySign}>R$ </Text>
              <Text style={styles.pdPriceInteger}>16</Text>
              <Text style={styles.pdPriceDecimals}>.00</Text>
            </View>
          </View>
        </View>


        {/* ----------------------- */}
        {/*   Rating and Add Cart   */}
        {/* ----------------------- */}

        <View style={styles.pdRatingRow}>
          
          <View style={styles.pdRating}>
            {[1,2,3,4,5].map((index) => (
              <Ionicons
                name='star'
                key={index}
                size={SIZES.large * 0.8}
                color="gold"
              />
            ))}
            <Text style={styles.pdRatingText}>(4.9)</Text>
          </View>

          <View style={styles.pdRating}>
            <TouchableOpacity onPress={()=>increment()}>
              <Ionicons name='add-circle-outline' size={SIZES.large} />
            </TouchableOpacity>

            <Text style={styles.pdRatingText}>   {count}   </Text>

            <TouchableOpacity onPress={()=> decrement()}>
              <Ionicons name='remove-circle-outline' size={SIZES.large} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={{zIndex:-1}}>

        {/* --------------- */}
        {/*   Description   */}
        {/* --------------- */}

         <View style={styles.pdDescriptionWrapper}>
          <Text style={styles.pdDescriptionTitle}>Benefícios </Text>
          <Text style={styles.pdDescriptionText}>Nosso porte de açaí com proteína sem açúcar oferece uma opção deliciosa e saudável. Combinando a energia do açaí, a potência da proteína e sem adição de açúcar, é perfeito para um estilo de vida equilibrado. Desfrute do sabor indulgente do açaí com benefícios nutritivos adicionais.</Text>


      </View>


      {/* --------------- */}
      {/*   Delivery Row  */}
      {/* --------------- */}

      <View style={styles.pdDeliveryRow}>

        <View style={styles.pdLocationWrapper}>
          <View style={styles.pdLocation}>
            <Ionicons name='location-outline' size={SIZES.large} />
          </View>
          <View>
            <Text style={styles.pdLocationText}> Dallas</Text>
          </View>
        </View>

        <View style={styles.pdLocationWrapper}>
          <View style={styles.pdLocation}>
            <MaterialCommunityIcons name='truck-outline' size={SIZES.large} />
          </View>
          <View>
            <Text style={styles.pdLocationText}> Free Delivery  </Text>
          </View>
        </View>

      </View>



                  {/* --------------- */}
                  {/*   Nutri Facts   */}
                  {/* --------------- */}

              <View style={styles.pdNutriFactsWrapper}>
                    <Text style={styles.pdNutriFactsTitle}>Nutricional</Text>

                    <FlatList 
                        data={NutriFacts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id} indicatorStyle='white' 

                    />
                  

              </View>


      </ScrollView>

      {/* --------------- */}
      {/* CTA Button Row  */}
      {/* --------------- */}


      <View style={styles.pdCtaBtnRow}>

        <TouchableOpacity style={styles.pdCtaBtn} onPress={() => {}}>
            <Text style={styles.pdCtaBtnText}>Pedir Açaí</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pdCtaCart} onPress={() => {}}>
            <Fontisto name='shopping-bag' size={SIZES.large} color={COLORS.secondary2} />
        </TouchableOpacity>

      </View>


      </View>
    
  );
};

export default ProductDetails;
