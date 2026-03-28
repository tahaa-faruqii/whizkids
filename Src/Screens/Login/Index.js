import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../Components/CustomText'
import CustomTextInput from '../../Components/Textinput'
import CustomButton from '../../Components/CustomButton'
import styles from '../Signup/styles'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../../Assets/colors'
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState('')
    const theme = useSelector(state => state.theme);
    console.log(theme)




    const login = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                auth().currentUser
                console.log(user)
                navigation.navigate('Home')
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const containerStyle = theme.mode === 'light' ? colors.container_light : colors.container_dark;
    const textStyle = theme.mode === 'light' ? colors.light.white : colors.dark.white;
    const buttonStyles = theme.mode === 'light' ? colors.light.white : colors.dark.activeColor;
    return (
        <View style={containerStyle}>
            <View style={styles.image_container}>
                <Image source={require('../../Assets/images/logo.png')} style={styles.image} />
                <View style={{ paddingTop: 10 }}>
                    <CustomText variant={'heading'} children={'Login'} color={textStyle} />
                </View>
            </View>

            <View style={styles.textinput_container}>
                <View style={styles.textinput}>
                    <CustomText variant={'simple'} children={'Email'} style={styles.inputText} color={textStyle} />
                    <CustomTextInput placeholder={'Email'} style={{ paddingTop: 10, width: '100%' }} value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={textStyle} />
                </View>
                <View style={styles.textinput}>
                    <CustomText variant={'simple'} children={'Password'} style={styles.inputText} color={textStyle} />
                    <CustomTextInput placeholder={'Password'} style={{ paddingTop: 10, width: '100%' }} value={password} onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        placeholderTextColor={textStyle} />
                </View>
                <View style={{ alignSelf: 'flex-end', right: 20 }}>
                    <CustomText variant={'simple'} children={'ForgetPassword'} onPress={() => navigation.navigate('Forgotpassword')} color={buttonStyles} />

                </View>
            </View>
            <View style={styles.button_container}>
                <CustomButton label={'Login'} onPress={login} fontWeight={'bold'} backgroundColor={buttonStyles}
                    borderColor={buttonStyles} color={'#fff'} />
                {/* <CustomText variant='simple' children={'create an account \t Signup'}
                    onPress={() => navigation.navigate('Signup')} color={textStyle} /> */}
                <Text style={{ marginTop: "10%", color: textStyle }}>Create an account {'\t'} <CustomText children={'Signup'} variant={'simple'} color={buttonStyles} /></Text>
            </View>
        </View>
    )
}

export default Login

