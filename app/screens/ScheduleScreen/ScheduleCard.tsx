import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Avatar, AvatarProps, Card, Icon, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { useAppNavigation } from "../../hooks"

interface HeaderProps {
  endTime?: string
  formattedStartTime: string
  title: string
  isPast?: boolean
}

interface FooterProps {
  heading: string
  subheading: string
  isPast?: boolean
}

const Header = ({ endTime, formattedStartTime, title, isPast }: HeaderProps) => (
  <View style={$headerContainer}>
    <Text style={isPast ? $pastTimeText : $timeText}>
      {formattedStartTime}
      {!!endTime && ` - ${endTime}`}
    </Text>
    <Text preset="eventTitle" style={isPast ? $pastTitleText : $titleText}>
      {title}
    </Text>
  </View>
)

const Footer = ({ heading, subheading, isPast }: FooterProps) => (
  <View style={$footerContainer}>
    <Text preset="cardFooterHeading" style={isPast ? $pastFooterHeading : $footerHeading}>
      {heading}
    </Text>
    <Text style={isPast ? $pastFooterSubheading : $footerSubheading}>{subheading}</Text>
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
   * Start time of the event formatted as "hh:mm aaa"
   */
  formattedStartTime: string
  /**
   * Start time of the event
   */
  startTime?: string
  /**
   * End time of the recurring event
   */
  endTime?: string
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
  /**
   * Whether the event is in the past
   */
  isPast?: boolean
}

interface SpeakingEventProps {
  heading: string
  subheading: string
  eventTitle: string
  sources: string[]
  isPast?: boolean
  startTime?: string
}

interface BaseEventProps {
  formattedStartTime: string
  endTime?: string
  eventTitle: string
  level?: string
  isPast?: boolean
  date?: string
}

const baseEventProps = ({
  formattedStartTime,
  endTime,
  eventTitle,
  level,
  isPast,
  date,
}: BaseEventProps) => {
  const title = `${level ? `${level} ` : ""}${eventTitle}`
  return {
    HeadingComponent: <Header {...{ formattedStartTime, endTime, title, isPast, date }} />,
  }
}

const baseSpeakingEventProps = ({
  heading,
  subheading,
  eventTitle,
  sources = [],
  isPast,
  startTime,
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
    FooterComponent: <Footer {...{ heading, subheading, isPast, startTime }} />,
  }
}

const ScheduleCard: FC<ScheduleCardProps> = (props) => {
  const {
    variant = "recurring",
    formattedStartTime,
    endTime,
    eventTitle,
    heading,
    subheading,
    sources,
    level,
    id,
    isPast,
  } = props
  const navigation = useAppNavigation()
  const onPress = ["talk", "workshop"].includes(variant)
    ? () => navigation.navigate("TalkDetails", { scheduleId: id })
    : ["party"].includes(variant)
    ? () => navigation.navigate("PartyDetails", { scheduleId: id })
    : undefined

  const cardProps = {
    ...baseEventProps({ formattedStartTime, endTime, eventTitle, level, isPast }),
  }
  const variantProps =
    variant === "recurring"
      ? { content: subheading, contentStyle: isPast ? $pastContentText : $contentText }
      : variant === "party"
      ? {
          content: subheading,
          contentStyle: isPast ? $pastContentText : $contentText,
          FooterComponent: (
            <Icon
              icon="arrow"
              size={24}
              color={colors.palette.primary500}
              containerStyle={$partyArrowContainer}
            />
          ),
        }
      : baseSpeakingEventProps({ heading, subheading, eventTitle, sources, isPast })

  const isReversed = variant === "recurring" || variant === "party"
  const cardPreset = isReversed
    ? isPast
      ? "pastReversed"
      : "reversed"
    : isPast
    ? "pastDefault"
    : "default"

  return <Card preset={cardPreset} {...{ ...cardProps, ...variantProps, onPress }} />
}

const $avatar: ViewStyle = {
  position: "absolute",
  top: spacing.extraSmall,
  right: spacing.medium,
}

const $footerSubheading: TextStyle = {
  color: colors.palette.neutral900,
}

const $pastFooterSubheading: TextStyle = {
  color: colors.palette.primary100,
}

const $timeText: TextStyle = {
  color: colors.palette.neutral900,
  marginBottom: spacing.large,
}

const $pastTimeText: TextStyle = {
  color: colors.palette.primary100,
  marginBottom: spacing.large,
}

const $titleText: TextStyle = {
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $pastTitleText: TextStyle = {
  color: colors.palette.primary100,
  textTransform: "uppercase",
}

const $contentText: TextStyle = {
  color: colors.palette.neutral500,
  paddingTop: 10,
}

const $pastContentText: TextStyle = {
  color: colors.palette.neutral100,
  paddingTop: 10,
}

const $footerHeading: TextStyle = {
  color: colors.palette.neutral900,
  marginBottom: spacing.extraSmall,
}

const $pastFooterHeading: TextStyle = {
  color: colors.palette.primary100,
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
