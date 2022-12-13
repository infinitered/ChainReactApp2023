import React from "react"
import {
  GestureResponderEvent,
  ImageSourcePropType,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { ButtonLink, Text } from "../components"
import { spacing } from "../theme"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import { CAROUSEL_IMAGE_WIDTH, DynamicCarouselItem } from "./Carousel"

export type CarouselCardProps = {
  item: ImageSourcePropType | DynamicCarouselItem
  index: number
  scrollX: SharedValue<number>
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
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
}) => {
  const { subtitle, meta, body, image } = item as DynamicCarouselItem
  const source = subtitle ? image : item

  const inputRange = [
    (index - 1) * CAROUSEL_IMAGE_WIDTH,
    index * CAROUSEL_IMAGE_WIDTH,
    (index + 1) * CAROUSEL_IMAGE_WIDTH,
  ]

  const $animatedImage = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, inputRange, [1, 1.1, 1])
    return { transform: [{ scale }] }
  })

  const $imageStyle = { width: CAROUSEL_IMAGE_WIDTH - spacing.medium }

  const $animatedSlideData = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, inputRange, [
      CAROUSEL_IMAGE_WIDTH,
      0 - index * spacing.medium,
      -CAROUSEL_IMAGE_WIDTH,
    ])
    return {
      // TODO: ask Jenna/Justin about the -index*spacing.medium here
      transform: [{ translateX: translateX - index * spacing.medium }],
      marginLeft: spacing.medium - index * spacing.extraSmall,
    }
  })

  return (
    <View>
      <View style={$cardWrapper}>
        <Animated.Image source={source} style={[$imageStyle, $animatedImage]} />
      </View>
      {!!subtitle && (
        <View style={[{ width: CAROUSEL_IMAGE_WIDTH - spacing.medium }, $mt]}>
          {!!meta && (
            <AnimatedText preset="primaryLabel" text={meta} style={[$meta, $animatedSlideData]} />
          )}
          <AnimatedText preset="subheading" text={subtitle} style={[$mb, $animatedSlideData]} />
          <AnimatedText text={body} style={$animatedSlideData} />
          {!leftButton ||
            (!rightButton && (
              <Animated.View style={[$ctaContainer, $animatedSlideData]}>
                {leftButton}
                {rightButton}
              </Animated.View>
            ))}
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
  return (
    <ButtonLink openLink={openLink} style={$carouselCardLink}>
      {text}
    </ButtonLink>
  )
}

CarouselCard.Link = Link

const $cardWrapper: ViewStyle = {
  overflow: "hidden",
  borderRadius: 4,
  marginEnd: spacing.extraSmall,
}

const $mb: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $mt: ViewStyle = {
  marginTop: spacing.medium,
}

const $meta: ViewStyle = {
  marginBottom: spacing.medium,
}

const $ctaContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
}

const $carouselCardLink: ViewStyle = {
  marginEnd: spacing.large,
}
