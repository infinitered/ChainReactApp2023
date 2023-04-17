import React, { FC } from "react"
import { ViewStyle, View, TextStyle, ImageStyle, Image, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import {
  Text,
  IconButton,
  MIN_HEADER_HEIGHT,
  BoxShadow,
  Screen,
  MediaButton,
} from "../../components"
import { colors, spacing } from "../../theme"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { TalkDetailsHeader } from "./TalkDetailsHeader"
import Animated from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useScheduledEvents } from "../../services/api"
import { formatDate } from "../../utils/formatDate"
import type { ScheduledEvent } from "../../services/api"
import { isFuture, parseISO } from "date-fns"
import { useFloatingActionEvents, useScrollY } from "../../hooks"

export type Variants = "workshop" | "talk"

export interface TalkDetailsProps {
  /**
   * The title of the talk
   */
  title: string
  /**
   * The location or date of the talk
   */
  subtitle: string
  /**
   * The image of the speaker
   */
  imageUrl: string
  /**
   * The name of the speaker
   */
  fullName: string
  /**
   * The company where the speaker works
   */
  company: string
  /**
   * The description of the talk
   */
  description: string
  /**
   * The first name of the speaker
   */
  firstName: string
  /**
   * The bio of the speaker
   */
  bio: string
  /**
   * The url of the talk
   */
  talkUrl?: string
  /**
   * The time of the event
   */
  eventTime: string
}

const talkBlob = require("../../../assets/images/talk-shape.png")
const talkCurve = require("../../../assets/images/talk-curve.png")

const SCREEN_WIDTH = Dimensions.get("screen").width

const talkDetailsProps = (schedule: ScheduledEvent): TalkDetailsProps => {
  const talk = schedule.talk

  return {
    title: talk?.name,
    subtitle: formatDate(schedule["day-time"], "MMMM dd, h:mm aaa"),
    imageUrl: talk?.["speaker-s"][0]?.["speaker-photo"].url,
    fullName: talk?.["speaker-s"][0]?.name,
    company: talk?.["speaker-s"][0]?.company,
    description: talk?.description,
    firstName: talk?.["speaker-s"][0]["speaker-first-name"],
    bio: talk?.["speaker-s"][0]["speaker-bio"],
    talkUrl: talk?.["talk-url"],
    eventTime: schedule["day-time"],
  }
}

export const TalkDetailsScreen: FC<StackScreenProps<AppStackParamList, "TalkDetails">> = ({
  route: { params },
}) => {
  const onPress = (url) => openLinkInBrowser(url)
  const [headingHeight, setHeadingHeight] = React.useState(0)

  const { isScrolling, scrollHandlers } = useFloatingActionEvents()
  const { scrollY, scrollHandler } = useScrollY()
  const { bottom: paddingBottom } = useSafeAreaInsets()

  const { data: scheduleData } = useScheduledEvents()
  const schedule = scheduleData?.find((s) => s._id === params?.scheduleId)

  if (!schedule) return null

  const {
    bio,
    company,
    description,
    firstName,
    fullName,
    imageUrl,
    subtitle,
    title,
    talkUrl,
    eventTime,
  } = talkDetailsProps(schedule)

  const isEventPassed = !isFuture(parseISO(eventTime))

  return (
    <>
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
              <Image source={talkCurve} style={$talkCurve} />
              <BoxShadow preset="primary" style={$containerSpacing} offset={6}>
                <Image source={{ uri: imageUrl }} style={$speakerImage} />
              </BoxShadow>
              <Image source={talkBlob} style={$talkBlob} />

              <Text preset="bold" style={$nameText} text={fullName} />
              <Text style={$companyNameText} text={company} />
            </View>

            <View style={$detailsContainer}>
              <Text preset="bold" style={$detailsText} text={`${schedule.type} details`} />
              <Text style={$bodyText} text={description} />
            </View>

            <View style={$containerSpacing}>
              <Text preset="eventTitle" style={$aboutHeading} text={`About ${firstName}`} />
              <Text style={$bodyText} text={bio} />
            </View>

            <View style={$linksContainer}>
              <IconButton icon="twitter" onPress={() => onPress("https://cr.infinite.red")} />
              <IconButton icon="github" onPress={() => onPress("https://cr.infinite.red")} />
              <IconButton icon="link" onPress={() => onPress("https://cr.infinite.red")} />
            </View>
          </View>
        </Animated.ScrollView>
      </Screen>
      {talkUrl && isEventPassed && <MediaButton isScrolling={isScrolling} talkURL={talkUrl} />}
    </>
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

const $linksContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "50%",
}

const $nameText: TextStyle = {
  fontSize: 22,
  lineHeight: 24.2,
  marginBottom: spacing.tiny,
}

const $subheadingColor: TextStyle = {
  color: colors.palette.primary500,
}

const $detailsContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $speakerImage: ImageStyle = {
  height: 315,
}

const $companyNameText: TextStyle = {
  ...$subheadingColor,
  fontSize: 16,
  lineHeight: 22.4,
}

const $detailsText: TextStyle = {
  fontSize: 26,
  lineHeight: 28.6,
  ...$containerSpacing,
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

const $talkBlob: ImageStyle = {
  bottom: spacing.extraLarge * 2.25,
  right: -spacing.extraLarge + spacing.extraSmall,
  position: "absolute",
}

const $talkCurve: ImageStyle = {
  position: "absolute",
  left: -spacing.large,
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
