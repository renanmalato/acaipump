import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../../constants/styles'
import { SIZES, COLORS} from '../../constants'
import { AntDesign, Ionicons } from '@expo/vector-icons'; 

const CartTile = ({item, onPress, select}) => {
  return (
    
    
    <View style={styles.pcvtContainer}>
    <TouchableOpacity
      style={styles.pcvtCardView}
      onPress={() =>
        navigation.navigate("ProductDetails", { item })
      }
    >
      <View style={styles.pcvtImage}>
        <Image
          source={{ uri: item.cartItem.imageUrl }}
          style={styles.pcvtProductImg}
        />
      </View>

      <View style={styles.pcvtTextContainer}>
        <Text style={styles.pcvtProductTitle}>{item.cartItem.title}</Text>

        <Text numberOfLines={1} style={styles.pcSubtitle}>
          {item.cartItem.subtitle}
        </Text>

        <Text numberOfLines={1} style={styles.pcUnity}>
          {item.cartItem.unity} unid.
        </Text>

        <View style={styles.pcvtPriceView}>
          <Text style={styles.pdCurrencySign}>
            R$ <Text style={styles.pcPrice}>{item.cartItem.price} * {item.quantity}</Text>
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

  )
}

export default CartTile;