import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import ProductCardView from './ProductCardView'
import styles from '../../constants/styles'
import useFetch from '../../hook/useFetch'


const ProductsRow = () => {
    const {data, isLoading, error} = useFetch()

  return (
<View style={styles.prContainer}>
    {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
    ) : error ? (
        <Text> Something went wrong</Text>
    ) : (
        <FlatList 
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={
            ({ item }) => (<ProductCardView item={item}/>)
        }
        horizontal
        contentContainerStyle={{
            columnGap: SIZES.large,
            marginLeft: SIZES.medium,
            paddingRight: SIZES.xxLarge,
        }}
    />
    )}
</View>
  )
}

export default ProductsRow;