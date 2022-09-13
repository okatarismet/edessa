import React, { useState, useEffect } from "react"
import { View, StyleSheet, ActivityIndicator, Text, TextInput, TouchableOpacity, ScrollView, Button } from "react-native"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Brand } from "@/Components"
import { useTheme } from "@/Hooks"
import { useLazyFetchOneQuery } from "@/Services/modules/users"
import { changeTheme } from "@/Store/Theme"

import MapView, { Marker } from "react-native-maps"
import Location from "../../Components/Map/myLocation"
import { useRef } from "react"
import { TouchableHighlight } from "react-native-gesture-handler"
import Geoloc from "../../Components/Map/geocoding"
// import { Icon } from "react-native-vector-icons/Icon"

const ExampleContainer = () => {
  const { t } = useTranslation()
  const mapRef = useRef(null)
  const { loading, latitude, longitude } = Location()
  const [search, onChangeSearch] = useState("")

  let address = Geoloc("Beykoz")
  console.log(address)

  const [currentRegion, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })
  const [myLocation, setMyLocation] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })
  const beykoz = {
    latitude: 41.10130821418505,
    longitude: 29.089806172996763,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }
  const istanbulRegion = {
    latitude: 41.015137,
    longitude: 28.97953,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  useEffect(() => {
    setMyLocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  }, [latitude, longitude])

  const goToIstanbul = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(istanbulRegion, 3 * 1000)
  }
  const goToLocation = () => {
    mapRef.current.animateToRegion(myLocation, 3 * 1000)
  }

  console.log(loading, latitude, longitude)
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={istanbulRegion}
        //onRegionChangeComplete runs when the user stops dragging MapView
        onRegionChangeComplete={region => setRegion(region)}
      />
      <View style={styles.topBar}>
        <TextInput
          style={styles.input}
          // onChangeText={e => onChangeSearch(e)}
          value={search}
        />
        <Button
          // onPress={() => handleGoButtonClick()}
          title="Go"
          style={styles.searchButton}
        />
      </View>

      <TouchableHighlight>
        {/* <Icon name="navigate-circle-outline" size={30} /> */}
        <Button onPress={goToLocation} title="Go to Location" />
      </TouchableHighlight>
      <Text style={styles.text}>Current latitude: {currentRegion.latitude}</Text>
      <Text style={styles.text}>Current longitude: {currentRegion.longitude}</Text>
    </View>
  )
}

export default ExampleContainer

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,
    width: 300,
    // margin: 12,
    borderWidth: 1,
    // textAlignVertical: 'top',
    // top: -600,
    backgroundColor: "azure",
    opacity: 0.7,
    marginRight: 40,
    alignSelf: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    // flex: 1,
    width: "100%",
    height: "8%",
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 600,
    // backgroundColor: 'aliceblue',
    backfaceVisibility: "visible",
    flexWrap: "wrap",
  },
})
