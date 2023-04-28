import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators/AppNavigator"
import { resetRoot } from "../navigators/navigationUtilities"
import { Button, Screen, Text } from "../components"

import messaging from "@react-native-firebase/messaging"
import { spacing } from "../theme"
import { useAppNavigation, useHeader } from "../hooks"
import { translate } from "../i18n"
import { clear } from "../utils/storage"
import { useQueryClient } from "@tanstack/react-query"
import { BackButton } from "../navigators/BackButton"
import * as Updates from "expo-updates"
import * as Application from "expo-application"

export const DebugScreen: FC<StackScreenProps<AppStackParamList, "Debug">> = () => {
  const navigation = useAppNavigation()
  useHeader({
    LeftActionComponent: <BackButton />,
    title: translate("debugScreen.title"),
  })
  const [fcmToken, setFcmToken] = React.useState<string | null>(null)
  const queryClient = useQueryClient()

  const clearState = () => {
    // Clear react-query state
    queryClient.resetQueries()

    // Clear async storage
    clear()

    // Clear navigation state
    resetRoot()
    navigation.navigate("Welcome")
  }

  React.useEffect(() => {
    const getToken = async () => {
      const token = await messaging().getToken()
      setFcmToken(token)
    }
    getToken()
  }, [])

  return (
    <Screen
      contentContainerStyle={$rootContainer}
      style={$root}
      preset="fixed"
      safeAreaEdges={["bottom"]}
    >
      <View>
        <Text preset="bold" tx="debugScreen.pushToken" style={$subtitle} />
        <Text text={fcmToken} selectable />
        <Button
          shadowStyle={$resetStateButtonShadow}
          tx="debugScreen.resetState"
          onPress={() => clearState()}
        />
      </View>
      <View style={$footer}>
        <Text preset="companionHeading" text={"Specs:"} />
        {Updates.channel.length > 0 ? (
          <Text preset="label" text={`Channel: ${Updates.channel}`} style={$spec} />
        ) : null}
        {Updates.updateId ? (
          <Text preset="label" text={`Update ID: ${Updates.updateId}`} style={$spec} />
        ) : null}
        <Text
          preset="label"
          text={`App Version: ${Application.nativeApplicationVersion}`}
          style={$spec}
        />
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $rootContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
}

const $resetStateButtonShadow: ViewStyle = {
  marginTop: spacing.large,
}

const $subtitle: TextStyle = {
  marginBottom: spacing.medium,
}

const $footer: ViewStyle = {
  marginBottom: spacing.medium,
}

const $spec: TextStyle = {
  marginTop: spacing.extraSmall,
}
