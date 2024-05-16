import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../constants/styles'
import { SIZES, COLORS } from '../constants'
import { AntDesign } from '@expo/vector-icons'

const OrdersTile = ({item}) => {
  return (
    
    <TouchableOpacity style={styles.ctContainer(!select ? COLORS.white : COLORS.secondary)}
        onPress={onPress}
    >

        <View style={styles.ctImageContainer}>
            <Image
                source={{uri: item.imageUrl}} 
                style={styles.ctImage}
            />
        </View>

        <View style={styles.ctTextContainer}>
            <Text numberOfLines={1} style={styles.ctTitle}>{item.productId.title}</Text>
            <Text numberOfLines={1} style={styles.ctSubtitle}>{item.productId.subtitle}</Text>
            <Text numberOfLines={1} style={styles.ctUnity}>{item.productId.unity} unidades</Text>
            <Text numberOfLines={1} style={styles.ctPrice}>$ {item.productId.price} * {item.quantity}</Text>
        </View>

        <TouchableOpacity
            style={{paddingBottom: SIZES.large, paddingLeft: SIZES.large}}
            onPress={() => {}}
        >
            <View></View>

        </TouchableOpacity>

    </TouchableOpacity>

  )
}

export default OrdersTile;