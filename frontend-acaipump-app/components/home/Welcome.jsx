import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import styles from "../../constants/styles"
import { Feather, Ionicons } from "@expo/vector-icons"
import { COLORS, SIZES } from '../../constants/index'
import { useNavigation } from "@react-navigation/native"
import Carroussel from './Carroussel'

const Welcome = () => {

  const navigation = useNavigation();
  
  return (

    <SafeAreaView>

    <View style={styles.container}>
      <Text style={styles.welcomeTxt}>Find the Most</Text>
      <Text style={styles.welcomeTxt2}>Luxurious Furniture</Text>
    </View>

    <View style={styles.searchContainer}>
    <TouchableOpacity>
      <Feather name="search" size={SIZES.medium + 5} style={styles.searchIcon}/>
    </TouchableOpacity>

    <View style={styles.searchWrapper}>
      <TextInput
      style={styles.searchInput}
      value=""
      placeholder="What you are looking for?"
      onPressIn={() => navigation.navigate("Search")} />
    </View>

    <View>
      <TouchableOpacity style={styles.searchRightBtn}>
        <Ionicons name="camera-outline" 
        color={COLORS.secondary3}
        size={SIZES.medium + 8}
        />
      </TouchableOpacity>
    </View>
    </View>

  
    </SafeAreaView>

    
  )
}

export default Welcome