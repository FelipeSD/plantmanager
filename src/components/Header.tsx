import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import colors from '../styles/colors';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import fonts from '../styles/fonts';
export function Header(){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>
                    Olá
                </Text>
                <Text style={styles.userName}>
                    Felipe
                </Text>
            </View>
            <Image 
                style={styles.image}
                source={{uri: "https://github.com/FelipeSD.png"}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
        paddingVertical: 20
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },

    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    }
});