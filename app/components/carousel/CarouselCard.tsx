import React from "react"
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { BoxShadow } from "../BoxShadow"
import { ButtonLink } from "../ButtonLink"
import { Text } from "../Text"
import { colors, spacing } from "../../theme"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import { CAROUSEL_CARD_WIDTH, CAROUSEL_GAP, CAROUSEL_INTERVAL } from "./constants"
import { DynamicCarouselItem } from "./carousel.types"

export type CarouselCardProps = {
  button?: React.ReactNode
  imageStyle?: ImageStyle
  index: number
  item: ImageSourcePropType | DynamicCarouselItem
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
  scrollX: SharedValue<number>
  socialButtons?: React.ReactNode
  totalCardCount: number
  variant?: "default" | "speaker"
}

type SubComponents = {
  Link: typeof Link
}

export const CarouselCard: React.FunctionComponent<CarouselCardProps> & SubComponents = ({
  button,
  imageStyle,
  index,
  item,
  leftButton,
  rightButton,
  scrollX,
  socialButtons,
  variant,
}) => {
  const { label, subtitle, meta, body, image } = item as DynamicCarouselItem
  const source = subtitle ? image : item

  const inputRange = [
    (index - 2) * CAROUSEL_INTERVAL,
    (index - 1) * CAROUSEL_INTERVAL,
    index * CAROUSEL_INTERVAL,
  ]

  const $animatedImage = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, inputRange, [1, 1.1, 1])
    return { transform: [{ scale }] }
  })

  const $animatedSlideData = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, inputRange, [
      CAROUSEL_INTERVAL,
      0,
      -CAROUSEL_INTERVAL,
    ])

    return {
      transform: [{ translateX }],
    }
  })

  const isSpeaker = variant === "speaker"
  const offset = 5

  return (
    <View style={$carouselCard}>
      {isSpeaker && (
        <Animated.View style={$otherCards}>
          <BoxShadow preset="primary" offset={offset}>
            <Image
              source={source}
              style={[$image, imageStyle, { width: CAROUSEL_CARD_WIDTH - offset }]}
            />
          </BoxShadow>
        </Animated.View>
      )}
      {!isSpeaker && (
        <View style={$cardWrapper}>
          <Animated.Image source={source} style={[$image, $animatedImage]} />
        </View>
      )}
      {!!subtitle && (
        <Animated.View style={$animatedSlideData}>
          <View style={$slideWrapper}>
            {!!meta && <Text preset="primaryLabel" text={meta} style={$meta} />}
            <Text
              preset={isSpeaker ? "cardFooterHeading" : "subheading"}
              text={subtitle}
              style={[$mb, $mr, !label && $mbLarge]}
            />
            {!!label && (
              <Text
                text={label}
                style={[
                  $mbLarge,
                  {
                    fontSize: $label.fontSize,
                    fontWeight: $label.fontWeight,
                    lineHeight: $label.lineHeight,
                    color: $label.color,
                  },
                ]}
              />
            )}
            {!!socialButtons && <View style={$mbLarge}>{socialButtons}</View>}
            {!!body && <Text text={body} />}
            <View style={$ctaContainer}>
              {!!leftButton && <View style={$leftButton}>{leftButton}</View>}
              {!!rightButton && <View>{rightButton}</View>}
              {!!button && <View style={$button}>{button}</View>}
            </View>
          </View>
        </Animated.View>
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
  width: CAROUSEL_CARD_WIDTH,
  marginRight: CAROUSEL_GAP,
}

const $cardWrapper: ViewStyle = {
  overflow: "hidden",
  borderRadius: 4,
}

const $otherCards: ViewStyle = {
  ...$cardWrapper,
  borderRadius: 0,
  paddingTop: spacing.small + spacing.micro,
  paddingBottom: spacing.medium,
}

const $image: ImageStyle = {
  height: 274,
  width: CAROUSEL_CARD_WIDTH,
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
  flex: 1,
  flexWrap: "wrap",
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
  paddingHorizontal: spacing.medium,
}

const $label: TextStyle = {
  color: colors.palette.primary500,
  fontSize: 16,
  fontWeight: "300",
  lineHeight: 22.4,
}

const $mbLarge: ViewStyle = {
  marginBottom: spacing.large,
}
