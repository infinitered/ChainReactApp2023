import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import { HeaderAction, MIN_HEADER_HEIGHT } from "../../components"
import { useAppNavigation } from "../../hooks"
import { colors, spacing, typography } from "../../theme"

interface TalkDetailsHeaderProps {
  /**
   * Title of workshop/talk
   */
  title: string
  /**
   * Workshop location or talk date/time
   */
  subtitle: string
  /**
   * The Y position from the <ScrollView />
   */
  scrollY: SharedValue<number>
  /**
   * The container height from the <ScrollView /> details page
   * title + spacing + subtitle
   */
  headingHeight: number
}

export const TalkDetailsHeader: React.FunctionComponent<TalkDetailsHeaderProps> =
  function TalkDetailsHeader({ title, scrollY, headingHeight }) {
    const navigation = useAppNavigation()

    const $animatedTitle = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, [headingHeight - 10, headingHeight], [0, 1])

      return { opacity }
    }, [headingHeight])

    return (
      <View style={$rowContainer}>
        <HeaderAction icon="back" onPress={navigation.goBack} />
        <Animated.Text style={[$centerTitle, $animatedTitle]}>{title}</Animated.Text>
      </View>
    )
  }

const $rowContainer: ViewStyle = {
  height: MIN_HEADER_HEIGHT,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $centerTitle: TextStyle = {
  position: "absolute",
  width: "100%",
  textAlign: "center",
  paddingHorizontal: spacing.huge,
  zIndex: 1,
  fontSize: 16,
  lineHeight: 17.6,
  fontFamily: typography.secondary.medium,
  color: colors.text,
}
