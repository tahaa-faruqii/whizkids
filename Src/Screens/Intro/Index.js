import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../Components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../Login/Index'
// import { useNavigation } from '@react-navigation/native'
const Intro = ({ navigation }) => {
    // const navigation = useNavigation();
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // React.useEffect(() => {
    //     getData()
    //     isLoggedIn ? navigation.navigate('Home') : null
    // }, [])
    // const storeData = async () => {
    //     try {
    //         const isLoggedIn = true
    //         const jsonValue = JSON.stringify(isLoggedIn)
    //         await AsyncStorage.setItem('@isLoggedIn', jsonValue)
    //         navigation.navigate('BottomNav')
    //     } catch (e) {
    //         // saving error
    //     }
    // }

    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('@isLoggedIn')
    //         const json_Value = jsonValue != null ? JSON.parse(jsonValue) : null;
    //         console.log('IS LOGGED IN', json_Value)
    //         setIsLoggedIn(json_Value)

    //     } catch (e) {
    //         // error reading value
    //     }
    // }
    return (
        <View style={{ flex: 1 }} >
            <ImageBackground source={require('../../Assets/images/pic1.png')}
                resizeMode='cover' style={{ flex: 1 }}>
                <View style={styles.buttonview_container}>
                    <View style={styles.button_container}>
                        <CustomButton label={'signup'} color={'#18B0C8'} borderColor={'#18B0C8'} fontWeight={'bold'} onPress={() => navigation.navigate('Signup')} />
                        <CustomButton label={'login'} color={'#000'} borderColor={'#18B0C8'} fontWeight={'bold'} onPress={() => navigation.navigate('Login')} backgroundColor={'#18B0C8'} />
                    </View>
                </View>
            </ImageBackground>

        </View>
    )
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonview_container: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20
    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }

})