import React from "react"
import { View, FlatList, Dimensions, ViewStyle, ImageSourcePropType, TextStyle } from "react-native"
import { Text } from "../components"
import { spacing } from "../theme"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"

interface StaticCarouselProps {
  preset: "static"
  data: ImageSourcePropType[]
  subtitle: string
  meta?: string
  body: string
}

export interface DynamicCarouselItem {
  image: ImageSourcePropType
  subtitle: string
  meta?: string
  body: string
}

interface DynamicCarouselProps {
  preset: "dynamic"
  data: DynamicCarouselItem[]
}

type CarouselProps =
  | (StaticCarouselProps | DynamicCarouselProps) & {
      title: string
    }

interface CarouselItemProps {
  item: ImageSourcePropType | DynamicCarouselItem
  index: number
  scrollX: SharedValue<number>
}

const IMAGE_WIDTH = Dimensions.get("screen").width - spacing.medium
const AnimatedText = Animated.createAnimatedComponent(Text)

function CarouselItem(props: CarouselItemProps) {
  const { item, index, scrollX } = props
  const { subtitle, meta, body, image } = item as DynamicCarouselItem
  const source = subtitle ? image : item

  const inputRange = [(index - 1) * IMAGE_WIDTH, index * IMAGE_WIDTH, (index + 1) * IMAGE_WIDTH]

  const $animatedImage = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, inputRange, [1, 1.1, 1])
    return { transform: [{ scale }] }
  })

  const $imageStyle = { width: IMAGE_WIDTH - spacing.medium }

  const $animatedText = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, inputRange, [
      IMAGE_WIDTH,
      0 - index * spacing.medium,
      -IMAGE_WIDTH,
    ])
    return {
      transform: [{ translateX }],
      marginLeft: spacing.medium - index * spacing.extraSmall,
    }
  })

  return (
    <View>
      <View style={$cardWrapper}>
        <Animated.Image source={source} style={[$imageStyle, $animatedImage]} />
      </View>
      {!!image && (
        <View style={[{ width: IMAGE_WIDTH - spacing.medium }, $mt]}>
          {!!meta && (
            <AnimatedText preset="primaryLabel" text={meta} style={[$meta, $animatedText]} />
          )}
          <AnimatedText preset="subheading" text={subtitle} style={[$mb, $animatedText]} />
          <AnimatedText text={body} style={$animatedText} />
        </View>
      )}
    </View>
  )
}

// ! https://github.com/software-mansion/react-native-reanimated/issues/457
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

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
        snapToInterval={IMAGE_WIDTH - spacing.medium}
        style={$carousel}
        contentContainerStyle={$carouselContent}
        renderItem={({ item, index }) => <CarouselItem {...{ item, index, scrollX }} />}
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

const $cardWrapper: ViewStyle = {
  overflow: "hidden",
  borderRadius: 4,
  marginEnd: spacing.extraSmall,
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
