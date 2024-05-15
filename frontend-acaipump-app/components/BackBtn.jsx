import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SIZES, COLORS } from '../constants'

const BackBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backBtn}>

        <Ionicons 
            name="chevron-back-circle"
            size={SIZES.large * 1.3}
            color={COLORS.primary}
        />

    </TouchableOpacity>
  )
}

export default BackBtn

const styles = StyleSheet.create ({
    backBtn: {
        alignItems: 'center',
        position: "absolute",
        zIndex: 999,
        top: SIZES.large * 0.1,

    }
})