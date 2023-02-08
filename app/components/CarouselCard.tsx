import React from "react"
import {
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { ButtonLink, Text } from "../components"
import { spacing } from "../theme"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import { CAROUSEL_IMAGE_WIDTH, DynamicCarouselItem, SPACING } from "./Carousel"

export type CarouselCardProps = {
  item: ImageSourcePropType | DynamicCarouselItem
  index: number
  scrollX: SharedValue<number>
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
  button?: React.ReactNode
  totalCardCount: number
}

type SubComponents = {
  Link: typeof Link
}

const AnimatedText = Animated.createAnimatedComponent(Text)

export const CarouselCard: React.FunctionComponent<CarouselCardProps> & SubComponents = ({
  item,
  index,
  scrollX,
  leftButton,
  rightButton,
  button,
}) => {
  const { subtitle, meta, body, image } = item as DynamicCarouselItem
  const source = subtitle ? image : item

  const inputRange = [
    (index - 2) * CAROUSEL_IMAGE_WIDTH,
    (index - 1) * CAROUSEL_IMAGE_WIDTH,
    index * CAROUSEL_IMAGE_WIDTH,
  ]

  const $animatedImage = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, inputRange, [1, 1.1, 1])
    return { transform: [{ scale }] }
  })

  const $animatedSlideData = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, inputRange, [
      CAROUSEL_IMAGE_WIDTH,
      spacing.medium,
      -CAROUSEL_IMAGE_WIDTH,
    ])

    return {
      transform: [{ translateX }],
    }
  })

  return (
    <View style={$carouselCard}>
      <View style={$cardWrapper}>
        <Animated.Image source={source} style={[$image, $animatedImage]} />
      </View>
      {!!subtitle && (
        <View style={[{ width: CAROUSEL_IMAGE_WIDTH }, $slideWrapper]}>
          {!!meta && (
            <AnimatedText preset="primaryLabel" text={meta} style={[$meta, $animatedSlideData]} />
          )}
          <AnimatedText
            preset="subheading"
            text={subtitle}
            style={[$mb, $mr, $animatedSlideData]}
          />
          <AnimatedText text={body} style={[$mr, $animatedSlideData]} />
          <View style={$ctaContainer}>
            {leftButton && (
              <Animated.View style={[$leftButton, $animatedSlideData]}>{leftButton}</Animated.View>
            )}
            {rightButton && <Animated.View style={$animatedSlideData}>{rightButton}</Animated.View>}
            {button && (
              <Animated.View style={[$button, $animatedSlideData]}>{button}</Animated.View>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

type LinkProps = {
  text: string
  openLink: string | ((event: GestureResponderEvent) => void)
}

const Link: React.FunctionComponent<LinkProps> = ({ openLink, text }) => {
  return <ButtonLink openLink={openLink}>{text}</ButtonLink>
}

CarouselCard.Link = Link

const $carouselCard: ViewStyle = {
  width: CAROUSEL_IMAGE_WIDTH,
}

const $cardWrapper: ViewStyle = {
  overflow: "hidden",
  borderRadius: 4,
  marginHorizontal: SPACING,
}

const $image: ImageStyle = {
  height: 274,
  width: CAROUSEL_IMAGE_WIDTH,
}

const $mb: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $mr: TextStyle = {
  marginRight: spacing.large,
}

const $meta: ViewStyle = {
  marginBottom: spacing.medium,
}

const $leftButton: ViewStyle = {
  marginRight: spacing.large,
}

const $ctaContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
}

const $button: ViewStyle = {
  flex: 1,
  marginTop: spacing.extraLarge,
  marginRight: spacing.large,
}

const $slideWrapper: ViewStyle = {
  marginTop: spacing.medium,
}
