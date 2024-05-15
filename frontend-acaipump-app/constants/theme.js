import { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');

const androidWidthRatio = 0.9;

const COLORS = { 
    primary: "#7D12D9",
    primary2: "#91FE4C",
    secondary: "#BEFBD6",
    secondary2: "#D4B4FF",
    secondary3: "#829cb0",
    tertiary: "#FF7754",

    gray: "#83829A",
    gray2: "#C1C0C8",

    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#e81e4d",
    green: "#00C135",
    lightWhite: "#f0ebf2",
};

const SIZES = {
    xSmall: width / 32,
    ...Platform.select ({
        ios: {
            small: width / 28,

        },
        android: {
            small: width / 29 * androidWidthRatio,

        },
    }),
    medium: width / 26,
    large: width / 16,
    xLarge: width / 14,
    xxLarge: width / 12,
    height,
    width,
}

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};

export { COLORS, SIZES, SHADOWS }