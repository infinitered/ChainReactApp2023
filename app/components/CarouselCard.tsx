import React, { FC, VFC } from "react"
import { GestureResponderEvent, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
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
      <AutoImage style={$venueImage} source={coverImage}></AutoImage>
      <Text preset="primaryLabel" style={$eventDetails}>
        {meta}
      </Text>
      <Text preset="bold" style={$place}>
        {title}
      </Text>
      {typeof description === "function" ? { description } : <Text>{description}</Text>}
      <View style={$ctaContainer}>
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

const $venueImage: ImageStyle = {
  borderRadius: 4,
  maxHeight: 274,
  maxWidth: 358,
}

const $eventDetails: TextStyle = {
  marginVertical: spacing.medium,
}

const $place: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $ctaContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.large,
}

const $carouselCardLink: ViewStyle = {
  marginEnd: spacing.large,
}
