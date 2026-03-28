import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../Screens/Intro/Index';
import Login from '../Screens/Login/Index';
import Signup from '../Screens/Signup/Index';
import Forgotpassword from '../Screens/Forgotpassword/Index';
import Home from '../Screens/Home/Index';
import BottomNav from './BottomNav';
import Category from '../Screens/Category';
import CodeVerification from '../../Src/Screens/CodeVerification/Index';
import auth, { firebase } from '@react-native-firebase/auth';
const Stack = createNativeStackNavigator();
export default function StackNav() {
    const [user, setUser] = useState(auth().currentUser?.uid)
    const soo = firebase.auth().currentUser?.uid
    console.log('000000000', soo)
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ?
                <>
                    <Stack.Screen name='BottomNav' component={BottomNav} />

                </> :
                <>
                    <Stack.Screen name="Intro" component={Intro} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
                    <Stack.Screen name='CodeVerification' component={CodeVerification} />
                    <Stack.Screen name='BottomNav' component={BottomNav} />
                    {/* <Stack.Screen name="Home" component={Home} /> */}
                    <Stack.Screen name='Category' component={Category} />
                </>
            }
        </Stack.Navigator>
    )
} 