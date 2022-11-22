import React, { FC, VFC } from "react"
import {
  GestureResponderEvent,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { AutoImage } from "./AutoImage"
import { Text } from "./Text"
import { ButtonLink } from "./ButtonLink"
import { spacing } from "../theme/spacing"

type CarouselCardProps = {
  coverImage: {
    uri: string
  }
  meta: string
  title: string
  description: React.ReactNode | string
  leftButton: React.ReactNode
  rightButton?: React.ReactNode
}

type SubComponents = {
  Link: typeof Link
}

export const CarouselCard: FC<CarouselCardProps> & SubComponents = ({
  coverImage,
  meta,
  title,
  description,
  leftButton,
  rightButton,
}) => {
  return (
    <>
      <AutoImage style={$venueImageStyles} source={coverImage}></AutoImage>
      <Text preset="primaryLabel" style={$eventDetailsStyles}>
        {meta}
      </Text>
      <Text preset="bold" style={$placeStyles}>
        {title}
      </Text>
      {typeof description === "function" ? (
        { description }
      ) : (
        <Text>{description}</Text>
      )}
      <View style={$ctaContainerStyles}>
        {leftButton}
        {rightButton}
      </View>
    </>
  )
}

type LinkProps = {
  text: string
  openLink: string | ((event: GestureResponderEvent) => void)
}

const Link: VFC<LinkProps> = ({ openLink, text }) => {
  return (
    <ButtonLink openLink={openLink} style={$carouselCardLink}>
      {text}
    </ButtonLink>
  )
}

CarouselCard.Link = Link

const $venueImageStyles: ImageStyle = {
  borderRadius: 4,
  maxHeight: 274,
  maxWidth: 358,
}

const $eventDetailsStyles: TextStyle = {
  marginVertical: spacing.medium,
}

const $placeStyles: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $ctaContainerStyles: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.large,
}

const $carouselCardLink: ViewStyle = {
  marginEnd: spacing.large,
}
