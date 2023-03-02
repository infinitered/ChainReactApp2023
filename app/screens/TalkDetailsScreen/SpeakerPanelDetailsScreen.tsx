import React, { FC } from "react"
import { ViewStyle, View, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import { Text, MIN_HEADER_HEIGHT, Screen, Carousel, MediaButton } from "../../components"
import { colors, spacing } from "../../theme"
import { TalkDetailsHeader } from "./TalkDetailsHeader"
import Animated from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useScheduledEvents } from "../../services/api"
import { formatDate } from "../../utils/formatDate"
import { DynamicCarouselItem } from "../../components/carousel/carousel.types"
import { useFloatingActionEvents, useScrollY } from "../../hooks"
import { isFuture, parseISO } from "date-fns"

export const SpeakerPanelDetailsScreen: FC<
  StackScreenProps<AppStackParamList, "SpeakerPanelDetails">
> = ({ route: { params } }) => {
  const [headingHeight, setHeadingHeight] = React.useState(0)

  const { isScrolling, scrollHandlers } = useFloatingActionEvents()
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const { scrollY, scrollHandler } = useScrollY()

  const { data: scheduleData } = useScheduledEvents()
  const schedule = scheduleData?.find((s) => s._id === params?.scheduleId)

  if (!schedule) return null

  const title = schedule.type
  const subtitle = formatDate(schedule["day-time"], "MMMM dd, h:mm aaa")
  const description = schedule.talk?.description

  const talkUrl = schedule?.talk?.["talk-url"]
  const eventTime = schedule?.["day-time"]

  const carouselData = schedule?.talk?.["speaker-s"].map((speaker) => ({
    image: { uri: speaker["speaker-photo"].url },
    speakerPanelOrWorkshop: true,
    imageStyle: { height: 320 },
    subtitle: speaker.name,
    label: speaker.company,
    body: speaker["speaker-bio"],
    socialButtons: [
      { url: speaker.twitter, icon: "twitter" },
      { url: speaker.github, icon: "github" },
      { url: speaker.externalURL, icon: "link" },
    ],
  })) as DynamicCarouselItem[]

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

            <View>
              <Text text="Talk details" preset="boldHeading" style={$speakerPanelTitle} />
              <Text text={description} style={$speakerPanelDescription} />
              <Text text="Panelists" preset="boldHeading" />
              <View style={{ marginHorizontal: -spacing.large }}>
                <Carousel preset="dynamic" data={carouselData} carouselCardVariant="speaker" />
              </View>
            </View>
          </View>
        </Animated.ScrollView>
      </Screen>
      {talkUrl && isEventPassed && <MediaButton talkURL={talkUrl} isScrolling={isScrolling} />}
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

const $speakerPanelTitle: TextStyle = {
  marginTop: spacing.medium,
  ...$containerSpacing,
}

const $speakerPanelDescription: TextStyle = {
  marginBottom: spacing.huge,
}

const $title: TextStyle = {
  marginTop: spacing.extraLarge,
  marginBottom: spacing.extraSmall,
}

const $subtitle: TextStyle = {
  color: colors.palette.primary500,
}

const $headingContainer: ViewStyle = {
  marginBottom: spacing.extraLarge,
}
