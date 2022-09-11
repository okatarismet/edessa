import React, { useState, useEffect } from "react"
import { View, ActivityIndicator, TextInput, TouchableOpacity, ScrollView, Image, Text } from "react-native"
import { navigate } from "@/Navigators/utils"

import styled from "styled-components"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Brand } from "@/Components"
import { useTheme } from "@/Hooks"
import { useLazyFetchOneQuery } from "@/Services/modules/users"
import { changeTheme } from "@/Store/Theme"
// import Text from '@/Components/Text'
const GuestScreen = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState("9")
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] = useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  const onChangeTheme = ({ theme, darkMode }) => {
    dispatch(changeTheme({ theme, darkMode }))
  }
  return (
    <RootView>
      <Image source={require("../../Assets/Images/WenLambo.png")} style={{ width: 250, height: 250, margin: 20 }} />
      <Image
        source={require("../../Assets/Images/WelcometoNaviern.png")}
        style={{
          width: 250,
          height: 25,
          margin: 20,
          resizeMode: "contain",
        }}
      />
      <SubView>
        <LoginButton
          onPress={() => {
            navigate("Login")
          }}
        >
          <Text style={{ color: "#FFF" }}>Login</Text>
        </LoginButton>
        <SignUpButton
          onPress={() => {
            navigate("Signup")
          }}
        >
          <Text style={{ color: "#001d3d" }}>Sign Up</Text>
        </SignUpButton>
      </SubView>
    </RootView>
  )
}

const RootView = styled.View({
  width: "100%",
  height: "100%",
  display: "flex",
  // gap: '10px',
  marginTop: "70px",
  justifyContent: "space-between",
  alignItems: "center",
})
const SubView = styled.View({
  // width: '100%',
  height: "40%",
  display: "flex",
  gap: "20px",
  justifyContent: "flex-start",
})

const HeaderText = Text

const LoginButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 271px;
  height: 58px;
  background: #001d3d;
  border-radius: 8px;
  flex: none;
  order: 0;
  z-index: 0;
`
const SignUpButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  gap: 4px;
  width: 272px;
  height: 60px;
  border-radius: 6px;
  margin-top: 16px;
  border: 1px solid #001d3d;
`
export default GuestScreen
