import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Card, Icon, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/TabNavigator"
import { useTabNavigation } from "../hooks"
import { colors, spacing } from "../theme"

const Header = ({ time, title }) => (
  <View style={{ flex: 1 }}>
    <Text style={$timeText}>{time}</Text>
    <Text preset="eventTitle" style={$titleText}>
      {title}
    </Text>
  </View>
)

const Footer = ({ speaker, description }) => (
  <View style={$footerContainer}>
    <Text preset="heading" style={$descriptionText}>
      {description}
    </Text>
    <Text style={$speakerText}>{speaker}</Text>
  </View>
)

export const PlaceholderScreen: FC<TabScreenProps<"Schedule">> = observer(
  function PlaceholderScreen() {
    // Pull in navigation via hook
    const navigation = useTabNavigation()

    return (
      <Screen
        style={$root}
        preset="scroll"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$container}
      >
        <Text>Placeholder!</Text>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  padding: spacing.large,
  flex: 1,
  justifyContent: "space-around",
}

const $avatar: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.palette.primary500,
  width: 80,
  height: 80,
  borderRadius: 40,
  top: spacing.extraSmall,
  right: spacing.medium,
}

const $speakerText: TextStyle = {
  color: colors.palette.neutral900,
}

const $timeText: TextStyle = {
  color: colors.palette.neutral900,
  marginBottom: spacing.large,
}

const $titleText: TextStyle = {
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $contentText: TextStyle = {
  color: colors.palette.neutral500,
}

const $descriptionText: TextStyle = {
  color: colors.palette.neutral900,
  fontSize: 22,
  lineHeight: 24.2,
  marginBottom: spacing.extraSmall,
}

const $footerContainer: ViewStyle = { flex: 1, paddingTop: spacing.small }
