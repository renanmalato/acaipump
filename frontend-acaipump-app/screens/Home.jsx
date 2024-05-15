import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import styles from "./home.style"
import { Ionicons, Fontisto } from "@expo/vector-icons"
import { Welcome, Carroussel, Headings, ProductsRow, CtaButton } from "../components/index"
import { SIZES, COLORS } from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

const Home = () => {

  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser)
        setUserData(parseData)
        setUserLogin(true)
      } 
    } catch (error) {
      console.log("Error retrieving the data:", error)
    }
    
  }





  return (
    
    <SafeAreaView style={styles.safeAreaView}>

      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>

          <Ionicons name='location-outline' size={24} />
          <Text style={styles.location}> { userData ? userData.location : 'User not logged in' } </Text>

          <View style={{alignItems: "flex-end"}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name='shopping-bag' size={26}/>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      {/* Wrapped Components */}

      <ScrollView>
        <Welcome />
        <Carroussel />
        <Headings />
        <ProductsRow />

      </ScrollView>
      <View style={{bottom: SIZES.large *6}}>


        {/* --------------- */}
        {/* CTA Button Row  */}
        {/* --------------- */}
{/* 
        <View style={styles.pgvCtaBtnRow}>
        <TouchableOpacity style={styles.pdCtaBtn} onPress={() => {}}>
          <Text style={styles.pdCtaBtnText}>Pedir Açaí</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pdCtaCart} onPress={() => AddToCart(item._id, count )}>
          <Fontisto
            name="shopping-bag"
            size={SIZES.large} 
            color={COLORS.secondary2}
          />
          </TouchableOpacity>
        </View> */}


      </View>
    </SafeAreaView>

  )
}

export default Home;