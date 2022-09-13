import { useEffect, useState } from "react"
import { Alert } from "react-native"

import GetLocation from "react-native-get-location"

export default function App() {
  const [location, setLocation] = useState()
  const [loading, setLoading] = useState()

  console.log("Render in location")

  const requestLocation = (teste = "") => {
    setLocation(null)
    setLoading(true)

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then(location => {
        setLocation(location)
        setLoading(false)
      })
      .catch(ex => {
        const { code, message } = ex
        console.warn(code, message)
        if (code === "CANCELLED") {
          Alert.alert("Location cancelled by user or by another request")
        }
        if (code === "UNAVAILABLE") {
          Alert.alert("Location service is disabled or unavailable")
        }
        if (code === "TIMEOUT") {
          Alert.alert("Location request timed out")
        }
        if (code === "UNAUTHORIZED") {
          Alert.alert("Authorization denied")
        }
        setLocation(null)
        setLoading(false)
      })
  }

  useEffect(() => {
    requestLocation()
  }, [])

  var longitude = ""
  var latitude = ""

  if (location) {
    longitude = location["longitude"]
    latitude = location["latitude"]
  }

  return { loading, latitude, longitude }
}
