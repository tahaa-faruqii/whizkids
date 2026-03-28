import { Alert, Image, ImageBackground, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../Components/CustomText'
import Textinput from '../../Components/Textinput'
import CustomButton from '../../Components/CustomButton'
import CustomTextInput from '../../Components/Textinput'
import styles from './styles'
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux'

import firestore from '@react-native-firebase/firestore';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import colors from '../../Assets/colors'
const Signup = ({ navigation }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fullname, setFullName] = useState()
    const theme = useSelector(state => state.theme);

    const signup = async () => {
        if (email && password) {
            try {
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user; // Get the user object from userCredential

                console.log('uid----------->>>>>>>>>>>>>', user.uid);

                // Rest of your code
                firestore().collection('user').doc(user.uid).set({
                    email,
                    fullname,
                    uid: user.uid, // Set the UID from the user object
                    password
                });
                navigation.navigate("Login")
                // Rest of your code
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
            }
        }
    }
    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            auth().signInWithCredential(googleCredential);



        } catch (error) {
            console.log('error ==>>', error);
        }

    }
    const navigateToHomeScreen = () => {
        if (signInWithGoogle) {
            navigation.navigate('Home')
        }
        else {
            Alert.alert("pls try again")
        }
    }
    // useEffect(() => {
    //     const getFCMToken = async () => {
    //         try {
    //             const fcmToken = await messaging().getToken();
    //             if (fcmToken) {
    //                 console.log('FCM Token:', fcmToken);
    //                 // Use this token to send notifications to the device
    //             } else {
    //                 console.log('No FCM token available');
    //             }
    //         } catch (error) {
    //             console.error('Error obtaining FCM token:', error);
    //         }
    //     };

    //     // Call the function to obtain the FCM token
    //     getFCMToken();

    // },
    //     [])
    const containerStyle = theme.mode === 'light' ? colors.container_light : colors.container_dark;
    const textStyle = theme.mode === 'light' ? colors.light.white : colors.dark.white;
    return (
        <View style={containerStyle}>
            <KeyboardAvoidingView>

                <ImageBackground resizeMode='center' source={require('../../Assets/images/logo.png')}>

                    <View style={styles.image_container}>
                        <Image source={require('../../Assets/images/4581.png')} style={styles.image} />
                        <View style={{ paddingTop: 10 }}>
                            <CustomText variant={'heading'} children={'Signup'} color={textStyle} />
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.textinput_container}>
                    <View style={styles.textinput}>
                        <CustomText variant={'simple'} children={'FullName'} style={styles.inputText} color={textStyle} />
                        <CustomTextInput placeholder={'Fullname'} style={{ paddingTop: 10, width: '100%' }} value={fullname} onChangeText={(text) => setFullName(text)} placeholderTextColor={textStyle} />
                    </View>
                    <View style={styles.textinput}>
                        <CustomText variant={'simple'} children={'Email'} style={styles.inputText} color={textStyle} />
                        <CustomTextInput placeholder={'Email'} style={{ paddingTop: 10, width: '100%' }} value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={textStyle} />
                    </View>
                    <View style={styles.textinput}>
                        <CustomText variant={'simple'} children={'Password'} style={styles.inputText} color={textStyle}
                        />
                        <CustomTextInput placeholder={'Password'} style={{ paddingTop: 10, width: '100%' }}
                            secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor={textStyle} />
                    </View>
                </View>
                <View style={[styles.button_container, { bottom: 20 }]}>
                    <CustomButton label={'Signup'} onPress={signup} color={textStyle} borderColor={textStyle} />
                </View>
                <View style={{ alignItems: "center", bottom: 10 }}>

                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={navigateToHomeScreen}
                    // disabled={this.state.isSigninInProgress}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Signup

