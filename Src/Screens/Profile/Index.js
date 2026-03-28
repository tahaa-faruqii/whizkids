import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import colors from '../../Assets/colors';
import firestore from '@react-native-firebase/firestore'
import CustomText from '../../Components/CustomText';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import CustomTextInput from '../../Components/Textinput';
// import firestore from '@react-native-firebase/firestore';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import CustomButton from '../../Components/CustomButton';
const Profile = ({ navigation }) => {
    const [value, setValue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('')
    const theme = useSelector(state => state.theme)
    const containerStyle = theme.mode === 'light' ? colors.container_light : colors.container_dark;
    const textStyle = theme.mode === 'light' ? colors.light.white : colors.dark.white;
    const buttonStyles = theme.mode === 'light' ? colors.light.white : colors.dark.activeColor;



    React.useEffect(() => {
        console.log(auth().currentUser?.uid)
        const uid = auth().currentUser?.uid
        console.log(' uid..............>>>>>>>>>>>>>>>>>>', uid)
        console.log('------------->>>>>>', auth().currentUser?.uid)
        firestore().collection('user').doc(uid).get()
            .then((snap) => {
                if (snap) {
                    console.log('snap.data()', snap.data());
                    setUser(snap.data())
                    console.log('user..............>>>>>>>', user)
                }
            })
        // console.log(JSON.stringify(userdata))
    }, []);
    const signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
                // Handle sign-out error if needed
            });
    };
    const Delete = () => {
        console.log(uid)
        firestore()
            .collection('user')
            .doc(uid)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }


    const handleEditProfile = () => {
        setIsEditMode(true)
        setEmail(null)
        setFullName(null)
    }
    const handleSaveProfile = () => {
        // Perform field validations
        if (!fullName || !email || !password) {
            alert('Please fill all the fields');
            return;
        }

        // Update profile data in AsyncStorage
        const updateData = async () => {
            try {
                const updatedValue = {
                    ...user,
                    fullName,
                    email,
                    password,

                };
                firestore.auth().collection('user').doc(uid).update(updatedValue)
                    , then((data) => {
                        console.log(data)
                    })

            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        updateData();
    };

    return (
        <View style={containerStyle}>
            <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
                <Image style={{ height: 80, width: 80, marginLeft: "5%", borderRadius: 60, borderWidth: 2, borderColor: buttonStyles }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTVFM0wW8eBYDUVKiv15WQO7ry2EDxYjff9Q&usqp=CAU' }}>
                </Image>
                <View style={{ top: '5%', margin: 10 }}>
                    {/* <CustomText children={person.fullname} color={buttonStyles} /> */}
                    <CustomText children={user.email} color={buttonStyles} variant={'simple'} />
                    <TouchableOpacity onPress={handleEditProfile} style={{ alignSelf: 'center', borderWidth: 1, width: '50%', height: 40, borderColor: buttonStyles, marginLeft: '40%', top: '50%' }}>
                        <AntIcon name='edit' size={22} color={buttonStyles} style={{ position: "absolute", marginLeft: '2%', marginTop: '5%' }} />
                        <Text style={{ alignSelf: 'center', justifyContent: "center", top: '20%', marginLeft: '15%', color: buttonStyles }}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
            {
                user && (
                    <>
                        <View style={[styles.textinput_container, { marginTop: '10%' }]}>
                            <View style={styles.textinput}>
                                <CustomText variant={'simple'} children={'FullName'} style={styles.inputText} color={textStyle} />
                                <CustomTextInput placeholder={'fullName'} style={{ paddingTop: 10, width: '100%' }}
                                    value={user.fullname}
                                    editable={isEditMode}
                                    placeholderTextColor={textStyle}
                                    onChangeText={(text) => setFullName(text)} />
                            </View>
                            <View style={styles.textinput}>
                                <CustomText variant={'simple'} children={'Email'} style={styles.inputText} color={textStyle} />
                                <CustomTextInput placeholder={'Email'} style={{ paddingTop: 10, width: '100%' }}
                                    value={user.email}
                                    editable={isEditMode}
                                    onChangeText={(text) => setEmail({ text })}
                                    placeholderTextColor={textStyle}
                                />
                            </View>
                            <View style={styles.textinput}>

                            </View>
                        </View>
                    </>
                )

            }
            <View style={{ justifyContent: 'center', alignItems: "center", top: 10 }}>
                <CustomButton label={'Save Profile'} onPress={handleSaveProfile}
                    borderColor={buttonStyles} color={'#fff'} backgroundColor={buttonStyles} fontWeight={'bold'} />
            </View>
            <View style={{ margin: 20, marginVertical: 20, marginTop: '10%' }}>
                <CustomText children={'Signout'} variant={'simple'} color={textStyle} style={{ padding: 5 }} onPress={signout} />
                <CustomText children={'DeleteAccount'} variant={'simple'} color={textStyle} style={{ padding: 5 }} onPress={Delete} />
                <CustomText variant={'simple'} children={'Favourite'} color={textStyle} style={{ padding: 5 }} />
            </View>
        </View>
    )
}

export default Profile

