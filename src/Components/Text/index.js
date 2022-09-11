import React from 'react'
import Text from 'react-native'
import styled from 'styled-components'
export default function CustomText({ children }) {
  return <CustomTextComponent>{children}</CustomTextComponent>
}

const CustomTextComponent = styled.Text`
  font-family: arial;
  color: black;
`
