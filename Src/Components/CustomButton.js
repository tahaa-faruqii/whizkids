import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
// import { Color } from '../Assets/theme'
// import Icon from 'react-native-vector-icons/FontAwesome';

const CustomButton = ({ label, onPress, style, fontWeight, color, borderColor, backgroundColor, }) => {
    return (
        <TouchableOpacity style={[styles.button, { borderColor: borderColor, backgroundColor: backgroundColor }]} onPress={onPress}>
            <Text style={{ color: color, fontWeight: fontWeight, fontSize: 18, }}>{label}</Text>

        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: '2%',
        borderWidth: 2,
        borderRadius: 40,
        width: '40%',
        padding: 5,
        // margin: 5

    }
})