import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import { ClosedBanner, Text } from "../../components"
import { BackButton } from "../../navigators/BackButton"
import { colors, layout, spacing } from "../../theme"

interface TalkDetailsHeaderProps {
  /**
   * Title of workshop/talk
   */
  title?: string
  /**
   * Workshop location or talk date/time
   */
  subtitle?: string
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

const AnimatedText = Animated.createAnimatedComponent(Text)

export const TalkDetailsHeader: React.FunctionComponent<TalkDetailsHeaderProps> =
  function TalkDetailsHeader({ title, scrollY, headingHeight }) {
    const $animatedTitle = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, [headingHeight * 0.5, headingHeight], [0, 1])

      return { opacity }
    }, [headingHeight])

    return (
      <>
        <ClosedBanner />
        <View style={$rowContainer}>
          <BackButton />
          <AnimatedText
            allowFontScaling={false}
            preset="navHeader"
            style={[$centerTitle, $animatedTitle]}
          >
            {title}
          </AnimatedText>
        </View>
      </>
    )
  }

const $rowContainer: ViewStyle = {
  height: layout.headerHeight,
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
  color: colors.text,
}
