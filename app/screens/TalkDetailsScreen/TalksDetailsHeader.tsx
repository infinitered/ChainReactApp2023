import React from "react"
import { Dimensions, TextStyle, TouchableOpacityProps, View, ViewStyle } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { HeaderAction, MIN_HEADER_HEIGHT } from "../../components"
import { colors, spacing, typography } from "../../theme"

interface TalkDetailsHeaderProps {
  onPress?: TouchableOpacityProps["onPress"]
  title: string
  subtitle: string
  scrollY: SharedValue<number>
}

const { width } = Dimensions.get("screen")

export const TalkDetailsHeader: React.FunctionComponent<TalkDetailsHeaderProps> =
  function TalkDetailsHeader({ onPress, title, scrollY }) {
    const { top } = useSafeAreaInsets()
    const titleHeight = useSharedValue(0)
    const titleWidth = useSharedValue(0)

    const $animatedTitle = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollY.value,
        [0, MIN_HEADER_HEIGHT],
        [MIN_HEADER_HEIGHT, 0],
        Extrapolate.CLAMP,
      )

      // output range, second param
      // -spacing.large due to wrapper view (can adjust header action button with override to get rid of this)
      // -12 for half of back arrow
      // half screen width
      // half title label width
      const translateX = interpolate(
        scrollY.value,
        [0, MIN_HEADER_HEIGHT],
        [-spacing.extraSmall, -spacing.large - 12 + width / 2 - titleWidth.value / 2],
        Extrapolate.CLAMP,
      )

      const fontSize = interpolate(
        scrollY.value,
        [0, MIN_HEADER_HEIGHT],
        [32, 16],
        Extrapolate.CLAMP,
      )

      return { transform: [{ translateX }, { translateY }], fontSize }
    })

    return (
      <Animated.View style={[$safeArea, { paddingTop: top }]}>
        <View style={$rowContainer}>
          <View style={{ marginHorizontal: -spacing.large }}>
            <HeaderAction icon="back" {...{ onPress }} />
          </View>

          <Animated.Text
            style={[$title, $animatedTitle]}
            onLayout={({
              nativeEvent: {
                layout: { width, height },
              },
            }) => {
              titleHeight.value = height
              titleWidth.value = width
            }}
          >
            {title}
          </Animated.Text>
        </View>
        {/* <Text preset="companionHeading" style={$subtitle} text={subtitle} /> */}
      </Animated.View>
    )
  }

const $safeArea: ViewStyle = {
  backgroundColor: colors.background,
  position: "absolute",
  zIndex: 2,
  top: 0,
  right: 0,
  left: 0,
  paddingLeft: spacing.large,
  paddingBottom: spacing.extraLarge,
}

const $rowContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $title: TextStyle = {
  fontSize: 32,
  lineHeight: 35.2,
  fontFamily: typography.primary.bold,
  color: colors.text,
}

// const $subtitle: TextStyle = {
//   color: colors.palette.primary500,
// }
