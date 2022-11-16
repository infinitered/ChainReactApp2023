import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Dimensions, Pressable, TextStyle, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Text } from "../../components"
import { useStores } from "../../models"
import { colors, spacing } from "../../theme"

interface ButtonsProps {
  text: string
  onPress?: () => void
}

const buttons: ButtonsProps[] = [{ text: "Wed" }, { text: "Thurs" }, { text: "Fri" }]

export const ScheduleDayPicker: FC = observer(function ScheduleDayPicker() {
  const { schedulesStore } = useStores()
  const { setViewingDay, viewingDay = buttons[0].text } = schedulesStore
  const leftValue = useSharedValue(0)
  const wrapperWidth = Dimensions.get("screen").width - spacing.extraSmall * 2
  const widthSize = wrapperWidth / buttons.length

  const $animatedLeftStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(leftValue.value, { duration: 300 }),
      width: widthSize,
    }
  })

  return (
    <View style={$wrapperStyle}>
      <Animated.View style={[$animatedViewStyle, $animatedLeftStyle]} />
      {buttons.map((button, index) => (
        <Pressable
          key={index}
          onPress={() => {
            button.onPress?.()
            leftValue.value = widthSize * index
            setTimeout(() => setViewingDay(button.text), 250)
          }}
          style={$buttonStyle}
        >
          <Text
            preset="companionHeading"
            style={[$textStyle, viewingDay === button.text && $textSelectedStyle]}
          >
            {button.text}
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
