import { observer } from "mobx-react-lite"
import React, { FC, MutableRefObject } from "react"
import { Dimensions, Pressable, TextStyle, View, ViewStyle } from "react-native"
import Animated, {
  useAnimatedStyle,
  SharedValue,
  interpolate,
  interpolateColor,
} from "react-native-reanimated"
import { useStores } from "../../models"
import { colors, spacing, typography } from "../../theme"
import { reportCrash } from "../../utils/crashReporting"
import { formatDate } from "../../utils/formatDate"

const { width } = Dimensions.get("window")

type AnimatedDayButtonProps = {
  onPress: () => void
  index: number
  text: string
  scrollX: SharedValue<number>
  inputRange: number[]
}

const AnimatedDayButtonRef = React.forwardRef(
  (props: AnimatedDayButtonProps, ref: MutableRefObject<View>) => {
    const { onPress, index, text, scrollX, inputRange } = props
    const { schedulesStore } = useStores()
    const { schedules } = schedulesStore
    const outputRange = schedules.map((_, scheduleIndex) =>
      index === scheduleIndex ? colors.palette.neutral900 : colors.palette.neutral100,
    )

    const $animatedTextStyle = useAnimatedStyle(() => {
      const color = interpolateColor(scrollX.value, inputRange, outputRange)

      return { color }
    })

    return (
      <Pressable {...{ ref, onPress }} style={$buttonStyle}>
        <Animated.Text style={[$textStyle, $animatedTextStyle]}>{text}</Animated.Text>
      </Pressable>
    )
  },
)

AnimatedDayButtonRef.displayName = "AnimatedDayButton"
const AnimatedDayButton = observer(AnimatedDayButtonRef)

type ScheduleDayPickerProps = {
  scrollX: SharedValue<number>
  onItemPress: (itemIndex) => void
}

export const ScheduleDayPicker: FC<ScheduleDayPickerProps> = observer(function ScheduleDayPicker({
  scrollX,
  onItemPress,
}) {
  const { schedulesStore } = useStores()
  const { schedules, selectedSchedule } = schedulesStore
  const wrapperWidth = width - spacing.extraSmall * 2
  const widthSize = wrapperWidth / schedules.length
  const index = schedules.findIndex((s) => s.date === selectedSchedule.date)

  const containerRef = React.useRef()
  const [measures, setMeasures] = React.useState([{ x: 0 }, { x: 0 }, { x: 0 }])
  const itemRefs = schedules.map((_) => React.createRef<View>())

  const onLayout = React.useCallback(() => {
    const m = []
    schedules.every((_, index) => {
      itemRefs[index].current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height })

          if (m.length === schedules.length) {
            setMeasures(m)
          }
        },
        () => {
          reportCrash("ScheduleDayPicker-unable to measureLayout")
        },
      )
      return true
    })
  }, [itemRefs])

  const inputRange = schedules.map((_, index) => index * width)

  const $animatedLeftStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      measures.map((measure) => measure.x + (index - spacing.micro)),
    )

    return {
      transform: [{ translateX }],
      width: widthSize,
    }
  }, [inputRange, scrollX, measures])

  return (
    <View ref={containerRef} style={$wrapperStyle} onLayout={onLayout}>
      {measures.length > 0 && <Animated.View style={[$animatedViewStyle, $animatedLeftStyle]} />}
      {schedules.map((schedule, index) => (
        <AnimatedDayButton
          key={schedule.date}
          ref={itemRefs[index]}
          onPress={() => {
            onItemPress(index)
          }}
          text={formatDate(schedule.date, "EE")}
          {...{ index, scrollX, inputRange }}
        />
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
  fontFamily: typography.primary.medium,
  fontSize: 16,
  lineHeight: 22.4,
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
