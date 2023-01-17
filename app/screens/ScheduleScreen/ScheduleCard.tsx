import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Avatar, AvatarProps, Card, Icon, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { useAppNavigation } from "../../hooks"

interface HeaderProps {
  time: string
  title: string
}

interface FooterProps {
  heading: string
  subheading: string
}

const Header = ({ time, title }: HeaderProps) => (
  <View style={$headerContainer}>
    <Text style={$timeText}>{time}</Text>
    <Text preset="eventTitle" style={$titleText}>
      {title}
    </Text>
  </View>
)

const Footer = ({ heading, subheading }: FooterProps) => (
  <View style={$footerContainer}>
    <Text preset="cardFooterHeading" style={$footerHeading}>
      {heading}
    </Text>
    <Text style={$footerSubheading}>{subheading}</Text>
  </View>
)

export type Variants = "workshop" | "talk" | "party" | "recurring"

export interface ScheduleCardProps {
  /**
   * The variant of the card.
   * Options: "recurring", "workshop", "talk", "party"
   * Default: "recurring"
   */
  variant?: Variants
  /**
   * Start time or time range
   * 8:00 am
   * 6:00 - 8:00 am
   */
  time: string
  /**
   * The event title
   */
  eventTitle: string
  /**
   * Card bold heading
   */
  heading?: string
  /**
   * Card subheading beneath heading
   */
  subheading: string
  /**
   * Card sources for avatars
   */
  sources: string[]
  /**
   * Card workshop level
   */
  level?: string
  /**
   * Card ID
   */
  id: string
}

interface SpeakingEventProps {
  heading: string
  subheading: string
  eventTitle: string
  sources: string[]
}

interface BaseEventProps {
  time: string
  eventTitle: string
  level?: string
}

const baseEventProps = ({ time, eventTitle, level }: BaseEventProps) => {
  const title = `${level ? `${level} ` : ""}${eventTitle}`
  return {
    HeadingComponent: <Header {...{ time, title }} />,
  }
}

const baseSpeakingEventProps = ({
  heading,
  subheading,
  eventTitle,
  sources = [],
}: SpeakingEventProps) => {
  const props = {
    preset: eventTitle,
    sources: sources.map((source) => ({ uri: source })),
  } as AvatarProps
  return {
    RightComponent: (
      <View style={$rightContainer}>
        <Avatar style={$avatar} {...props} />
        <Icon
          icon="arrow"
          size={24}
          color={colors.palette.primary500}
          containerStyle={$arrowContainer}
        />
      </View>
    ),
    FooterComponent: <Footer {...{ heading, subheading }} />,
  }
}

const ScheduleCard: FC<ScheduleCardProps> = (props) => {
  const { variant = "recurring", time, eventTitle, heading, subheading, sources, level, id } = props
  const navigation = useAppNavigation()
  const onPress = ["talk", "workshop"].includes(variant)
    ? () => navigation.navigate("TalkDetails", { scheduleId: id })
    : ["party"].includes(variant)
    ? () => navigation.navigate("PartyDetails", { scheduleId: id })
    : undefined

  const cardProps = { ...baseEventProps({ time, eventTitle, level }) }
  const variantProps =
    variant === "recurring"
      ? { content: subheading, contentStyle: $contentText }
      : variant === "party"
      ? {
          content: subheading,
          contentStyle: $contentText,
          FooterComponent: (
            <Icon
              icon="arrow"
              size={24}
              color={colors.palette.primary500}
              containerStyle={$partyArrowContainer}
            />
          ),
        }
      : baseSpeakingEventProps({ heading, subheading, eventTitle, sources })

  return (
    <Card
      preset={variant === "recurring" || variant === "party" ? "reversed" : "default"}
      {...{ ...cardProps, ...variantProps, onPress }}
    />
  )
}

const $avatar: ViewStyle = {
  position: "absolute",
  top: spacing.extraSmall,
  right: spacing.medium,
}

const $footerSubheading: TextStyle = {
  color: colors.palette.neutral900,
}

const $timeText: TextStyle = {
  color: colors.palette.neutral900,
  marginBottom: spacing.large,
}

const $titleText: TextStyle = {
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $contentText: TextStyle = {
  color: colors.palette.neutral500,
  paddingTop: 10,
}

const $footerHeading: TextStyle = {
  color: colors.palette.neutral900,
  marginBottom: spacing.extraSmall,
}

const $footerContainer: ViewStyle = {
  flex: 1,
  paddingTop: spacing.small,
}

const $rightContainer: ViewStyle = {
  position: "absolute",
  right: -spacing.extraSmall,
  top: 0,
  bottom: 0,
  width: 200,
}

const $arrowContainer: ViewStyle = {
  bottom: spacing.extraSmall,
  right: spacing.medium,
  position: "absolute",
}

const $partyArrowContainer: ViewStyle = {
  bottom: -spacing.large,
  right: -spacing.medium,
  position: "absolute",
}

const $headerContainer: ViewStyle = {
  marginBottom: spacing.small,
}

export default ScheduleCard
