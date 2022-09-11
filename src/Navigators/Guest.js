import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GuestScreen from '@/Containers/GuestScreen/GuestScreen'
import Login from '@/Containers/GuestScreen/Login'
import Signup from '@/Containers/GuestScreen/Signup'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// @refresh reset
const GuestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="GuestScreen"
        component={GuestScreen}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default GuestNavigator
