import React, { FC } from "react"
import { ViewStyle, View, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import { Text, MIN_HEADER_HEIGHT, Screen, Carousel, DynamicCarouselItem } from "../../components"
import { colors, spacing } from "../../theme"
import { TalkDetailsHeader } from "./TalkDetailsHeader"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useScheduledEvents } from "../../services/api"
import { formatDate } from "../../utils/formatDate"

export const SpeakerPanelScreen: FC<StackScreenProps<AppStackParamList, "SpeakerPanel">> = ({
  route: { params },
}) => {
  const scrollY = useSharedValue(0)
  const [headingHeight, setHeadingHeight] = React.useState(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  const { bottom: paddingBottom } = useSafeAreaInsets()

  const { data: scheduleData } = useScheduledEvents()
  const schedule = scheduleData?.find((s) => s._id === params?.scheduleId)

  if (!schedule) return null

  const title = schedule.type
  const subtitle = formatDate(schedule["day-time"], "MMMM dd, h:mm aaa")
  const description = schedule.talk?.description

  const carouselData = schedule?.talk?.["speaker-s"].map((speaker) => ({
    image: { uri: speaker["speaker-photo"].url },
    imageStyle: { height: 320 },
    isSpeakerPanel: true,
    subtitle: speaker.name,
    label: speaker.company,
    body: speaker["speaker-bio"],
    socialLinks: {
      twitter: speaker.twitter,
      github: speaker.github,
      externalURL: speaker["external-url"],
    },
  })) as DynamicCarouselItem[]

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

          <View>
            <Text text="Talk details" preset="bold" style={$speakerPanelTitle} />
            <Text text={description} style={$speakerPanelDescription} />
            <Text text="Panelists" preset="bold" style={$detailsText} />
            <View style={{ marginHorizontal: -spacing.large }}>
              <Carousel preset="dynamic" data={carouselData} />
            </View>
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

const $detailsText: TextStyle = {
  fontSize: 26,
  lineHeight: 28.6,
}

const $detailsTitleText: TextStyle = {
  ...$detailsText,
  ...$containerSpacing,
}

const $speakerPanelTitle: TextStyle = {
  marginTop: spacing.medium,
  ...$detailsTitleText,
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
