import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SafeAreaView, StatusBar } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { StartupContainer } from "@/Containers"
import { useTheme } from "@/Hooks"
import MainNavigator from "./Main"
import GuestNavigator from "./Guest"
import { navigationRef } from "./utils"

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const authenticated = useSelector(state => state.user)

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Guest">
          {/* <Stack.Screen name="Startup" component={StartupContainer} /> */}
          {/* {!authenticated ? ( */}
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          {/* ) : ( */}
          <Stack.Screen
            name="Guest"
            component={GuestNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          {/* )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
