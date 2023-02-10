import React from "react"
import {
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { BoxShadow, ButtonLink, Text } from "../components"
import { spacing } from "../theme"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import { CAROUSEL_IMAGE_WIDTH, DynamicCarouselItem, SPACING } from "./Carousel"

export type CarouselCardProps = {
  button?: React.ReactNode
  imageStyle?: ImageStyle
  index: number
  item: ImageSourcePropType | DynamicCarouselItem
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
  scrollX: SharedValue<number>
  socialLinks?: React.ReactNode
  totalCardCount: number
}

type SubComponents = {
  Link: typeof Link
}

const AnimatedText = Animated.createAnimatedComponent(Text)

export const CarouselCard: React.FunctionComponent<CarouselCardProps> & SubComponents = ({
  button,
  imageStyle,
  index,
  item,
  leftButton,
  rightButton,
  scrollX,
  socialLinks,
}) => {
  const { label, subtitle, meta, body, image } = item as DynamicCarouselItem
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
      <Animated.View
        style={[
          // $cardWrapper,
          // cardStyle,
          $speakerPanelCard,
          $animatedImage,
          { width: Number($carouselCard.width) - 30 },
        ]}
      >
        <BoxShadow preset="primary" offset={6}>
          <Animated.Image
            source={source}
            style={[
              $image,
              // $animatedImage,
              imageStyle,
              { width: Number($carouselCard.width) - 36 },
            ]}
          />
        </BoxShadow>
      </Animated.View>
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
          {!!label && (
            <AnimatedText preset="primaryLabel" text={label} style={[$meta, $animatedSlideData]} />
          )}
          <AnimatedText text={body} style={[$mr, $animatedSlideData]} />
          <View style={$ctaContainer}>
            {!!leftButton && (
              <Animated.View style={[$mr, $animatedSlideData]}>{leftButton}</Animated.View>
            )}
            {!!rightButton && (
              <Animated.View style={$animatedSlideData}>{rightButton}</Animated.View>
            )}
            {button && (
              <Animated.View style={[$button, $animatedSlideData]}>{button}</Animated.View>
            )}
            {!!socialLinks && (
              <Animated.View style={[$mr, $animatedSlideData]}>{socialLinks}</Animated.View>
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

const $speakerPanelCard: ViewStyle = {
  ...$cardWrapper,
  borderRadius: 0,
  paddingBottom: spacing.medium,
}

const $image: ImageStyle = {
  height: 274,
  width: CAROUSEL_IMAGE_WIDTH,
}

const $mb: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $meta: ViewStyle = {
  marginBottom: spacing.medium,
}

const $mr: TextStyle = {
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
