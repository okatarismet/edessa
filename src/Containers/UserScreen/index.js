import React, { useState, useEffect } from "react"
import { View, ActivityIndicator, Text, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Brand } from "@/Components"
import { useTheme } from "@/Hooks"
import { useLazyFetchOneQuery } from "@/Services/modules/users"
import { changeTheme } from "@/Store/Theme"

const ExampleContainer = () => {
  const { t } = useTranslation()

  return (
    <View>
      <Text>User</Text>
    </View>
  )
}

export default ExampleContainer
