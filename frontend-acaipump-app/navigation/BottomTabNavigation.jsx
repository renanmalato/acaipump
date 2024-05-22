import { View, Text, Platform } from "react-native";
import React from "react";

import {
  Home,
  Profile,
  Search,
  Testes,
  Products,
  Cart,
  Favorites,
} from "../screens/index";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductsIcon, ProductsIconFocused } from "../assets/images/SVG/SvgIndex";
import styles from "../constants/styles";


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarActiveTintColor: COLORS.primary,
  tabBarStyle: {
    position: "absolute",
    ...Platform.select({
      ios: {},
      android: {
        paddingBottom: SIZES.small,
      },
    }),

    right: 0,
    left: 0,
    elevation: 0,
    height: SIZES.medium * 5,
  },
};

const BottomTabNavigation = ({navigation}) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      {/* 
            
                // Search Screen

                <Tab.Screen 
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <Ionicons name={focused ? "search" : "search-outline"}
                            size={24}
                            color={focused ? COLORS.primary : COLORS.gray2} />
                        )
                    }
                }} /> */}

      <Tab.Screen
        name="Favoritos"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Produtos"
        component={Products}
        listeners={{tabPress: e => {e.preventDefault(); navigation.navigate('ProductsList')}}}
        options={{
          tabBarIcon: ({ focused }) => 
            (
                focused ? (
                <ProductsIconFocused 
                style={styles.bTnavProductsIcon} 
                width={SIZES.large * 2.6} 
                height={SIZES.large * 3} 
                /> 
              ) : (
                <ProductsIconFocused 
                style={styles.bTnavProductsIcon} 
                width={SIZES.large * 2.6} 
                height={SIZES.large * 3} 
                />
              )
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{color: focused ? COLORS.gray : COLORS.black, fontSize: SIZES.xSmall * 0.8, }}>Produtos</Text>
            ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        listeners={{tabPress: e => {e.preventDefault(); navigation.navigate('Cart')}}}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "bag" : "bag-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      {/* 

                    // Testes Screen

                    <Tab.Screen 
                    name="Testes"
                    component={Testes}
                    options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <Ionicons name={focused ? "person-circle" : "person-circle-outline"}
                                size={24}
                                color={focused ? COLORS.primary : COLORS.gray2} />
                            )
                        }
                    }} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
