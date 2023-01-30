import React, { useMemo } from "react"
import { View, FlatList, Dimensions, ViewStyle, ImageSourcePropType, TextStyle } from "react-native"

import { Button, ButtonProps, CarouselCard, Text } from "../components"
import { spacing } from "../theme"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { openMap } from "../utils/openMap"

export interface StaticCarouselProps {
  preset: "static"
  data: ImageSourcePropType[]
  subtitle: string
  meta?: string
  body: string
  ctaButton?: ButtonData & ButtonProps
}

interface ButtonData {
  text: string
  link: string
}

export interface DynamicCarouselItem {
  image: ImageSourcePropType
  subtitle: string
  meta?: string
  body: string
  leftButton?: ButtonData
  rightButton?: ButtonData
  ctaButton?: ButtonData & ButtonProps
}

interface DynamicCarouselProps {
  preset: "dynamic"
  data: DynamicCarouselItem[]
}

interface Spacer {
  spacer: boolean
}

type CarouselProps =
  | (StaticCarouselProps | DynamicCarouselProps) & {
      openLink?: () => void
    }

const { width } = Dimensions.get("screen")
export const CAROUSEL_IMAGE_WIDTH = width * 0.9
export const SPACING = spacing.extraSmall
export const SPACER_WIDTH = (width - CAROUSEL_IMAGE_WIDTH) / 2

// ! https://github.com/software-mansion/react-native-reanimated/issues/457
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const openLink = (destination: string) =>
  destination.startsWith("http") || destination.startsWith("https")
    ? openLinkInBrowser(destination)
    : openMap(destination)

export function Carousel(props: CarouselProps) {
  const { data = [] } = props

  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((event) => (scrollX.value = event.contentOffset.x))

  const items: Array<ImageSourcePropType | DynamicCarouselItem | Spacer> = useMemo(() => {
    return [{ spacer: true }, ...data, { spacer: true }]
  }, [data.length])

  return (
    <>
      <AnimatedFlatList
        {...{ onScroll }}
        data={items}
        horizontal
        pagingEnabled
        overScrollMode="never"
        keyExtractor={(_, index) => `info-image-${index}`}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        snapToInterval={CAROUSEL_IMAGE_WIDTH}
        snapToAlignment="start"
        style={props.preset === "dynamic" && $carousel}
        renderItem={({ item, index }) => {
          const { spacer } = item as Spacer
          if (spacer) {
            return (
              <View
                style={{
                  width: SPACER_WIDTH,
                }}
              />
            )
          }

          let leftButton = null
          if (props.preset === "dynamic") {
            const { leftButton: leftButtonData } = item as DynamicCarouselItem
            leftButton = leftButtonData && (
              <CarouselCard.Link
                text={leftButtonData.text}
                openLink={() => openLink(leftButtonData.link)}
              />
            )
          }

          let rightButton = null
          if (props.preset === "dynamic") {
            const { rightButton: rightButtonData } = item as DynamicCarouselItem
            rightButton = rightButtonData && (
              <CarouselCard.Link
                text={rightButtonData.text}
                openLink={() => openLink(rightButtonData.link)}
              />
            )
          }

          let ctaButton = null
          const { ctaButton: ctaButtonData } = item as DynamicCarouselItem | StaticCarouselProps
          ctaButton = ctaButtonData && (
            <Button text={ctaButtonData.text} onPress={() => openLink(ctaButtonData.link)} />
          )

          return (
            <CarouselCard
              {...{
                item,
                index,
                scrollX,
                leftButton,
                rightButton,
                ctaButton,
                totalCardCount: data.length,
              }}
            />
          )
        }}
      />

      {props.preset === "static" && (
        <View style={$content}>
          {!!props.meta && <Text preset="primaryLabel" text={props.meta} style={$meta} />}
          <Text
            preset="subheading"
            text={props.subtitle}
            style={[!props.meta ? $mt : undefined, $mb]}
          />
          <Text text={props.body} style={$body} />
          {props.ctaButton && (
            <Button text={props.ctaButton.text} onPress={() => openLink(props.ctaButton.link)} />
          )}
        </View>
      )}
    </>
  )
}

const $carousel: ViewStyle = {
  marginTop: spacing.medium,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
  marginBottom: -spacing.extraSmall,
}

const $mb: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $mt: ViewStyle = {
  marginTop: spacing.medium,
}

const $meta: ViewStyle = {
  marginVertical: spacing.medium,
}

const $body: TextStyle = {
  marginBottom: spacing.large,
}
