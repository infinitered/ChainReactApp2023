import React, { useEffect, useLayoutEffect, useMemo } from "react"
import {
  AccessibilityInfo,
  ActivityIndicator,
  View,
  ViewStyle,
  Dimensions,
  findNodeHandle,
  RefreshControl,
  TextStyle,
} from "react-native"
import { FlashList, ContentStyle } from "@shopify/flash-list"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated"
import { useIsFocused } from "@react-navigation/native"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useAppState, useCurrentDate, useHeader } from "../../hooks"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard, { ScheduleCardProps } from "./ScheduleCard"
import { parseDate } from "../../utils/formatDate"
import { format, isAfter } from "date-fns"
import { useScheduleScreenData } from "../../services/api/webflow-api"
import { ScrollToButton, Text, useScrollToEvent } from "../../components"
import { isConferencePassed } from "../../utils/isConferencePassed"
import * as Device from "expo-device"
import messaging from "@react-native-firebase/messaging"
import { translate } from "../../i18n"

export interface Schedule {
  date: string
  title: string
  events: ScheduleCardProps[]
}

const BUTTON_HEIGHT = 48
const { width } = Dimensions.get("window")

/** Get the current time's event index */
const getCurrentEventIndex = (schedule: Schedule, currentTime = new Date()) => {
  const nextIndex = schedule?.events?.findIndex((e) => isAfter(new Date(e.startTime), currentTime))
  return nextIndex === 0 ? nextIndex : nextIndex - 1
}

/** Get the current date's schedule list index */
const getCurrentScheduleIndex = (schedules: Schedule[], currentTime = new Date()) => {
  const currentDate = format(currentTime, "yyyy-MM-dd")
  return schedules.map((x) => x.date).findIndex((date) => date === currentDate)
}

const requestUserPermission = async () => {
  if (!Device.isDevice) return
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  if (enabled) {
    // handle enabled state
  }
}

export const ScheduleScreen: React.FC<TabScreenProps<"Schedule">> = () => {
  const {
    isLoading,
    isRefetching,
    schedules,
    refetch: refetchScheduleScreenData,
  } = useScheduleScreenData()
  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule>(schedules[0])

  useHeader({ title: format(parseDate(selectedSchedule.date), "EE, MMMM dd") }, [selectedSchedule])

  const getScheduleIndex = React.useCallback(
    () => schedules.findIndex((schedule) => schedule.date === selectedSchedule.date),
    [schedules, selectedSchedule],
  )

  const hScrollRef = React.useRef<Animated.FlatList<Schedule>>(null)
  const scheduleListRefs = React.useRef(
    Object.fromEntries(
      schedules.map((s) => [s.date, React.createRef<FlashList<ScheduleCardProps>>()]),
    ),
  ).current
  const eventRefs = useMemo(() => {
    // create object with keys of schedule index and values of arrays of view refs for each event
    return Object.fromEntries(
      schedules.map((s) => [s.date, s.events.map(() => React.createRef<View>())]),
    )
  }, [schedules])

  const date = useCurrentDate()
  const isConfOver = isConferencePassed(date)

  const scheduleIndex = getCurrentScheduleIndex(schedules, date)
  const schedule = schedules[scheduleIndex]
  const eventIndex = getCurrentEventIndex(schedule, date)

  const scrollToButtonProps = useScrollToEvent({
    lastEventIndex: schedule?.events?.length - 1,
    scheduleIndex,
  })
  const { currentEventIndex, handleViewableEventIndexChanged, handleViewableScheduleIndexChanged } =
    scrollToButtonProps

  const scrollX = useSharedValue(0)
  const isFocused = useIsFocused()

  const updateSchedule = React.useCallback(
    (index: number) => {
      setSelectedSchedule(schedules[index])
    },
    [schedules],
  )

  const onItemPress = React.useCallback(
    (itemIndex: number) => {
      const currentIndex = getScheduleIndex()

      if (currentIndex === itemIndex) {
        scheduleListRefs[schedules[currentIndex].date]?.current?.scrollToOffset({
          animated: true,
          offset: 0,
        })
      } else {
        ;(hScrollRef?.current as unknown as FlashList<Schedule>)?.scrollToOffset({
          offset: itemIndex * width,
        })
      }
    },
    [hScrollRef, getScheduleIndex],
  )

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
        const scheduleListRef = scheduleListRefs[schedule?.date]?.current
        const eventNodeHandle = findNodeHandle(eventRefs[schedule?.date][eventIndex]?.current)
        eventNodeHandle && AccessibilityInfo.setAccessibilityFocus(eventNodeHandle)

        scheduleListRef?.scrollToIndex({
          animated: true,
          index: eventIndex,
        })
        // Focus the screen reader on the current list item
      }
    }, 200)
  }, [onItemPress, scheduleListRefs, scheduleIndex, eventIndex, eventRefs])

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
      currentEventIndex.value = eventIndex
      navigateToCurrentEvent()
    }
  }, [eventIndex, scheduleIndex])

  useLayoutEffect(() => {
    requestUserPermission()
  }, [])

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

  const renderSchedule = React.useCallback(
    ({ index, item: schedule }: { index: number; item: Schedule }) => (
      <>
        {index === 0 && (
          <View style={$workshopBanner}>
            <Text style={$workshopBannerText}>{translate("scheduleScreen.workshopBanner")}</Text>
          </View>
        )}
        <View style={[$container, { width }]}>
          <FlashList<ScheduleCardProps>
            data={schedule.events}
            estimatedItemSize={242}
            estimatedListSize={{ height: schedules.length * 242, width }}
            // To achieve better performance, specify the type based on the item
            getItemType={(item) => item.variant}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={handleViewableEventIndexChanged}
            ref={scheduleListRefs[schedule.date]}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            viewabilityConfig={{ itemVisiblePercentThreshold: 1, minimumViewTime: 100 }}
            contentContainerStyle={
              scheduleIndex === index && eventIndex !== 0 ? $list : $listWithoutButton
            }
            renderItem={({ item, index: itemIndex }) => (
              <View style={$cardContainer}>
                <ScheduleCard
                  {...item}
                  isPast={
                    index < scheduleIndex ||
                    (index === scheduleIndex && itemIndex < eventIndex) ||
                    isConfOver
                  }
                />
              </View>
            )}
            refreshControl={
              <RefreshControl
                onRefresh={refetchScheduleScreenData}
                refreshing={isRefetching}
                tintColor={colors.palette.neutral100}
              />
            }
          />
        </View>
      </>
    ),
    [scheduleIndex, eventIndex, isConfOver, isFocused],
  )

  if (!selectedSchedule) return null

  return (
    <>
      <View style={$root}>
        {isLoading && (
          <ActivityIndicator color={colors.tint} size="large" style={$activityIndicator} />
        )}
        {!isLoading && schedules && (
          <Animated.FlatList<Schedule>
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
            renderItem={renderSchedule}
          />
        )}
      </View>
      <ScheduleDayPicker
        {...{ scrollX, onItemPress }}
        scheduleDates={schedules.map((s) => parseDate(s.date))}
        selectedScheduleDate={parseDate(selectedSchedule.date)}
      />
      <ScrollToButton navigateToCurrentEvent={navigateToCurrentEvent} {...scrollToButtonProps} />
    </>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $activityIndicator: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $list: ContentStyle = {
  paddingTop: BUTTON_HEIGHT + spacing.extraLarge + spacing.extraSmall,
  paddingBottom: BUTTON_HEIGHT + spacing.medium,
}

const $listWithoutButton: ContentStyle = {
  paddingTop: spacing.extraLarge,
  paddingBottom: BUTTON_HEIGHT + spacing.medium,
}

const $cardContainer: ViewStyle = {
  paddingBottom: spacing.large,
}

const $workshopBanner: ViewStyle = {
  backgroundColor: colors.palette.primary400,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.extraSmall,
}

const $workshopBannerText: TextStyle = {
  color: colors.palette.neutral800,
}
