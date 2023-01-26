import React, { useEffect, useRef, useState } from "react"
import { View, ViewToken as RNViewToken, ViewStyle, Dimensions, TextStyle } from "react-native"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated"
import { useIsFocused } from "@react-navigation/native"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard, { ScheduleCardProps, Variants } from "./ScheduleCard"
import { formatDate } from "../../utils/formatDate"
import { useAppNavigation, useAppState } from "../../hooks"
import { format, isAfter, isBefore } from "date-fns"

import { createScheduleScreenData } from "../../services/api/webflow-helpers"
import { Button, Icon } from "../../components"

export interface Schedule {
  date: string
  title: string
  events: ScheduleCardProps[]
}

const { width } = Dimensions.get("window")

/** Get the current time's event index */
const getCurrentEventIndex = (schedule: Schedule, currentTime = new Date()) => {
  return schedule?.events?.findIndex((e) => isAfter(new Date(e.startTime), currentTime))
}

/** Get the current date's schedule list index */
const getCurrentScheduleIndex = (schedules: Schedule[], currentTime = new Date()) => {
  const currentDate = format(currentTime, "yyyy-MM-dd")
  return schedules.map((x) => x.date).findIndex((date) => date === currentDate)
}

export const ScheduleScreen: React.FC<TabScreenProps<"Schedule">> = () => {
  const [currentlyViewingEvents, setCurrentlyViewingEvents] = useState([])
  const [currentlyViewingScheduleIndex, setCurrentlyViewingScheduleIndex] = useState(0)

  const schedules = createScheduleScreenData()
  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule>(schedules[0])

  useHeader({ title: formatDate(selectedSchedule.date, "EE, MMMM dd") }, [selectedSchedule])

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

  // const date = new Date()
  const date = new Date("2023-05-18T16:30:00.000Z")
  const scheduleIndex = getCurrentScheduleIndex(schedules, new Date(date))
  const schedule = schedules[scheduleIndex]
  const eventIndex = getCurrentEventIndex(schedule, new Date(date))

  // const scrollButtonOpacity = useSharedValue(0)
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
      console.tron.log({ currentIndex })

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

  console.tron.log({ schedule, eventIndex })

  const navigateToCurrentEvent = React.useCallback(() => {
    // Check if current date is in list of conference days
    // If it is, navigate to that schedule's day
    // If not, just skip and pick up where the user left off
    if (scheduleIndex > -1) {
      setTimeout(() => {
        onItemPress(scheduleIndex)
      }, 100)
    }

    // Scroll to the proper time of day talk
    setTimeout(() => {
      if (eventIndex > -1) {
        scheduleListRefs[schedule?.date]?.current?.scrollToIndex({
          animated: true,
          index: eventIndex,
        })
      }
    }, 200)
  }, [onItemPress, scheduleListRefs, scheduleIndex, eventIndex])

  // When app comes from the background to the foreground, focus on the current day in the schedule
  useAppState({
    match: /background/,
    nextAppState: "active",
    callback: () => {
      setTimeout(() => {
        if (eventIndex > -1) {
          navigateToCurrentEvent()
        }
      }, 250)
    },
  })

  useEffect(() => {
    if (eventIndex > -1) {
      navigateToCurrentEvent()
    }
  }, [eventIndex, scheduleIndex])

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

  const handleViewableEventIndexChanged = useRef(
    ({ viewableItems }: { viewableItems: RNViewToken[] }) => {
      setCurrentlyViewingEvents(viewableItems.map((item) => item.index))
    },
  ).current

  const handleViewableScheduleIndexChanged = useRef(
    ({ viewableItems }: { viewableItems: RNViewToken[] }) => {
      setCurrentlyViewingScheduleIndex(viewableItems[0]?.index ?? 0)
    },
  ).current

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
          onViewableItemsChanged={handleViewableScheduleIndexChanged}
          bounces={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          renderItem={({ item: schedule }) => (
            <View style={[$container, { width }]}>
              <FlashList
                ref={scheduleListRefs[schedule.date]}
                data={schedule.events}
                renderItem={({ item }: { item: ScheduleCardProps }) => {
                  const {
                    startTime,
                    formattedStartTime,
                    formattedEndTime,
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

                  const isPast = isBefore(new Date(startTime), date)

                  return (
                    <View style={$cardContainer}>
                      <ScheduleCard
                        variant={item.variant as Variants}
                        {...{
                          formattedStartTime,
                          formattedEndTime,
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
                // To achieve better performance, specify the type based on the item
                getItemType={(item) => item.variant}
                estimatedItemSize={225}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                  scheduleIndex === currentlyViewingScheduleIndex ? $list : $buttonHidden
                }
                scrollEventThrottle={16}
                onViewableItemsChanged={handleViewableEventIndexChanged}
              />
            </View>
          )}
        />
      </View>
      <ScheduleDayPicker {...{ scrollX, onItemPress, schedules, selectedSchedule }} />
      <Animated.View style={$scrollButtonContainer}>
        {scheduleIndex === currentlyViewingScheduleIndex &&
          eventIndex > -1 &&
          currentlyViewingEvents[0] !== eventIndex && (
            <Button
              LeftAccessory={() => (
                <Icon
                  icon={Math.min(...currentlyViewingEvents) > eventIndex ? "arrowUp" : "arrowDown"}
                  color={colors.palette.primary500}
                />
              )}
              preset="reversed"
              style={$scrollButton}
              text="scroll to current"
              textStyle={$scrollButtonText}
              onPress={() => navigateToCurrentEvent()}
            />
          )}
      </Animated.View>
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

const $list: ContentStyle = {
  paddingTop: 48 + spacing.extraLarge + spacing.extraSmall,
  paddingBottom: 48 + spacing.medium,
}

const $buttonHidden: ContentStyle = {
  paddingTop: spacing.extraLarge,
  paddingBottom: 48 + spacing.medium,
}

const $cardContainer: ViewStyle = {
  paddingBottom: spacing.large,
}

const $scrollButtonContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  alignSelf: "center",
}

const $scrollButton: ViewStyle = {
  borderColor: colors.palette.primary300,
  marginTop: spacing.extraSmall,
  paddingVertical: spacing.small,
}

const $scrollButtonText: TextStyle = {
  color: colors.palette.primary500,
  marginLeft: spacing.small + spacing.micro,
}
