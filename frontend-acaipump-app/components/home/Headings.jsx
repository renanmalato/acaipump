import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../constants/styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const Headings = () => {

const navigation = useNavigation();

  return (
    <View style={styles.headingsContainer}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Produtos e Packs</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ProductsList")}>
                <Ionicons name='grid' size={SIZES.large} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Headings

