import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SIZES } from '../theme';
const FadeBlack = () => {
  return (
    <View style={{height: SIZES.xxLarge *5, width: '100%', position:'absolute', zIndex: 1}}>
      <LinearGradient
        colors={['rgba(68, 33, 87,1)', 'rgba(0,0,0,0.0)']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
      />
    </View>
  )
}

export default FadeBlack