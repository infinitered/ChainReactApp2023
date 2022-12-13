import React from "react"
import { View, FlatList, Dimensions, ViewStyle, ImageSourcePropType, TextStyle } from "react-native"
import { CarouselCard, Text } from "../components"
import { spacing } from "../theme"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"

interface StaticCarouselProps {
  preset: "static"
  data: ImageSourcePropType[]
  subtitle: string
  meta?: string
  body: string
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
}

interface DynamicCarouselProps {
  preset: "dynamic"
  data: DynamicCarouselItem[]
}

type CarouselProps =
  | (StaticCarouselProps | DynamicCarouselProps) & {
      title: string
    }

export const CAROUSEL_IMAGE_WIDTH = Dimensions.get("screen").width - spacing.medium

// ! https://github.com/software-mansion/react-native-reanimated/issues/457
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const openLink = (destination: string) => destination.startsWith("")

export function Carousel(props: CarouselProps) {
  const { title, data } = props

  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((event) => (scrollX.value = event.contentOffset.x))

  return (
    <>
      <View style={$content}>
        <Text preset="screenHeading" text={title} />
      </View>

      <AnimatedFlatList
        {...{ data, onScroll }}
        horizontal
        pagingEnabled
        keyExtractor={(_, index) => `info-image-${index}`}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        snapToInterval={CAROUSEL_IMAGE_WIDTH - spacing.medium}
        style={$carousel}
        contentContainerStyle={$carouselContent}
        renderItem={({ item, index }) => (
          <CarouselCard
            {...{ item, index, scrollX }}
            leftButton={
              props.preset === "dynamic" && (
                <CarouselCard.Link
                  text={(item as DynamicCarouselItem).leftButton?.text}
                  openLink={() => console.log("open link")}
                />
              )
            }
          />
        )}
      />

      {props.preset === "static" && (
        <View style={$content}>
          {!!props.meta && <Text preset="primaryLabel" text={props.meta} style={$meta} />}
          <Text
            preset="subheading"
            text={props.subtitle}
            style={[!props.meta ? $mt : undefined, $mb]}
          />
          <Text text={props.body} />
        </View>
      )}
    </>
  )
}

const $carousel: ViewStyle = {
  paddingStart: spacing.extraSmall,
  marginTop: spacing.medium,
}

const $carouselContent: ViewStyle = {
  paddingEnd: spacing.extraSmall,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
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
