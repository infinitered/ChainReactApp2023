import React from "react"
import { Dimensions, Image, ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Screen, Text } from "../components"
import { useAppNavigation } from "../hooks"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/welcome-shapes.png")
const { width: screenWidth } = Dimensions.get("screen")

interface WelcomeScreenProps {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = (_props) => {
  const navigation = useAppNavigation()

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
          preset="welcomeHeading"
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
}

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

const $bottomContentContainer: ViewStyle = Platform.select({
  ios: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.25,
    paddingBottom: spacing.large,
    justifyContent: "flex-end",
  },
  android: {
    flex: 1,
    paddingBottom: spacing.large,
    justifyContent: "center",
    alignItems: "center",
  },
})

const $welcomeLogo: ImageStyle = {
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.large,
}

const $topBlurb: TextStyle = {
  marginBottom: spacing.large,
}
