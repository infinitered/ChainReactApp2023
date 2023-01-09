import React, { FC } from "react"
import { ViewStyle, View, TextStyle, ImageStyle, Image, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import { Text, MIN_HEADER_HEIGHT, Screen, ButtonLink } from "../../components"
import { colors, spacing } from "../../theme"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { TalkDetailsHeader } from "../TalkDetailsScreen/TalkDetailsHeader"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSchedule } from "../../services/api"
import { formatDate } from "../../utils/formatDate"
import { openMap } from "../../utils/openMap"

const partyBlob = require("../../../assets/images/party-shape.png")
const partyCurve = require("../../../assets/images/party-curve.png")
const squarespaceLogo = require("../../../assets/images/squarespace-logo.png")

const SCREEN_WIDTH = Dimensions.get("screen").width

export const PartyDetailsScreen: FC<StackScreenProps<AppStackParamList, "PartyDetails">> = ({
  route: { params },
}) => {
  const { scheduleId } = params
  const { data: scheduleData } = useSchedule()
  const schedule = scheduleData?.find((s) => s._id === scheduleId)

  const scrollY = useSharedValue(0)
  const [headingHeight, setHeadingHeight] = React.useState(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  const { bottom: paddingBottom } = useSafeAreaInsets()

  const openLink = (destination: string) =>
    destination.startsWith("https") ? openLinkInBrowser(destination) : openMap(destination)

  if (schedule === undefined) return null

  const title = schedule.name
  const subtitle = formatDate(schedule["day-time"], "MMM d, h:mm a")

  return (
    <Screen safeAreaEdges={["top", "bottom"]} style={$root}>
      <TalkDetailsHeader {...{ title, subtitle, scrollY, headingHeight }} />

      <Animated.ScrollView
        style={[$scrollView, { paddingBottom }]}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
      >
        <View style={$container}>
          <View style={$headingContainer}>
            <Text
              preset="screenHeading"
              style={$title}
              text={title}
              onLayout={({
                nativeEvent: {
                  layout: { height },
                },
              }) => {
                setHeadingHeight(height)
              }}
            />
            <Text preset="companionHeading" style={$subtitle} text={subtitle} />
          </View>
          <View style={$containerSpacing}>
            <Image source={partyCurve} style={$partyCurve} />
            <Image source={{ uri: "https://picsum.photos/315" }} style={$partyImage} />
            <Image source={partyBlob} style={$partyBlob} />
          </View>

          <View style={$detailsContainer}>
            <Text style={$bodyText} text={schedule["break-party-description"]} />
          </View>

          <View style={$containerSpacing}>
            <Text preset="eventTitle" style={$aboutHeading} text="Hosted by" />
            <Image source={squarespaceLogo} />
          </View>

          <View style={$containerSpacing}>
            <Text preset="eventTitle" style={$aboutHeading} text="Location" />
            <Text preset="bold" style={$bodyText} text="The Armory" />
            <Text style={$bodyText} text="11134 Washington St #302" />
            <Text style={$bodyText} text="Portland, OR 97006" />

            <ButtonLink
              openLink={() => openLink("11134 Washington St #302, Portland, OR 97006")}
              style={$buttonLink}
            >
              {"Open in maps"}
            </ButtonLink>
          </View>
        </View>
      </Animated.ScrollView>
    </Screen>
  )
}

const $root: ViewStyle = {
  backgroundColor: colors.background,
}

const $scrollView: ViewStyle = {
  marginBottom: MIN_HEADER_HEIGHT,
}

const $container = {
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.large,
}

const $containerSpacing: ViewStyle = {
  marginBottom: spacing.large,
}

const $detailsContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $partyImage: ImageStyle = {
  height: 275,
  borderRadius: 5,
}

const $aboutHeading: TextStyle = {
  ...$containerSpacing,
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $bodyText: TextStyle = {
  fontSize: 16,
  lineHeight: 22.4,
}

const $partyBlob: ImageStyle = {
  bottom: -spacing.medium,
  right: spacing.large,
  position: "absolute",
}

const $partyCurve: ImageStyle = {
  position: "absolute",
  left: -spacing.large,
  top: spacing.extraLarge,
  width: SCREEN_WIDTH,
  resizeMode: "stretch",
}

const $title: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $subtitle: TextStyle = {
  color: colors.palette.primary500,
}

const $headingContainer: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $buttonLink: ViewStyle = {
  marginTop: spacing.medium,
}
