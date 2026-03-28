// import { Button, Image, Modal, StatusBar, StyleSheet, Switch, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { switchMode, } from '../../redux/Action';
// import CustomTextInput from '../../Components/Textinput';
// import CustomText from '../../Components/CustomText';
// import colors from '../../Assets/colors';
// import CustomButton from '../../Components/CustomButton';
// // import { firebase } from '@react-native-firebase/auth';
// import { firebase } from '@react-native-firebase/firestore';
// const Forgotpassword = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [showCodeInput, setShowCodeInput] = useState(false);
//     const [showPasswordInput, setShowPasswordInput] = useState(false);
//     const [code, setCode] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const theme = useSelector(state => state.theme);
//     // Determine container and text styles based on the theme mode.
//     const containerStyle = theme.mode === 'light' ? colors.container_light : colors.container_dark;
//     const textStyle = theme.mode === 'light' ? colors.light.white : colors.dark.white;
//     const sendPasswordResetEmail = (email) => {
//         firebase
//             .auth()
//             .sendPasswordResetEmail(email)
//             .then((user) => {
//                 console.log('Password reset email sent.', user);
//                 // Change the UI to show the code input field
//                 // Set a state variable to indicate the change in UI (e.g., `showCodeInput`)
//                 setShowCodeInput(true)
//             })
//             .catch((error) => {
//                 console.error('Error sending password reset email:', error);
//                 // Handle and display an error message to the user
//             });
//     };
//     const verifyPasswordResetCode = (code) => {
//         firebase
//             .auth()
//             .verifyPasswordResetCode(code)
//             .then((email) => {
//                 console.log('Password reset code is valid. Email:', email);
//                 // Change the UI to show the password reset input fields
//                 // Set a state variable to indicate the change in UI (e.g., `showPasswordInput`)
//                 // Store the email and code in state for later use
//                 setShowCodeInput(true)
//             })
//             .catch((error) => {
//                 console.error('Error verifying password reset code:', error);
//                 // Handle and display an error message to the user

//             });
//     };
//     const resetPassword = (email, code, newPassword) => {
//         firebase
//             .auth()
//             .confirmPasswordReset(code, newPassword)
//             .then(() => {
//                 console.log('Password reset successful.');
//                 // Redirect the user to the login page or another appropriate page
//             })
//             .catch((error) => {
//                 console.error('Error resetting password:', error);
//                 // Handle and display an error message to the user
//             });
//     };
//     return (
//         <View style={containerStyle}>
//             {/* <Text style={textStyle}>We are on {theme.mode} mode!</Text>

//             <Switch
//                 value={mode}
//                 onValueChange={() => handleThemeChange()} /> */}



//             {/* <StatusBar style="auto" /> */}
//             <View style={{ marginTop: '10%' }}>
//                 <Image source={require('../../Assets/images/forgetpic.png')} style={{ width: 200, height: 200 }} />
//                 <CustomText variant={'heading'} children={'Forgot Password'} color={textStyle} />
//             </View>

//             <View style={{ flex: 1, width: '80%', justifyContent: 'center', margin: 5, bottom: '10%' }}>

//                 {!showCodeInput && !showPasswordInput && (
//                     <View>
//                         <CustomText variant={'simple'} children={'ForgetEmail'} color={textStyle} />
//                         <CustomTextInput
//                             placeholder={'Forget Password'}
//                             placeholderTextColor={textStyle}
//                             value={email}
//                             onChangeText={setEmail}
//                         />
//                         <CustomButton
//                             label={'ForgetPassword'}
//                             onPress={sendPasswordResetEmail}
//                             borderColor={textStyle}
//                             color={textStyle}
//                         />
//                     </View>
//                 )}
//             </View>
//             {showCodeInput && !showPasswordInput && (
//                 <View>
//                     <CustomText variant={'simple'} children={'ForgetEmail'} color={textStyle} />
//                     <CustomTextInput
//                         placeholder={'Verify Password'}
//                         placeholderTextColor={textStyle}
//                         value={email}
//                         onChangeText={setEmail}
//                     />
//                     <CustomButton
//                         label={'Verify'}
//                         onPress={verifyPasswordResetCode}
//                         borderColor={textStyle}
//                         color={textStyle}
//                     />
//                 </View>
//             )}
//             {!showCodeInput && showPasswordInput && (
//                 <View>
//                     <CustomText variant={'simple'} children={'ForgetEmail'} color={textStyle} />
//                     <CustomTextInput
//                         placeholder={'Forget Password'}
//                         placeholderTextColor={textStyle}
//                         value={email}
//                         onChangeText={setEmail}
//                     />
//                     <CustomButton
//                         label={'resetPassword'}
//                         onPress={resetPassword}
//                         borderColor={textStyle}
//                         color={textStyle}
//                     />
//                 </View>
//             )}

//             <View style={{ justifyContent: 'center', bottom: '20%', width: '100%', alignItems: 'center' }}>
//                 <CustomButton label={'ForgetPassword'} onPress={() => sendPasswordResetEmail}
//                     borderColor={textStyle} color={textStyle} />
//             </View>
//         </View>
//     )
// }

// export default Forgotpassword

// const styles = StyleSheet.create({
//     container_light: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
//     ,
//     container_dark: {
//         flex: 1,
//         backgroundColor: '#121212',
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
//     ,
//     text_light: {
//         marginBottom: 20,
//         color: '#000'
//     }

//     ,
//     text_dark: {
//         marginBottom: 20,
//         color: "#fff"
//     }
// }

// );


import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '@react-native-firebase/auth';
import CustomText from '../../Components/CustomText';
import { useSelector } from 'react-redux';
import colors from '../../Assets/colors';
import CustomTextInput from '../../Components/Textinput';
import CustomButton from '../../Components/CustomButton';
const Forgotpassword = ({ navigation }) => {
    const theme = useSelector(state => state.theme)
    const [email, setEmail] = useState('');

    // Function to handle the password reset request
    const handlePasswordResetRequest = () => {
        // Send a password reset email to the provided email using Firebase
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent successfully
                // Navigate to the next screen
                navigation.navigate('CodeVerification', { email });
            })
            .catch((error) => {
                // Handle and display an error message to the user
                console.error('Error sending password reset email:', error);
            });
    };
    const containerStyle = theme.mode === 'light' ? colors.container_light : colors.container_dark;
    const textStyle = theme.mode === 'light' ? colors.light.white : colors.dark.white;
    const buttonStyles = theme.mode === 'light' ? colors.light.white : colors.dark.activeColor;

    return (
        <View style={containerStyle}>
            <View style={{ marginTop: '10%', justifyContent: 'center', alignItems: "center" }}>
                <Image source={require('../../Assets/images/forgetpic.png')} style={{ width: 200, height: 200 }} />
                <CustomText variant={'heading'} children={'Forgot Password'} color={textStyle} />
            </View>
            <View style={{ width: '80%', justifyContent: 'center', alignSelf: 'center', marginTop: '10%' }}>
                <CustomText variant={'simple'} children={'ForgetPassword'} color={textStyle} style={{ margin: 10 }} />
                <CustomTextInput
                    placeholderTextColor={'gray'}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                <CustomButton label={'Verify'} onPress={handlePasswordResetRequest}
                    color={'white'} borderColor={textStyle}
                    backgroundColor={buttonStyles} fontWeight={'bold'} />

            </View>
        </View>
    );
};
export default Forgotpassword

