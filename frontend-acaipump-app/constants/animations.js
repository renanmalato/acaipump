import { useState } from 'react';
import { Animated, Easing } from 'react-native';
import { SIZES, COLORS } from './theme';
import { transform } from 'typescript';




   {/* ....................... */}
   {/*                         */}
   {/* Animated Label Function */}
   {/*                         */}
   {/* ....................... */}

export const useAnimatedLabel = () => {

    // Store the State of the Animation
    const [animationValues, setAnimationValues] = useState({
        email: new Animated.Value(0),
        password: new Animated.Value(0),
        username: new Animated.Value(0),
        location: new Animated.Value(0),

    });
        

    // Logiv - What this animation will do?
    const animatedLabelLogic = (field, toValue, value) => {
        // check if input has value
        if (typeof value === 'string' && value.trim() !== '') {
            toValue = 1;
        }
        Animated.timing(animationValues[field], {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    // Styles manipulation
    // Input initial CSS value Output Final CSS Value
    const animatedLabelStyle = (field) => ({

        opacity: animationValues[field].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1]
        }),

        transform: [ 
            { 
                translateY: animationValues[field].interpolate({
                inputRange: [0, 1],
                outputRange: [1, -SIZES.large *1.1]
             }),
            },
        ],

        zIndex: animationValues[field].interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 1],
        }),

        backgroundColor: animationValues[field].interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.lightWhite, COLORS.lightWhite],
        }),

        paddingHorizontal: SIZES.small,

        pointerEvents: 'none',

        color: animationValues[field].interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.black, COLORS.primary]
        }),



    });

    const animatedInputStyle = (field) => ({
        backgroundColor: animationValues[field].interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.lightWhite, COLORS.black],
        }),
    });

    return { animatedLabelLogic, animatedLabelStyle, animatedInputStyle }

};


export const useAnimatedSwipeUp = () => {

    const swipeUpAnimation = useRef(new Animated.Value(0)).current;

    const swipeUpAnimationLogic = () => {
        Animated.timing(swipeUpAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    
    const swipeUpAnimationStyle = () => ({
        marginBottom: animationValues[0].interpolate({
            inputRange: [0, 1],
            outputRange: [SIZES.small, SIZES.large],
        }),
    });
    return { swipeUpAnimation, swipeUpAnimationStyle, swipeUpAnimationLogic }
}