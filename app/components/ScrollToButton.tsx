import React, { useCallback, useRef } from "react"
import { ViewStyle, ViewToken, TextStyle, View } from "react-native"
import { Button, ButtonProps, Icon } from "./"
import { colors, spacing } from "../theme"
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useFocusEffect } from "@react-navigation/native"

export interface ScrollToButtonProps extends ButtonProps, ReturnType<typeof useScrollToEvent> {
  navigateToCurrentEvent: () => void
}

const ARROW_SIZE = 24

export function useScrollToEvent({
  lastEventIndex,
  scheduleIndex,
}: {
  lastEventIndex: number
  scheduleIndex: number
}) {
  const currentEventIndex = useSharedValue(-1)
  const currentlyViewingEvents = useSharedValue<number[]>([])
  const currentlyViewingSchedule = useSharedValue(0)
  const isFocused = useSharedValue(false)

  useFocusEffect(
    useCallback(() => {
      isFocused.value = true
      return () => {
        isFocused.value = false
      }
    }, []),
  )

  const handleViewableEventIndexChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (!isFocused.value) return
      currentlyViewingEvents.value = viewableItems.map((item) => item.index)
    },
  ).current

  const handleViewableScheduleIndexChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      currentlyViewingSchedule.value = viewableItems[0]?.index ?? 0
    },
  ).current

  const scrollButtonOpacity = useDerivedValue(() => {
    const isScheduleVisible = scheduleIndex === currentlyViewingSchedule.value
    const isEventVisible = currentlyViewingEvents.value.includes(currentEventIndex.value)
    const isLastTwoEvents =
      [lastEventIndex, lastEventIndex - 1].includes(currentEventIndex.value) &&
      [lastEventIndex - 2].includes(currentlyViewingEvents.value[0])
    const isEventFirstVisible = currentlyViewingEvents.value[0] === currentEventIndex.value
    const hasCurrentEventIndex = currentEventIndex.value > -1
    const shouldShow = isLastTwoEvents ? !isEventVisible : !isEventFirstVisible
    return isScheduleVisible && hasCurrentEventIndex && shouldShow ? 1 : 0
  }, [lastEventIndex, scheduleIndex])

  const $scrollButtonStyle = useAnimatedStyle(() => ({
    opacity: scrollButtonOpacity.value,
  }))

  const $arrowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotate: withTiming(
            currentlyViewingEvents.value[0] <= currentEventIndex.value ? "0deg" : "180deg",
            { duration: 0 },
          ),
        },
      ],
    }),
    [lastEventIndex],
  )

  return {
    $arrowStyle,
    currentEventIndex,
    currentlyViewingEvents,
    handleViewableEventIndexChanged,
    handleViewableScheduleIndexChanged,
    $scrollButtonStyle,
  }
}

export function ScrollToButton(props: ScrollToButtonProps) {
  const { $arrowStyle, $scrollButtonStyle, navigateToCurrentEvent, ...rest } = props

  return (
    <Animated.View style={[$scrollButtonContainer, $scrollButtonStyle]}>
      <Button
        LeftAccessory={() => (
          <View style={$arrowContainer}>
            <Animated.View style={[$arrow, $arrowStyle]}>
              <Icon icon="arrowDown" size={24} color={colors.palette.primary500} />
            </Animated.View>
          </View>
        )}
        preset="reversed"
        style={$scrollButton}
        text="scroll to current"
        textStyle={$scrollButtonText}
        onPress={navigateToCurrentEvent}
        {...rest}
      />
    </Animated.View>
  )
}

const $scrollButtonContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  alignSelf: "center",
}

const $scrollButton: ViewStyle = {
  borderColor: colors.palette.primary200,
  marginTop: spacing.extraSmall,
  paddingVertical: spacing.small,
}

const $scrollButtonText: TextStyle = {
  color: colors.palette.primary500,
  marginLeft: spacing.small + spacing.micro,
}

const $arrowContainer: ViewStyle = {
  height: ARROW_SIZE,
  width: ARROW_SIZE,
}

const $arrow: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
}
