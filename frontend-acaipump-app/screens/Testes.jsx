import { View, Text, SafeAreaView, Button, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { useSharedValue, withSpring, withTiming, useAnimatedProps } from 'react-native-reanimated'
import { Svg, Circle } from 'react-native-svg'
import { COLORS, SIZES } from '../constants'
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import DragSwipeComponent from './Ball'
const Testes = () => {



  return (  
    

        <DragSwipeComponent />

       

    
  )
}



export default Testes