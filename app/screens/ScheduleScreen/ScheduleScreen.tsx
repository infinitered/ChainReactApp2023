import React from "react"
import { View, TextStyle, ViewStyle, Dimensions } from "react-native"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated"
import { useIsFocused } from "@react-navigation/native"
import { Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard, { ScheduleCardProps, Variants } from "./ScheduleCard"
import { formatDate } from "../../utils/formatDate"
import { useAppNavigation, useAppState } from "../../hooks"
import { format, isBefore } from "date-fns"

import { createScheduleScreenData } from "../../services/api/webflow-helpers"

export interface Schedule {
  date: string
  title: string
  events: ScheduleCardProps[]
}

const { width } = Dimensions.get("window")

export const ScheduleScreen: React.FC<TabScreenProps<"Schedule">> = () => {
  useHeader({ title: "Schedule" })

  const schedules = createScheduleScreenData()
  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule>(schedules[0])
  const getScheduleIndex = React.useCallback(
    () => schedules.findIndex((schedule) => schedule.date === selectedSchedule.date),
    [schedules, selectedSchedule],
  )

  const navigation = useAppNavigation()
  const hScrollRef = React.useRef(null)
  const scheduleListRefs = React.useMemo(() => {
    return Object.fromEntries(
      schedules.map((s) => [s.date, React.createRef<FlashList<ScheduleCardProps>>()]),
    )
  }, [])

  const currentDate = format(new Date(), "yyyy-MM-dd")
  const currentHour = new Date().getHours().toString()

  const scrollX = useSharedValue(0)
  const isFocused = useIsFocused()

  const updateSchedule = React.useCallback(
    (index) => {
      setSelectedSchedule(schedules[index])
    },
    [schedules],
  )

  const onItemPress = React.useCallback(
    (itemIndex) => {
      const currentIndex = getScheduleIndex()
      if (currentIndex === itemIndex) {
        scheduleListRefs[schedules[currentIndex].date]?.current?.scrollToOffset({
          animated: true,
          offset: 0,
        })
      } else {
        hScrollRef?.current?.scrollToOffset({ offset: itemIndex * width })
      }
    },
    [hScrollRef, getScheduleIndex],
  )

  const navigateToCurrentDay = React.useCallback(() => {
    // Check if current date is in list of conference days
    // If it is, navigate to that schedule's day
    // If not, just skip and pick up where the user left off
    const conferenceDates = schedules.map((x) => x.date)
    const scheduleIndex = conferenceDates.findIndex((date) => date === currentDate)

    if (scheduleIndex > -1) {
      setTimeout(() => {
        onItemPress(scheduleIndex)
      }, 100)
    }

    // Scroll to the proper time of day talk
    setTimeout(() => {
      const schedule = schedules[scheduleIndex]
      const eventIndex = schedule?.events?.findIndex((e) =>
        e.formattedStartTime.startsWith(currentHour),
      )
      if (eventIndex > -1) {
        scheduleListRefs[schedule?.date]?.current?.scrollToIndex({
          animated: true,
          index: eventIndex,
        })
      }
    }, 200)
  }, [onItemPress, scheduleListRefs, schedules, currentDate, currentHour])

  // When app comes from the background to the foreground, focus on the current day in the schedule
  useAppState({
    match: /background/,
    nextAppState: "active",
    callback: () => {
      setTimeout(() => {
        navigateToCurrentDay()
      }, 250)
    },
  })

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        scrollX.value = event.contentOffset.x

        // ! The below code would have been written in onMomentumEnd, but there is an Android issue: https://github.com/facebook/react-native/issues/21718
        const contentOffset = event.contentOffset

        // Divide the horizontal offset by the width of the view to see which page is visible
        const adjustedWidth = width - spacing.large * 2
        const index = Math.floor(contentOffset.x / adjustedWidth)

        // ! isFocused check for iOS, see details here: https://github.com/software-mansion/react-native-screens/issues/1183
        if (isFocused) {
          runOnJS(updateSchedule)(index)
        }
      },
    },
    [isFocused],
  )

  if (!selectedSchedule) return null

  return (
    <>
      <View style={$root}>
        <Animated.FlatList
          ref={hScrollRef}
          data={schedules}
          keyExtractor={(item) => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          bounces={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          renderItem={({ item: schedule }) => (
            <View style={[$container, { width }]}>
              <FlashList
                ref={scheduleListRefs[schedule.date]}
                ListHeaderComponent={
                  <View style={$headingContainer}>
                    <Text preset="screenHeading">{formatDate(schedule.date, "EE, MMMM dd")}</Text>
                    <Text style={$subheading}>{schedule.title}</Text>
                  </View>
                }
                data={schedule.events}
                renderItem={({ item }: { item: ScheduleCardProps }) => {
                  const {
                    startTime,
                    formattedStartTime,
                    endTime,
                    eventTitle,
                    heading,
                    subheading,
                    sources,
                    level,
                    id,
                  } = item
                  const onPress =
                    item.variant !== "recurring"
                      ? () => navigation.navigate("TalkDetails")
                      : undefined

                  // Temporary time for testing. Without this, the isPast check will always return false since the startTime is in the future
                  const tempTime = "2023-05-18T20:30:00.000Z"
                  // TODO: Remove tempTime and the line below after testing
                  const isPast = isBefore(new Date(startTime), new Date(tempTime))
                  // TODO: Uncomment the line below after testing
                  // const isPast = isBefore(new Date(startTime), new Date())
                  return (
                    <View style={$cardContainer}>
                      <ScheduleCard
                        variant={item.variant as Variants}
                        {...{
                          formattedStartTime,
                          endTime,
                          eventTitle,
                          heading,
                          subheading,
                          onPress,
                          sources,
                          level,
                          id,
                          isPast,
                        }}
                      />
                    </View>
                  )
                }}
                getItemType={(item) => {
                  // To achieve better performance, specify the type based on the item
                  return item.variant
                }}
                estimatedItemSize={225}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={$list}
              />
            </View>
          )}
        />
      </View>
      <ScheduleDayPicker {...{ scrollX, onItemPress, schedules, selectedSchedule }} />
    </>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $subheading: TextStyle = {
  color: colors.palette.primary500,
}

const $list: ContentStyle = {
  paddingTop: spacing.extraLarge,
  paddingBottom: 48 + spacing.medium,
}

const $cardContainer: ViewStyle = {
  paddingBottom: spacing.large,
}

const $headingContainer: ViewStyle = {
  paddingBottom: spacing.large,
}
