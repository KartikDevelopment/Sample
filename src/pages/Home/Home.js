import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, FlatList, ActivityIndicator
} from 'react-native'
import { useState } from 'react'
import { RefreshControl } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import axiosService from '../../axios/axios-service'
import { recipies } from '../../slices/app.slice'
import Constants from 'expo-constants'
import { useDispatch, useSelector } from 'react-redux'
import CardItem from '../../components/Button/CardItem'
import { TextInput } from 'react-native-gesture-handler'
import SearchBar from '../../components/SearchBar'
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGrayPurple,
    marginTop: 45
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  activityIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})
const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.app.recipies)
  const [showIndicator, setShowIndicator] = useState(true);
  const [clicked, setClicked] = useState(false)
  const [onRefresh, setOnRefresh] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('Tofu')
  useEffect(() => {
    fxn(searchPhrase)
  }, [clicked])
  const Call_RefreshControl = () => {
    fxn()
  }
  const fxn = async () => {
    console.log('urlrlu', 'search?q=' + searchPhrase)
    axiosService.get('search?q=' + searchPhrase).then((res) => {
      dispatch(recipies(res.data.hits))
      setShowIndicator(false)
    }).catch((err) => {
      console.log(err)
    })

  }
  const Navigate = (data) => {
    navigation.navigate('Details', { from: 'Home', data })
  }
  const onSubmit = () => {
    setShowIndicator(true)
    fxn()
  }
  return (
    <View style={styles.root}>
      <ActivityIndicator
        size="large"
        color="red"
        animating={showIndicator}
        style={styles.activityIndicator} />
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        onSubmitEditing={onSubmit}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />

      {!showIndicator &&
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          refreshControl={
            <RefreshControl
              refreshing={onRefresh}
              onRefresh={Call_RefreshControl}
            />
          }
          renderItem={(item) => <CardItem label={item?.item?.recipe?.label} imgUrl={item?.item?.recipe?.image} onPress={() => Navigate(item?.item?.recipe)} />}
        />}

      {/* <Button
        title="Go to Details"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      /> */}
    </View>)
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
