import React, { FC } from "react"
import { ViewStyle, View, TextStyle, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import { Text, MIN_HEADER_HEIGHT, Screen, Carousel, AutoImage, IconButton } from "../../components"
import { colors, spacing } from "../../theme"
import { TalkDetailsHeader } from "./TalkDetailsHeader"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useScheduledEvents } from "../../services/api"
import { formatDate } from "../../utils/formatDate"
import { DynamicCarouselItem } from "../../components/carousel/carousel.types"
import { translate } from "../../i18n"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"

export const WorkshopDetailsScreen: FC<StackScreenProps<AppStackParamList, "WorkshopDetails">> = ({
  route: { params },
}) => {
  const scrollY = useSharedValue(0)
  const onPress = (url) => openLinkInBrowser(url)
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

  const title = schedule.workshop?.name
  const subtitle = formatDate(schedule["day-time"], "MMMM dd, h:mm aaa")
  const description = schedule.workshop?.abstract
  const instructors = schedule.workshop?.["instructor-s-2"]
  const assistants = schedule.workshop?.assistants

  const carouselData = instructors.map((speaker) => ({
    speakerPanelOrWorkshop: true,
    image: { uri: speaker["speaker-photo"].url },
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
            <Text
              text={`${schedule.type} details`}
              preset="boldHeading"
              style={$speakerPanelTitle}
            />
            <Text text={description} style={$speakerPanelDescription} />
            <Text
              preset="boldHeading"
              tx="workshopDetailsScreen.instructor"
              txOptions={{ count: instructors.length }}
            />
            <View style={{ marginHorizontal: -spacing.large }}>
              <Carousel preset="dynamic" data={carouselData} />
            </View>

            {assistants?.length && (
              <View style={$assistantContainer}>
                <Text
                  preset="listHeading"
                  text={translate("talkDetailsScreen.assistingTheWorkshop")}
                  style={$assistantHeading}
                />
                <View
                  style={
                    assistants.length < 2
                      ? $assistantsContainerWithOne
                      : $assistantsContainerWithMore
                  }
                >
                  {assistants.map((assistant) => (
                    <View style={$assistant} key={assistant._id}>
                      <AutoImage
                        source={{ uri: assistant["speaker-photo"].url }}
                        style={$assistantImage}
                      />
                      <Text preset="companionHeading" text={assistant.name} />
                      <Text preset="label" style={$assistantCompany} text={assistant.company} />
                      <View style={$assistantLinks}>
                        <IconButton
                          icon={assistant.twitter ? "twitter" : "link"}
                          onPress={() => onPress(assistant.twitter || assistant.externalURL)}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
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

const $assistantsContainerWithOne: ViewStyle = {
  flexDirection: "row",
  marginStart: spacing.large,
}

const $assistantsContainerWithMore: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
}

const $assistantContainer: ViewStyle = {
  marginTop: spacing.large,
  marginBottom: spacing.huge,
}

const $assistant: ViewStyle = {
  alignItems: "center",
}

const $assistantHeading: TextStyle = {
  marginVertical: spacing.large,
}

const $assistantImage: ImageStyle = {
  height: 90,
  width: 90,
  aspectRatio: 1,
  borderRadius: 100,
  marginBottom: spacing.large,
}

const $assistantCompany: TextStyle = {
  marginTop: spacing.tiny,
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $assistantLinks: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.large,
}
