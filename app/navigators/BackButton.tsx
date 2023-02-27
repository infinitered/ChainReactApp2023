// A component which implements a back button for the navigation bar
//
import React from "react"
import { HeaderAction } from "../components"
import { useAppNavigation } from "../hooks"

export function BackButton() {
  const navigation = useAppNavigation()
  return <HeaderAction icon="back" onPress={navigation.goBack} />
}
