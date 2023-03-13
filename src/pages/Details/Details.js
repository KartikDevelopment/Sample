import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, Image
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import normalize from '../../utils/normalize'
import { ScrollView } from 'react-native-gesture-handler'
import SwipeCards from 'react-native-swipe-cards-deck'
import IngredientsCard from '../../components/IngredientsCard'
// in the file SwipeCards.js, at the row 158;
// instead of if (status.finished) this._advanceState();
// this:
// if (status.finished)
//   if (hasMovedLeft) this._advanceState();
//   else if (hasMovedRight) this._goToPrevCard();
//For swipe back option
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  Image: {
    width: '100%',
    height: normalize.heightScale(300),
    position: 'absolute',
    top: 0,
    zIndex: -1,
    backgroundColor: '#808080',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30
  },
  Label: {
    flex: 1,
    marginTop: normalize.heightScale(100),
    fontSize: normalize.heightScale(28),
    fontWeight: 'bold',
    color: "#fff",
    zIndex: 1,
  },
})
const SIZE = 5
const Details = ({ route, navigation, }) => {
  const from = route?.params?.from
  const data = route?.params?.data
  const Swipedata = [{ text: 1 }, { text: 2 }, { text: 3 },]
  console.log(data)

  const BreakIngredients = () => {
    var size = SIZE;
    var arrayOfArrays = [];
    for (var i = 0; i < data.ingredients.length; i += size) {
      arrayOfArrays.push(data.ingredients.slice(i, i + size));
    }
    return arrayOfArrays
  }

  return (
    <View style={styles.root}>
      <Image style={styles.Image} source={{ uri: data?.image }} />
      <Text style={styles.Label}>
        {data?.label}
      </Text>
      <SwipeCards
        cards={BreakIngredients()}
        renderCard={(cardData) => <IngredientsCard data={cardData} />}
        keyExtractor={(cardData) => String(cardData.text)}
        renderNoMoreCards={() => <Text>No more Ingredients</Text>}
        actions={{
          nope: { show: false },
          yup: { show: false },
          maybe: { show: false },
        }}
      //hasMaybeAction={true}
      />
    </View>
  )
}

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

Details.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
}

export default Details
