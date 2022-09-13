import { useEffect } from "react"
import { useState } from "react"
import Geocoder from "react-native-geocoding"

Geocoder.init("AIzaSyD2xGfQQa5hbzWKLHUJ6C_wY9GoxOfSz6Q")

export default function App(address) {
  const [loc, setLocation] = useState()

  console.log(address)
  const trigger = () => {
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location
        setLocation(location)
        //   console.log(location)
      })
      .catch(error => console.warn(error))
  }

  useEffect(() => {
    trigger()
  }, [])

  return loc
}
