import React, { useState, useEffect } from "react"
import { View, ActivityIndicator, TextInput, TouchableOpacity, ScrollView, Image, Text } from "react-native"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Brand } from "@/Components"
import { useTheme } from "@/Hooks"
import { useLazyFetchOneQuery } from "@/Services/modules/users"
import { changeUser } from "@/Store/User"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { navigate } from "@/Navigators/utils"

// import Text from '@/Components/Text'
const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState("9")
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] = useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  return (
    <RootView>
      <Image
        source={require("../../Assets/Images/Login.png")}
        style={{
          width: 250,
          height: 25,
          // margin: 20,
          resizeMode: "contain",
        }}
      />
      <Image source={require("../../Assets/Images/Crypto-Bro.png")} style={{ width: 250, height: 250 }} />

      <SubView>
        <EmailArea placeholder="Email" placeholderTextColor="#ff9b05"></EmailArea>
        <EmailArea placeholder="Password" placeholderTextColor="#ff9b05"></EmailArea>
        <TouchableOpacity>
          <Text style={{ marginLeft: "auto", fontSize: 12, marginTop: 4, fontWeight: "400", color: "#001d3d" }}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate("Signup")
          }}
        >
          <Image source={require("../../Assets/Images/Donthaveanaccount.png")} style={{ width: 230, height: 45, margin: 20, resizeMode: "contain" }} />
        </TouchableOpacity>
        <LoginButton
          onPress={() => {
            dispatch(changeUser({ authenticated: true }))
            navigate("Main")
          }}
        >
          <Text style={{ color: "#FFF" }}>Login</Text>
        </LoginButton>
      </SubView>
    </RootView>
  )
}

const RootView = styled.View({
  width: "100%",
  height: "80%",
  display: "flex",
  // gap: '10px',
  paddingTop: "70px",
  justifyContent: "space-between",
  alignItems: "center",
})
const SubView = styled.View({
  // width: '100%',
  height: "40%",
  display: "flex",
  // gap: "20px",
  justifyContent: "flex-start",
})

const HeaderText = Text

const EmailArea = styled.TextInput`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 16px;
  padding: 22px 16px;
  gap: 10px;
  width: 272px;
  margin-top: 10px;
  height: 68px;
  // background: #ffffff;
  border: 2px solid #ff9b05;
  border-radius: 8px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`
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
export default Login
