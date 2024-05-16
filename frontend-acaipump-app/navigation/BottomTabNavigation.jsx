import { View, Text, Platform } from 'react-native';
import React from 'react';

import { Home, Profile, Search, Testes, Orders } from "../screens/index"
import { Ionicons } from "@expo/vector-icons"
import { SIZES, COLORS } from "../constants/index"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: true,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        ...Platform.select ({
            ios: {
            },
            android: {
                paddingBottom: SIZES.small,
            }
        }),
        
        right: 0, 
        left: 0,
        elevation: 0,
        height: SIZES.medium * 5,
    },

}

const BottomTabNavigation = () => {
  return (

    <Tab.Navigator screenOptions={screenOptions}>

        <Tab.Screen 
            name="Home"
            component={Home}
            options={{
                tabBarIcon: ({focused}) => {
                    return (

                        <Ionicons 
                        name={ focused ? "home" : "home-outline"}
                        size={24}
                        color={focused ? COLORS.primary : COLORS.gray2 } />

                    )
                },
            }} />


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
                }} />


                <Tab.Screen 
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <Ionicons name={focused ? "person-circle" : "person-circle-outline"}
                                size={24}
                                color={focused ? COLORS.primary : COLORS.gray2} />
                            )
                        }
                    }} />


                    <Tab.Screen 
                    name="Orders"
                    component={Orders}
                    options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <Ionicons name={focused ? "bag" : "bag-outline"}
                                size={24}
                                color={focused ? COLORS.primary : COLORS.gray2} />
                            )
                        }
                    }} />


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
                    }} />

    </Tab.Navigator>

  )
}

export default BottomTabNavigation;