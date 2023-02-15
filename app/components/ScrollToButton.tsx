import React, { useRef } from "react"
import { ViewStyle, ViewToken, TextStyle } from "react-native"
import { Button, ButtonProps, Icon } from "../components"
import { colors, spacing } from "../theme"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

export interface ScrollToButtonProps extends ButtonProps, ReturnType<typeof useScrollToEvent> {
  navigateToCurrentEvent: () => void
}

export function useScrollToEvent(scheduleIndex) {
  const currentEventIndex = useSharedValue(-1)
  const currentlyViewingEvents = useSharedValue<number[]>([])
  const currentlyViewingSchedule = useSharedValue(0)

  const handleViewableEventIndexChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      currentlyViewingEvents.value = viewableItems.map((item) => item.index)
    },
  ).current

  const handleViewableScheduleIndexChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      currentlyViewingSchedule.value = viewableItems[0]?.index ?? 0
    },
  ).current

  const scrollButtonOpacity = useDerivedValue(() => {
    return withSpring(
      scheduleIndex === currentlyViewingSchedule.value &&
        currentEventIndex.value > -1 &&
        currentlyViewingEvents.value[0] !== currentEventIndex.value
        ? 1
        : 0,
    )
  }, [scheduleIndex])

  const $scrollButtonStyle = useAnimatedStyle(() => ({
    opacity: scrollButtonOpacity.value,
  }))

  const $arrowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          Number(Math.min(...currentlyViewingEvents.value) > currentEventIndex.value),
          [0, 1],
          [0, 180],
        )}deg`,
      },
    ],
  }))

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
          <Animated.View style={$arrowStyle}>
            <Icon icon="arrowDown" size={24} color={colors.palette.primary500} />
          </Animated.View>
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
