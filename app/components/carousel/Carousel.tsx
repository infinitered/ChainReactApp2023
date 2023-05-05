import React, { useMemo } from "react"
import { View, FlatList, ViewStyle, ImageSourcePropType, TextStyle } from "react-native"
import { CarouselCard } from "./CarouselCard"
import { spacing } from "../../theme"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { openMap } from "../../utils/openMap"
import { Button } from "../Button"
import { ButtonLink } from "../ButtonLink"
import { SocialButton } from "../SocialButton"
import { Text } from "../Text"
import { CAROUSEL_END_SPACER, CAROUSEL_INTERVAL, CAROUSEL_START_SPACER } from "./constants"
import { CarouselProps, DynamicCarouselItem, Spacer } from "./carousel.types"

// ! https://github.com/software-mansion/react-native-reanimated/issues/457
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const openLink = (destination: string) =>
  destination.startsWith("http") ? openLinkInBrowser(destination) : openMap(destination)

export function Carousel(props: CarouselProps) {
  const { data = [] } = props

  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((event) => (scrollX.value = event.contentOffset.x))

  const items: Array<ImageSourcePropType | DynamicCarouselItem | Spacer> = useMemo(() => {
    return [{ spacer: CAROUSEL_START_SPACER }, ...data, { spacer: CAROUSEL_END_SPACER }]
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
        snapToInterval={CAROUSEL_INTERVAL}
        snapToAlignment="start"
        style={props.preset === "dynamic" && $carousel}
        renderItem={({ item, index }) => {
          const { spacer } = item as Spacer
          if (spacer) {
            return (
              <View
                style={{
                  width: spacer,
                }}
              />
            )
          }

          let leftButton: JSX.Element | undefined
          if (props.preset === "dynamic") {
            const { leftButton: leftButtonData } = item as DynamicCarouselItem
            leftButton = leftButtonData && (
              <CarouselCard.Link
                text={leftButtonData.text}
                openLink={() => openLink(leftButtonData.link)}
              />
            )
          }

          let rightButton: JSX.Element | undefined
          if (props.preset === "dynamic") {
            const { rightButton: rightButtonData } = item as DynamicCarouselItem
            rightButton = rightButtonData && (
              <CarouselCard.Link
                text={rightButtonData.text}
                openLink={() => openLink(rightButtonData.link)}
              />
            )
          }

          let socialButtons: JSX.Element | undefined
          if (props.preset === "dynamic") {
            const { socialButtons: socialButtonsData } = item as DynamicCarouselItem
            socialButtons = socialButtonsData && (
              <View style={$socialButtonContainer}>
                {socialButtonsData?.map(
                  (socialButton) =>
                    !!socialButton && (
                      <SocialButton
                        icon={socialButton.icon}
                        key={socialButton.icon}
                        style={$socialButton}
                        url={socialButton.url}
                        size={24}
                      />
                    ),
                )}
              </View>
            )
          }

          return (
            <CarouselCard
              {...{
                variant: props.carouselCardVariant,
                imageStyle: (item as DynamicCarouselItem).imageStyle,
                index,
                item: item as DynamicCarouselItem | ImageSourcePropType,
                leftButton,
                rightButton,
                scrollX,
                socialButtons,
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
          <Text text={props.body} style={$body} selectable={props.isBodySelectable} />
          {props.link && (
            <ButtonLink
              openLink={() => props.link?.link && openLink(props.link?.link)}
              style={$buttonLink}
            >
              {props.link.text}
            </ButtonLink>
          )}
          {props.button && (
            <Button
              text={props.button.text}
              onPress={() => props.button?.link && openLink(props.button?.link)}
            />
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

const $buttonLink: ViewStyle = {
  marginBottom: spacing.large,
}

const $socialButtonContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
}

const $socialButton: ViewStyle = {
  marginRight: spacing.medium,
}
