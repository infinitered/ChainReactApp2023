import { format, isSameDay } from "date-fns"
import React, { FC, MutableRefObject } from "react"
import { Dimensions, Pressable, PressableProps, TextStyle, View, ViewStyle } from "react-native"
import Animated, {
  useAnimatedStyle,
  SharedValue,
  interpolate,
  interpolateColor,
} from "react-native-reanimated"
import { colors, spacing, typography } from "../../theme"
import { reportCrash } from "../../utils/crashReporting"

const { width } = Dimensions.get("window")

interface AnimatedDayButtonProps extends PressableProps {
  onPress: () => void
  index: number
  text: string
  scrollX: SharedValue<number>
  inputRange: number[]
  scheduleDates: Date[]
}

const AnimatedDayButton = React.forwardRef(
  (props: AnimatedDayButtonProps, ref: MutableRefObject<View>) => {
    const { onPress, index, text, scrollX, inputRange, scheduleDates, ...rest } = props
    const outputRange = scheduleDates.map((_, scheduleIndex) =>
      index === scheduleIndex ? colors.palette.neutral800 : colors.palette.neutral100,
    )

    const $animatedTextStyle = useAnimatedStyle(() => {
      const color = interpolateColor(scrollX.value, inputRange, outputRange)

      return { color }
    })

    return (
      <Pressable {...{ ref, onPress, ...rest }} style={$buttonStyle}>
        <Animated.Text maxFontSizeMultiplier={2} style={[$textStyle, $animatedTextStyle]}>
          {text}
        </Animated.Text>
      </Pressable>
    )
  },
)

AnimatedDayButton.displayName = "AnimatedDayButton"

type ScheduleDayPickerProps = {
  scrollX: SharedValue<number>
  onItemPress: (itemIndex: number) => void
  scheduleDates: Date[]
  selectedScheduleDate: Date
}

export const ScheduleDayPicker: FC<ScheduleDayPickerProps> = ({
  scrollX,
  onItemPress,
  scheduleDates,
  selectedScheduleDate,
}) => {
  const wrapperWidth = width - spacing.extraSmall * 2
  const widthSize = wrapperWidth / scheduleDates.length
  const selectedScheduleIndex = scheduleDates.findIndex((date: Date) =>
    isSameDay(date, selectedScheduleDate),
  )
  const containerRef = React.useRef<View>()
  const [measures, setMeasures] = React.useState([{ x: 0 }, { x: 0 }, { x: 0 }])
  const itemRefs = scheduleDates.map((_) => React.createRef<View>())

  const onLayout = React.useCallback(() => {
    const m: Array<{ x: number; y: number; width: number; height: number }> = []
    scheduleDates.every((_, index) => {
      itemRefs[index].current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height })

          if (m.length === scheduleDates.length) {
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

  const inputRange = scheduleDates.map((_, index) => index * width)

  const $animatedLeftStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      measures.map((measure) => measure.x + (selectedScheduleIndex - spacing.micro)),
    )

    return {
      transform: [{ translateX }],
      width: widthSize,
    }
  }, [inputRange, scrollX, measures])

  return (
    <View ref={containerRef} style={$wrapperStyle} onLayout={onLayout}>
      {measures.length > 0 && <Animated.View style={[$animatedViewStyle, $animatedLeftStyle]} />}
      {scheduleDates.map((date, index) => (
        <AnimatedDayButton
          key={index}
          ref={itemRefs[index]}
          onPress={() => {
            onItemPress(index)
          }}
          text={format(date, "EE")}
          accessibilityLabel={format(date, "EEEE")}
          {...{ index, scrollX, inputRange, scheduleDates }}
        />
      ))}
    </View>
  )
}

const $animatedViewStyle: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderRadius: 100,
  height: "100%",
  position: "absolute",
}

const $buttonBaseStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  borderColor: colors.palette.primary500,
  borderRadius: 100,
  minHeight: 48,
}

const $textStyle: TextStyle = {
  color: colors.palette.neutral100,
  fontFamily: typography.primary.medium,
  fontSize: 16,
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
