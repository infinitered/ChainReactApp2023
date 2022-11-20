import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Dimensions, Pressable, TextStyle, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, SharedValue, interpolate } from "react-native-reanimated"
import { Text } from "../../components"
import { useStores } from "../../models"
import { colors, spacing } from "../../theme"
import { formatDate } from "../../utils/formatDate"

type Props = {
  scrollX: SharedValue<number>
  onItemPress: (itemIndex) => void
}

const { width } = Dimensions.get("window")

export const ScheduleDayPicker: FC<Props> = observer(function ScheduleDayPicker({
  scrollX,
  onItemPress,
}) {
  const { schedulesStore } = useStores()
  const { setSelectedSchedule, schedules, selectedSchedule } = schedulesStore
  const wrapperWidth = width - spacing.extraSmall * 2
  const widthSize = wrapperWidth / schedules.length

  const inputRange = schedules.map((_, index) => index * width)
  console.log({ inputRange, scrollX: scrollX.value })

  const translateX = interpolate(
    scrollX.value,
    inputRange,
    schedules.map((_, index) => widthSize * index),
  )

  const $animatedLeftStyle = useAnimatedStyle(() => {
    return {
      // left: clamp(scrollX.value - (spacing.small * index) / 2, 0, widthSize),
      // left,
      transform: [{ translateX }],
      width: widthSize,
    }
  })

  return (
    <View style={$wrapperStyle}>
      <Animated.View style={[$animatedViewStyle, $animatedLeftStyle]} />
      {schedules.map((schedule, index) => (
        <Pressable
          key={schedule.date}
          onPress={() => {
            // onItemPress(index)
            // leftValue.value = widthSize * index
            // setTimeout(() => setSelectedSchedule(schedule), 250)
            setSelectedSchedule(schedule)
          }}
          style={$buttonStyle}
        >
          <Text
            preset="companionHeading"
            style={[$textStyle, selectedSchedule.date === schedule.date && $textSelectedStyle]}
          >
            {formatDate(schedule.date, "EE")}
          </Text>
        </Pressable>
      ))}
    </View>
  )
})

const $animatedViewStyle: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderRadius: 100,
  height: "100%",
  position: "absolute",
}

const $buttonBaseStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral500,
  borderColor: colors.palette.primary500,
  borderRadius: 100,
  minHeight: 48,
}

const $textStyle: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 16,
  lineHeight: 22.4,
}

const $textSelectedStyle: TextStyle = {
  color: colors.palette.neutral900,
}

const $wrapperStyle: ViewStyle[] = [
  $buttonBaseStyle,
  {
    borderWidth: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: spacing.extraSmall,
    left: 0,
    marginHorizontal: spacing.extraSmall,
    right: 0,
  },
]

const $buttonStyle: ViewStyle[] = [
  $buttonBaseStyle,
  {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
]
