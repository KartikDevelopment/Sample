import React, { useEffect } from 'react'
import {
    StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native'
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from '../../utils/normalize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const IngredientsCard = ({ data }) => {
    console.log("datalll")
    console.log(data)
    return (
        <View style={style.Parent}>
            <Text style={style.Ingredients}>Ingredients</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data?.map((item, index) =>
                    <Text style={style.IngredientsList}>{item.text}</Text>
                )}
            </ScrollView>
        </View>
    )
}
const style = StyleSheet.create({
    Parent: {
        width: windowWidth * 0.8,
        alignItems: 'center',
        backgroundColor: '#dfdfdf',
        top: -100,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        paddingBottom: 20,
        marginBottom: 10
    },
    Ingredients: {
        marginTop: normalize.heightScale(10),
        fontSize: normalize.heightScale(18),
        fontWeight: 'bold',
        color: "#fff",
        zIndex: 1,
        marginBottom: 10
    },
    IngredientsList: {
        marginTop: normalize.heightScale(10),
        fontSize: normalize.heightScale(16),
        fontWeight: 'bold',
        color: "#000",
        zIndex: 1,
        width: windowWidth * 0.6,
    }
})
export default IngredientsCard