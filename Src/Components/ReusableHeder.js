import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../Assets/colors';
const Header = ({ title, onLeftPress, trackColor, thumbColor, onValueChange, value, backgroundColor, color, iconcolor }) => {
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <TouchableOpacity style={styles.leftContainer} onPress={onLeftPress}>
                {/* Insert your left touchable content here */}
                <Icon name="left" size={24} color={iconcolor} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: color }]}>{title}</Text>
            <Switch style={styles.rightContainer}
                trackColor={trackColor}
                thumbColor={thumbColor}
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
        // backgroundColor: '#f2f2f2',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
};

export default Header;
