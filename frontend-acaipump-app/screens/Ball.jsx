import React, { useRef, useState, useEffect } from 'react';
import { View, PanResponder, Animated, Vibration, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook
import Svg, { Path } from 'react-native-svg'
import { raiomask1, raiomask2 } from '../assets/images/SVG/svg';
import { COLORS, SIZES } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { swipeUpAnimation } from '../constants/animations'

import AnimatedReanimated from 'react-native-reanimated';
import { 
useSharedValue, 
useAnimatedStyle,
withSpring,
withTiming,
Easing,
withRepeat,
} from 'react-native-reanimated';



const DragSwipeComponent = ({ navigation }) => {
  const swipeAnimation = useRef(new Animated.Value(0)).current;

  const handleSwipeUp = () => {
    Animated.timing(swipeAnimation, {
      toValue: 1,
      duration: 1000, // Adjust duration here
      useNativeDriver: false
    }).start(() => {
      Vibration.vibrate(); // Trigger haptic feedback
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Reset animation state when the screen comes into focus
      swipeAnimation.setValue(0);
      return () => {}; // Optional cleanup function
    }, [])
  );


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
      {...PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy < -10,
        onPanResponderRelease: handleSwipeUp
      }).panHandlers}
    >

<Text style={{
          position: 'absolute', 
          fontSize: SIZES.small, 
          zIndex: 999, 
          fontFamily: 'regular',
          color: COLORS.lightWhite,
          top: SIZES.large * 4,
          paddingHorizontal: SIZES.large,
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',

          }}>
          Falta pouco...
        </Text>

        <Text style={{
          position: 'absolute', 
          fontSize: SIZES.small *1.2, 
          zIndex: 999, 
          fontFamily: 'semibold',
          color: COLORS.lightWhite,
          top: SIZES.large * 5,
          marginHorizontal: SIZES.xxLarge * 3,
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',

          }}>
          Arrasta pra cima para concluir sua compra!
        </Text>


      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: swipeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']
          }),
          backgroundColor: swipeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.primary2, COLORS.primary2]
          })
        }}
      />

        <Svg
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                transform: [
                  { scale: SIZES.xSmall *0.25 }, // Scale up by a factor of 2
                  { translateX: SIZES.large * 1.5 }, // Translate 200 pixels to the left
                  { translateY: SIZES.large * 8 },
                ],
            }}
        >
            <Path 
                d={raiomask1}
                fill={COLORS.primary}
                stroke={COLORS.primary2}
                strokeWidth={3}
            />
        </Svg>




    </View>
  );
};

export default DragSwipeComponent;
