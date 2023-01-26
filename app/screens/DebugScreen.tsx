import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { HeaderAction, Screen, Text } from "../components"

import messaging from "@react-native-firebase/messaging"
import { spacing } from "../theme"
import { useAppNavigation, useHeader } from "../hooks"
import { translate } from "../i18n"

export const DebugScreen: FC<StackScreenProps<AppStackParamList, "Debug">> = () => {
  const navigation = useAppNavigation()
  useHeader({
    LeftActionComponent: <HeaderAction icon="back" onPress={navigation.goBack} />,
    title: translate("debugScreen.title"),
  })
  const [fcmToken, setFcmToken] = React.useState<string | null>(null)

  React.useEffect(() => {
    const getToken = async () => {
      const token = await messaging().getToken()
      setFcmToken(token)
    }
    getToken()
  }, [])

  return (
    <Screen style={$root} safeAreaEdges={["bottom"]}>
      <Text preset="bold" tx="debugScreen.pushToken" style={$subtitle} />
      <Text text={fcmToken} selectable />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $subtitle: TextStyle = {
  marginBottom: spacing.medium,
}
