// Import necessary dependencies
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
const CodeVerification = ({ route, navigation }) => {
    const [code, setCode] = useState('');
    const { email } = route.params; // Retrieve the email from the previous screen

    // Function to verify the code and navigate to the home screen
    const handleCodeVerification = () => {
        // Verify the code using Firebase
        firebase.auth().verifyPasswordResetCode(code)
            .then(() => {
                // Password reset code is valid
                // Navigate to the home screen
                navigation.navigate('Home');
            })
            .catch((error) => {
                // Handle and display an error message to the user
                console.error('Error verifying password reset code:', error);
            });
    };

    return (
        <View>
            <TextInput
                placeholder="Code from email"
                onChangeText={setCode}
                value={code}
            />
            <Button
                title="Verify Code and Proceed"
                onPress={handleCodeVerification}
            />
        </View>
    );
};

export default CodeVerification;
