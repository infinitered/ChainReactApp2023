import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  Image,
  ImageRequireSource,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { AppStackParamList } from "../../navigators"
import { useScheduledEventsData, useSponsors } from "../../services/api"
import { useFloatingActionEvents, useScrollY } from "../../hooks"
import { ImageRef, ScheduledEvent, Sponsor } from "../../services/api/webflow-api.types"
import {
  ButtonLink,
  getFullWidthImageDimensions,
  MIN_HEADER_HEIGHT,
  Screen,
  Text,
} from "../../components"
import { colors, spacing } from "../../theme"
import { formatDate } from "../../utils/formatDate"
import { TalkDetailsHeader } from "./TalkDetailsHeader"
import Animated from "react-native-reanimated"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { translate } from "../../i18n"
import { SCREEN_WIDTH } from "../../components/carousel/constants"

const imageCurve = require("../../../assets/images/workshop-curve.png")

interface BreakDetailsProps {
  /**
   * The title of the talk
   */
  title: string
  /**
   * The location or date of the talk
   */
  subtitle: string
  /**
   * The banner image
   */
  image: ImageSourcePropType
  /**
   * The Break Sponsor
   */
  sponsor: Sponsor
  /**
   * The description of the break
   */
  description: string
  /**
   * The location of the break
   */
  location: string
  /**
   * The calloutLink of the break
   */
  calloutLink: string
}

const breakDetailsProps = (schedule: ScheduledEvent, sponsors: Sponsor[]): BreakDetailsProps => {
  const recurringEvent = schedule["recurring-event"]
  const sponsor = sponsors.find(
    (s) => s._id === recurringEvent["sponsor-for-secondary-callout-optional"],
  )
  const imageBanner = recurringEvent["secondary-callout-banner"]
  return {
    title: recurringEvent["secondary-callout"],
    subtitle: `${formatDate(schedule["day-time"], "MMMM dd, h:mmaaa")} PT`,
    image: (imageBanner as ImageRef).url
      ? { uri: (imageBanner as ImageRef).url }
      : (imageBanner as ImageRequireSource),
    sponsor,
    description: recurringEvent["secondary-callout-description"],
    location: recurringEvent["secondary-callout-location"],
    calloutLink: recurringEvent["secondary-callout-link"],
  }
}

export const BreakDetailsScreen: FC<StackScreenProps<AppStackParamList, "BreakDetails">> = ({
  route: { params },
}) => {
  const [headingHeight, setHeadingHeight] = React.useState(0)

  const { scrollHandlers } = useFloatingActionEvents()
  const { scrollY, scrollHandler } = useScrollY()
  const { bottom: paddingBottom } = useSafeAreaInsets()

  const { data: scheduleData } = useScheduledEventsData()
  const { data: sponsors = [] } = useSponsors()
  const schedule = scheduleData?.find((s) => s._id === params?.scheduleId)

  if (!schedule) return null

  const { title, subtitle, image, sponsor, description, location, calloutLink } = breakDetailsProps(
    schedule,
    sponsors,
  )
  const $bannerImage: StyleProp<ImageStyle> = [$bannerImageBase, getFullWidthImageDimensions(image)]

  return (
    <Screen safeAreaEdges={["top", "bottom"]} style={$root}>
      <TalkDetailsHeader {...{ title, subtitle, scrollY, headingHeight }} />

      <Animated.ScrollView
        style={[$scrollView, { paddingBottom }]}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        {...scrollHandlers}
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
            <Image source={imageCurve} style={$imageCurve} />
            <Image source={image} style={$bannerImage} />
          </View>

          <View style={$descriptionContainer}>
            <Text style={$text} text={description} />
          </View>

          {sponsor && (
            <View style={$containerSpacing}>
              <Text preset="eventTitle" style={$heading} tx="breakDetailsScreen.hostedBy" />
              <Image
                source={{ uri: sponsor.logo.url }}
                accessibilityLabel={sponsor.name}
                style={$logo}
              />
            </View>
          )}

          <View style={$containerSpacing}>
            <Text preset="eventTitle" style={$heading} tx="breakDetailsScreen.locationLabel" />
            <Text style={$text} text={location} />
          </View>

          <View style={$containerSpacing}>
            <ButtonLink openLink={() => openLinkInBrowser(calloutLink)}>
              {translate("breakDetailsScreen.moreInfo")}
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
  paddingBottom: spacing.large,
  paddingHorizontal: spacing.large,
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

const $imageCurve: ImageStyle = {
  position: "absolute",
  left: -spacing.large,
  width: SCREEN_WIDTH,
  resizeMode: "stretch",
}

const $containerSpacing: ViewStyle = {
  marginBottom: spacing.large,
}

const $bannerImageBase: ImageStyle = {
  borderRadius: 4,
}

const $text: TextStyle = {
  fontSize: 16,
  lineHeight: 22.4,
}

const $descriptionContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $heading: TextStyle = {
  ...$containerSpacing,
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $logo: ImageStyle = {
  height: 45,
  width: 45,
}
