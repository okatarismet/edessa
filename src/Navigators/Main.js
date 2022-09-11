import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen, MapScreen, MarketScreen, CoinScreen, UserScreen } from "@/Containers"
import Icon from "react-native-vector-icons/FontAwesome"
import { Image } from "react-native"

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          // paddingHorizontal: 5,
          // paddingTop: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: "#001D3D",
          // position: "absolute",
          // borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={require("@/Assets/Images/HomeIcon.png")} style={{ width: 26, height: 26, resizeMode: "contain" }} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={require("@/Assets/Images/MapIcon.png")} style={{ width: 26, height: 26, resizeMode: "contain" }} />,
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={require("@/Assets/Images/MarketIcon.png")} style={{ width: 26, height: 26, resizeMode: "contain" }} />,
        }}
      />
      <Tab.Screen
        name="Coin"
        component={CoinScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={require("@/Assets/Images/CoinIcon.png")} style={{ width: 26, height: 26, resizeMode: "contain" }} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={require("@/Assets/Images/UserIcon.png")} style={{ width: 26, height: 26, resizeMode: "contain" }} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
