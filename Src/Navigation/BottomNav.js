import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../Screens/Home/Index';
import Profile from '../Screens/Profile/Index';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import colors from '../Assets/colors';

const BottomNav = () => {
    // const barStyles = theme.mode == "light" ? colors.light.white : colors.dark.white
    const theme = useSelector(state => state.theme)
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,

            tabBarLabelStyle: {
                fontSize: 16,
            },
            tabBarStyle: {
                marginLeft: "10%",
                // alignItems: 'center',
                position: 'absolute',
                height: '10%',
                paddingBottom: 5,
                borderRadius: 30,
                width: '80%',
                backgroundColor: theme.mode === 'light' ? 'rgba(248, 249, 250, 0.6)' : 'rgba(37, 36, 34, 0.8)',
                bottom: '2%'

            }
        }}>

            <Tab.Screen name="Home" component={Home}
                options={{

                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />

                    ),


                }} />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MIcon name="menu" color={color} size={size} />
                    ),

                }} />
        </Tab.Navigator >
    )
}

export default BottomNav

const styles = StyleSheet.create({})