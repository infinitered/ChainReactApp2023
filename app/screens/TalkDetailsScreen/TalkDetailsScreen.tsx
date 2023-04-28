import React, { FC } from "react"
import { ViewStyle, View, TextStyle, ImageStyle, Image, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import {
  Text,
  MIN_HEADER_HEIGHT,
  BoxShadow,
  Screen,
  MediaButton,
  IconProps,
  Carousel,
} from "../../components"
import { colors, spacing } from "../../theme"
import { TalkDetailsHeader } from "./TalkDetailsHeader"
import Animated from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useScheduledEventsData } from "../../services/api"
import { formatDate } from "../../utils/formatDate"
import { isFuture, parseISO } from "date-fns"
import { ScheduledEvent, Speaker } from "../../services/api/webflow-api.types"
import { useFloatingActionEvents, useScrollY } from "../../hooks"
import { SocialButtons } from "../../components/SocialButton"
import { stringOrPlaceholder } from "../../utils/stringOrPlaceholder"
import { DynamicCarouselItem, SocialButtonData } from "../../components/carousel/carousel.types"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"

export type Variants = "workshop" | "talk"

interface TalkDetailsBaseProps {
  /**
   * The title of the talk
   */
  title: string
  /**
   * The location or date of the talk
   */
  subtitle: string
  /**
   * The description of the talk
   */
  description: string
  /**
   * The url of the talk
   */
  talkUrl?: string
  /**
   * The time of the event
   */
  eventTime: string
}

interface TalkDetailsMultipleSpeakersProps extends TalkDetailsBaseProps {
  /**
   * If we have multiple speakers, we show them in a carousel
   */
  isMultipleSpeakers: true
  /**
   * The carousel data
   */
  carouselData?: Array<DynamicCarouselItem>
}

interface TalkDetailsSingleSpeakerProps extends TalkDetailsBaseProps {
  /**
   * The first name of the speaker
   */
  firstName: string
  /**
   * The bio of the speaker
   */
  bio: string
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
   * The social buttons of the speaker
   */
  socialButtons: Array<{ url: string; icon: IconProps["icon"] }>
  /**
   * If we have multiple speakers, we show them in a carousel
   */
  isMultipleSpeakers: false
}

type TalkDetailsProps = TalkDetailsMultipleSpeakersProps | TalkDetailsSingleSpeakerProps

const talkBlob = require("../../../assets/images/talk-shape.png")
const talkCurve = require("../../../assets/images/talk-curve.png")

const SCREEN_WIDTH = Dimensions.get("screen").width

const triviaShowProps = (schedule: ScheduledEvent): TalkDetailsProps => {
  const talk = schedule.talk
  const speakers = [schedule["speaker-2-2"], schedule["speaker-3"], schedule["speaker-3-2"]].filter(
    Boolean,
  )
  return {
    title: schedule["event-title"],
    subtitle: `${formatDate(schedule["day-time"], "MMMM dd, h:mmaaa")} PT`,
    description: stringOrPlaceholder(schedule["event-description"]),
    talkUrl: talk?.["talk-url"],
    eventTime: schedule["day-time"],
    isMultipleSpeakers: true,
    carouselData: speakers.map((speaker: Speaker) => ({
      image: { uri: speaker?.["speaker-photo"].url },
      imageStyle: { height: 320 },
      subtitle: speaker?.name,
      label: speaker?.company,
      body: stringOrPlaceholder(speaker?.["speaker-bio"]),
      socialButtons: [
        { url: speaker?.twitter, icon: "twitter" },
        { url: speaker?.github, icon: "github" },
        { url: speaker?.externalURL || speaker?.website, icon: "link" },
      ],
    })),
  }
}

const talkDetailsProps = (schedule: ScheduledEvent): TalkDetailsProps => {
  const talk = schedule.talk

  if (schedule["event-title"] === WEBFLOW_MAP.triviaShow.title) return triviaShowProps(schedule)

  return {
    title: talk?.name,
    subtitle: `${formatDate(schedule["day-time"], "MMMM dd, h:mmaaa")} PT`,
    description: stringOrPlaceholder(talk?.description),
    talkUrl: talk?.["talk-url"],
    eventTime: schedule["day-time"],
    bio: stringOrPlaceholder(talk?.["speaker-s"][0]["speaker-bio"]),
    imageUrl: talk?.["speaker-s"][0]?.["speaker-photo"].url,
    fullName: talk?.["speaker-s"][0]?.name,
    company: talk?.["speaker-s"][0]?.company,
    firstName: talk?.["speaker-s"][0]["speaker-first-name"],
    socialButtons: [
      { url: talk?.["speaker-s"][0]?.twitter, icon: "twitter" },
      { url: talk?.["speaker-s"][0]?.github, icon: "github" },
      { url: talk?.["speaker-s"][0]?.externalURL, icon: "link" },
    ],
    isMultipleSpeakers: talk?.["speaker-s"].length > 1,
    carouselData: talk?.["speaker-s"].map((speaker) => {
      const socialButtons = [
        { url: speaker?.twitter, icon: "twitter" },
        { url: speaker?.github, icon: "github" },
        { url: speaker?.externalURL, icon: "link" },
      ] as SocialButtonData[]
      const hasSocialButtons = socialButtons.some((button) => button.url)
      return {
        image: { uri: speaker?.["speaker-photo"].url },
        imageStyle: { height: 320 },
        subtitle: speaker?.name,
        label: speaker?.company,
        socialButtons,
        bodyLabel: hasSocialButtons && `Follow ${talk?.["speaker-s"][0]["speaker-first-name"]}`,
      }
    }),
  }
}

type TalkDetailsSingleSpeakerScreenProps = TalkDetailsSingleSpeakerProps & {
  scheduleType: ScheduledEvent["type"]
}

const TalkDetailsSingleSpeaker: React.FunctionComponent<TalkDetailsSingleSpeakerScreenProps> =
  function TalkDetailsSingleSpeaker({
    company,
    description,
    fullName,
    imageUrl,
    scheduleType,
    socialButtons,
  }) {
    const hasSocialButtons = socialButtons.some((button) => button.url)
    return (
      <>
        <View style={$containerSpacing}>
          <Image source={talkCurve} style={$talkCurve} />
          <BoxShadow preset="primary" style={$containerSpacing} offset={6}>
            <Image source={{ uri: imageUrl }} style={$speakerImage} />
          </BoxShadow>
          <Image source={talkBlob} style={$talkBlob} />

          <Text preset="bold" style={$nameText} text={fullName} />
          {company?.length > 0 && <Text style={$companyNameText} text={company} />}
        </View>

        {hasSocialButtons && (
          <View style={$containerSpacing}>
            <View style={$linksContainer}>
              <SocialButtons socialButtons={socialButtons} />
            </View>
          </View>
        )}

        <View style={$detailsContainer}>
          <Text preset="bold" style={$detailsText} text={`${scheduleType} details`} />
          <Text style={$bodyText} text={description} />
        </View>
      </>
    )
  }

type TalkDetailsMultipleSpeakerScreenProps = TalkDetailsMultipleSpeakersProps & {
  scheduleType: ScheduledEvent["type"]
}

const TalkDetailsMultipleSpeakers: React.FunctionComponent<TalkDetailsMultipleSpeakerScreenProps> =
  function TalkDetailsMultipleSpeakers({ carouselData, description, scheduleType }) {
    return (
      <>
        <View style={$detailsContainer}>
          <Text preset="bold" style={$detailsText} text={`${scheduleType} details`} />
          <Text style={$bodyText} text={description} />
        </View>
        <View style={$carouselContainer}>
          <Carousel preset="dynamic" data={carouselData} carouselCardVariant="speaker" />
        </View>
      </>
    )
  }

export const TalkDetailsScreen: FC<StackScreenProps<AppStackParamList, "TalkDetails">> = ({
  route: { params },
}) => {
  const [headingHeight, setHeadingHeight] = React.useState(0)

  const { isScrolling, scrollHandlers } = useFloatingActionEvents()
  const { scrollY, scrollHandler } = useScrollY()
  const { bottom: paddingBottom } = useSafeAreaInsets()

  const { data: scheduleData } = useScheduledEventsData()
  const schedule = scheduleData?.find((s) => s._id === params?.scheduleId)

  if (!schedule) return null

  const { subtitle, title, talkUrl, eventTime, isMultipleSpeakers } = talkDetailsProps(schedule)

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

            {isMultipleSpeakers ? (
              <TalkDetailsMultipleSpeakers
                {...(talkDetailsProps(schedule) as TalkDetailsMultipleSpeakersProps)}
                scheduleType={schedule.type}
              />
            ) : (
              <TalkDetailsSingleSpeaker
                {...(talkDetailsProps(schedule) as TalkDetailsSingleSpeakerProps)}
                scheduleType={schedule.type}
              />
            )}
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
  marginBottom: spacing.large,
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

const $carouselContainer: ViewStyle = {
  marginHorizontal: -spacing.large,
}
