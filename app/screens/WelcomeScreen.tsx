import React, { useLayoutEffect } from "react"
import {
  Image,
  ImageStyle,
  Platform,
  TextStyle,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native"
import { Button, ClosedBanner, Screen, Text } from "../components"
import { useAppNavigation } from "../hooks"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { prefetchScheduledEvents } from "../services/api"

const welcomeLogo = require("../../assets/images/welcome-shapes.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = (_props) => {
  const navigation = useAppNavigation()
  const { width } = useWindowDimensions()

  function goNext() {
    navigation.navigate("Tabs", { screen: "Schedule" })
  }

  useLayoutEffect(() => {
    prefetchScheduledEvents()
  }, [])

  return (
    <Screen safeAreaEdges={["top", "bottom"]} style={$container}>
      <ClosedBanner />
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} />
      </View>
      <View style={$middleContainer}>
        <Text
          maxFontSizeMultiplier={1.2}
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.heading"
          preset="welcomeHeading"
        />
        <Text
          maxFontSizeMultiplier={1.2}
          tx="welcomeScreen.topBlurb"
          preset="companionHeading"
          style={$topBlurb}
        />

        <Text
          maxFontSizeMultiplier={1.2}
          tx="welcomeScreen.bottomBlurb"
          preset="companionHeading"
        />
      </View>

      <View style={$bottomContainer}>
        <View
          style={[
            $bottomContentContainer,
            Platform.select({ ios: { paddingHorizontal: width * 0.25 } }),
          ]}
        >
          <Button
            testID="see-the-schedule-button"
            tx="welcomeScreen.scheduleButton"
            TextProps={{ allowFontScaling: false }}
            onPress={goNext}
          />
        </View>
      </View>
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
  flexBasis: "20%",
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
  flexBasis: "20%",
  backgroundColor: colors.background,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingBottom: spacing.large,
  ...Platform.select({
    ios: {
      justifyContent: "flex-end",
    } as ViewStyle,
    android: {
      justifyContent: "center",
      alignItems: "center",
    } as ViewStyle,
    default: {} as ViewStyle,
  }),
}

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
