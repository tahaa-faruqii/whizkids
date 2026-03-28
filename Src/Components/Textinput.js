// import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React from 'react'
// import { create } from 'react-test-renderer'

// const Textinput = () => {
//     return (
//         <View style={styles.container}>
//             <Text>Textinput</Text>


//             <TextInput style={{ width: '80%', height: 40, borderWidth: 1, borderRadius: 20, borderWidth: 1 }}
//                 placeholder='cdcc xcv '
//                 placeholderTextColor='#000' />

//         </View>
//     )
// }

// export default Textinput
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     inputstyle: {


//     }

// })


import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, style, secureTextEntry, placeholderTextColor, ...props }) => {
    return (
        <TextInput
            placeholder={placeholder}

            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={placeholderTextColor}
            style={[styles.input, style]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        // width: "80%",
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        color: 'gray'
    },
});

export default CustomTextInput;
