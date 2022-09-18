import React, { useState, useEffect } from "react"
import { View, StyleSheet, ActivityIndicator, Text, TextInput, TouchableOpacity, ScrollView, Button, Dimensions } from "react-native"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Brand } from "@/Components"
import { useTheme } from "@/Hooks"
import { useLazyFetchOneQuery } from "@/Services/modules/users"
import { changeTheme } from "@/Store/Theme"

import MapView, { Marker, Polyline } from "react-native-maps"
import Location from "../../Components/Map/myLocation"
import { useRef } from "react"
import { TouchableHighlight } from "react-native-gesture-handler"
import Geoloc from "../../Components/Map/geocoding"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
// import { Icon } from "react-native-vector-icons/Icon"

const ExampleContainer = () => {
  const { t } = useTranslation()
  const mapRef = useRef(null)
  const { loading, latitude, longitude } = Location()
  const [search, onChangeSearch] = useState("")
  const [locationMarked, setLocationMark] = useState(false)
  const [destinationMarked, setDestinationMark] = useState(false)
  const [showRoad, setShowRoad] = useState(false)

  // let address = Geoloc("Beykoz")
  // console.log(address)

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

  const middler = (myLatitude, myLongitude, latitudeB, longitudeB) => {
    const window = Dimensions.get("window")
    const { width, height } = window
    const LONGITUDE_DELTA = 0.0922 + width / height
    return {
      latitude: (myLatitude + latitudeB) / 2,
      longitude: (myLongitude + longitudeB) / 2,
      latitudeDelta: 0.0922,
      longitudeDelta: LONGITUDE_DELTA,
    }
  }

  const goToIstanbul = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(istanbulRegion, 3 * 1000)
  }
  const goToLocation = () => {
    mapRef.current.animateToRegion(myLocation, 3 * 1000)
    setLocationMark(true)
  }

  const handleGoButtonClick = () => {
    console.log(loading, myLocation.latitude, myLocation.longitude)
    // if (text === 'Beykoz') {
    //   mapRef.current.animateToRegion(beykoz, 3 * 1000);
    //   setMark(true);
    //   // setClicked(true);
    // }
    // if (clicked) {
    setDestinationMark(true)
    let middle = middler(myLocation.latitude, myLocation.longitude, beykoz.latitude, beykoz.longitude)
    console.log("middle", middle)
    mapRef.current.animateToRegion(middle, 2.5 * 1000)
    setShowRoad(true)
    // }
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        // customMapStyle={mapStyle}
        // mapId={"c51f343f25f20c66"}
        style={styles.map}
        initialRegion={istanbulRegion}
        //onRegionChangeComplete runs when the user stops dragging MapView
        onRegionChangeComplete={region => setRegion(region)}
      >
        {showRoad && (
          <Polyline
            coordinates={[myLocation, beykoz]} //specify our coordinates
            strokeColor={"#000"}
            strokeWidth={3}
            lineDashPattern={[1]}
          />
        )}

        {locationMarked && <Marker coordinate={myLocation} />}
        {destinationMarked && <Marker coordinate={beykoz} />}
      </MapView>
      <View style={[styles.topBar, styles.elevation]}>
        <TextInput style={styles.input} onChangeText={e => onChangeSearch(e)} value={search} />
        <Pressable style={styles.goButton} onPress={handleGoButtonClick}>
          <Text style={styles.goText}>Go</Text>
        </Pressable>
        {/* <TouchableHighlight onPress={handleGoButtonClick} title="Go" style={styles.goButton}></TouchableHighlight> */}
      </View>

      <TouchableHighlight>
        {/* <Icon name="navigate-circle-outline" size={30} /> */}
        <Button onPress={goToLocation} disabled={loading} title="Go to Location" />
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
    height: "100%",
    width: "80%",
    // borderWidth: 2,
    backgroundColor: "azure",
    opacity: 0.7,
    borderRadius: 20,
  },
  goButton: {
    width: "17%",
    // marginLeft: 10,
    // alignItems: "flex-end",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginStart: 10,
    backgroundColor: "#FFC300",
  },
  goText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  topBar: {
    flexDirection: "row",
    width: "90%",
    height: "7%",
    marginEnd: 20,
    marginStart: 20,
    marginBottom: 530,
    // backgroundColor: "aliceblue",
    borderRadius: 20,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
})
