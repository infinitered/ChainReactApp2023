import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Avatar, Card, Icon, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/TabNavigator"
import { useAppNavigation } from "../hooks"
import { colors, spacing } from "../theme"
import { useHeader } from "../hooks/useHeader"

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

export const ScheduleScreen: FC<TabScreenProps<"Schedule">> = observer(function ScheduleScreen() {
  useHeader({ title: "Schedule" })
  const navigation = useAppNavigation()

  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
      <Text preset="heading" style={$heading}>
        Wed, May 17
      </Text>
      <Text style={$subheading}>React Native Workshops</Text>
      <Card
        preset="reversed"
        HeadingComponent={<Header time="6:00 — 8:00 am" title="Check-in & Registration" />}
        content="Check-in for attendees with a workshop ticket begins at 6:00 am."
        contentStyle={$contentText}
      />

      <Card
        onPress={() => navigation.navigate("EventDetail")}
        HeadingComponent={<Header time="8:00 am" title="Advanced Workshop" />}
        RightComponent={
          <View style={$rightContainer}>
            <Avatar
              style={$avatar}
              source={{ uri: "https://avatars.githubusercontent.com/u/997157?v=4" }}
            />
            <Icon
              icon="arrow"
              size={24}
              color={colors.palette.primary500}
              containerStyle={$arrowContainer}
            />
          </View>
        }
        FooterComponent={
          <Footer speaker="Gant Laborde" description="Leveling up on the new architecture" />
        }
      />

      <Card
        onPress={() => navigation.navigate("EventDetail")}
        HeadingComponent={<Header time="11:00 am" title="Talk" />}
        RightComponent={
          <View style={$rightContainer}>
            <Avatar
              preset="talk"
              style={$avatar}
              source={{ uri: "https://avatars.githubusercontent.com/u/997157?v=4" }}
            />
            <Icon
              icon="arrow"
              size={24}
              color={colors.palette.primary500}
              containerStyle={$arrowContainer}
            />
          </View>
        }
        FooterComponent={
          <Footer
            speaker="React Native case study: from an idea to market"
            description="Ferran Negre Pizarro"
          />
        }
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingBottom: 200,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
  flex: 1,
}

const $avatar: ViewStyle = {
  position: "absolute",
  top: spacing.extraSmall,
  right: spacing.medium,
}

const $speakerText: TextStyle = {
  color: colors.palette.neutral900,
  lineHeight: 22.4,
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

const $footerContainer: ViewStyle = {
  flex: 1,
  paddingTop: spacing.small,
}

const $rightContainer: ViewStyle = {
  position: "absolute",
  right: spacing.extraSmall,
  minHeight: 213,
  width: 50,
  marginRight: -spacing.medium,
}

const $arrowContainer: ViewStyle = {
  bottom: spacing.extraSmall,
  right: spacing.medium,
  position: "absolute",
}

const $heading: TextStyle = { fontSize: 32, lineHeight: 45.2 }
const $subheading: TextStyle = { color: colors.palette.primary500 }
