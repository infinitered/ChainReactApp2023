import { observer } from "mobx-react-lite"
import React from "react"
import { Dimensions, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/welcome-shapes.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props

  function goNext() {
    navigation.navigate("Tabs", { screen: "Schedule" })
  }

  return (
    <Screen style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} />
      </View>
      <View style={$middleContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.heading"
          preset="heading"
        />
        <Text tx="welcomeScreen.topBlurb" preset="companionHeading" style={$topBlurb} />
        <Text tx="welcomeScreen.bottomBlurb" preset="companionHeading" />
      </View>

      <SafeAreaView style={$bottomContainer} edges={["bottom"]}>
        <View style={$bottomContentContainer}>
          <Button
            testID="see-the-schedule-button"
            tx="welcomeScreen.scheduleButton"
            onPress={goNext}
          />
        </View>
      </SafeAreaView>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "25%",
  justifyContent: "flex-start",
}

const $middleContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "50%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "25%",
  backgroundColor: colors.background,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: Dimensions.get("screen").width * 0.25,
  paddingBottom: spacing.large,
  justifyContent: "flex-end",
}

const $welcomeLogo: ImageStyle = {
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}

const $topBlurb: TextStyle = {
  marginBottom: spacing.small,
}
