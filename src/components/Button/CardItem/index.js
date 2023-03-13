import React, { useEffect } from 'react'
import {
    StyleSheet, Text, View, Image, TouchableOpacity, Platform
} from 'react-native'
import { Dimensions } from 'react-native';
import { height } from '../../../utils/device';
import normalize from '../../../utils/normalize'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import fonts from '../../../theme/fonts';
const CardItem = ({ label = "", imgUrl = '', onPress = () => { } }) => {
    return (
        <>
            <View style={style.Parent}>
                <Text style={style.Label}>{label}</Text>
                <Image source={{ uri: imgUrl }} style={style.Image}></Image>

            </View>
            <TouchableOpacity onPress={onPress} style={style.Recipe}>
                <Text style={style.Prepare}>{`PREPARE`}</Text>
            </TouchableOpacity>
        </>
    )
}
const style = StyleSheet.create({
    Parent: {
        alignSelf: 'center',
        width: windowWidth * 0.8,
        height: windowWidth * 0.8,
        backgroundColor: "#fff",
        marginVertical: windowHeight * 0.01,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        borderRadius: 20,
        elevation: 24,
    },
    Label: {
        margin: '5%',
        fontSize: normalize.heightScale(16),
        fontWeight: 'bold',
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
        zIndex: -1,
        opacity: 0.7,
        borderRadius: Platform.OS == 'ios' ? 20 : 5
    },
    Recipe: {
        width: '30%',
        height: normalize.heightScale(30),
        backgroundColor: '#fff',
        borderRadius: normalize.heightScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 29,
        //elevation: 10,
        top: -normalize.heightScale(20)
    },
    Prepare: {
        fontSize: normalize.heightScale(10),
        fontWeight: 'bold',
    }
})
export default CardItem