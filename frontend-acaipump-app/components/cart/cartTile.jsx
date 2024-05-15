import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../../constants/styles'
import { SIZES, COLORS} from '../../constants'
import { AntDesign } from '@expo/vector-icons'

const CartTile = ({item, onPress, select}) => {
  return (
    
    <TouchableOpacity style={styles.ctContainer(!select ? COLORS.white : COLORS.secondary)}
        onPress={onPress}
    >

        <View style={styles.ctImageContainer}>
            <Image
                source={{uri: item.cartItem.imageUrl}} 
                style={styles.ctImage}
            />
        </View>

        <View style={styles.ctTextContainer}>
            <Text numberOfLines={1} style={styles.ctTitle}>{item.cartItem.title}</Text>
            <Text numberOfLines={1} style={styles.ctSubtitle}>{item.cartItem.subtitle}</Text>
            <Text numberOfLines={1} style={styles.ctUnity}>{item.cartItem.unity} unidades</Text>
            <Text numberOfLines={1} style={styles.ctPrice}>$ {item.cartItem.price} * {item.quantity}</Text>
        </View>

        <TouchableOpacity
            style={{paddingBottom: SIZES.large, paddingLeft: SIZES.large}}
            onPress={() => {}}
        >
            <AntDesign 
                name='delete'
                size={SIZES.large}
                color={COLORS.red}
            />

        </TouchableOpacity>

    </TouchableOpacity>

  )
}

export default CartTile;