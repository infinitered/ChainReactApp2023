import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Avatar, AvatarProps, Card, Icon, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { useAppNavigation } from "../../hooks"
import { isConferencePassed } from "../../utils/isConferencePassed"

interface HeaderProps {
  formattedEndTime?: string
  formattedStartTime: string
  title: string
  isPast?: boolean
}

interface FooterProps {
  heading: string
  subheading: string
  isPast?: boolean
  talkUrl?: string
  variant: Variants
}

const Header = ({ formattedEndTime, formattedStartTime, title, isPast }: HeaderProps) => (
  <View style={$headerContainer}>
    <Text style={isPast ? $pastTimeText : $timeText}>
      {`${formattedStartTime}${formattedEndTime ? ` - ${formattedEndTime}` : ""} PT`}
    </Text>
    <Text preset="eventTitle" style={[$titleTextBase, isPast ? $pastTitleText : $titleText]}>
      {title}
    </Text>
  </View>
)

const TalkCTA = ({ talkUrl }: { talkUrl?: string }) =>
  isConferencePassed() && (
    <View style={$talkRecording}>
      <Icon icon="youtube" />
      <Text
        preset="label"
        style={$talkRecordingLabel}
        tx={talkUrl ? "scheduleScreen.talkRecordingPosted" : "scheduleScreen.videoComingSoon"}
      />
    </View>
  )

const Footer = ({ heading, subheading, isPast, talkUrl, variant }: FooterProps) => {
  return (
    <View style={$footerContainer}>
      {(heading ?? "").length > 0 && (
        <Text preset="cardFooterHeading" style={isPast ? $pastFooterHeading : $footerHeading}>
          {heading}
        </Text>
      )}
      {isPast ? (
        <>
          <Text style={$pastFooterSubheading}>{subheading}</Text>
          {talkUrl ??
            // assuming there will be other variants in the future I went with a switch statement
            {
              talk: <TalkCTA talkUrl={talkUrl} />,
            }[variant]}
        </>
      ) : (
        <Text style={$footerSubheading}>{subheading}</Text>
      )}
    </View>
  )
}

export type Variants = "workshop" | "talk" | "party" | "recurring" | "trivia-show"

export interface ScheduleCardProps {
  /**
   * The variant of the card.
   * Options: "recurring", "workshop", "talk", "party"
   * Default: "recurring"
   */
  variant?: Variants
  /**
   * Start time of the event formatted as "h:mm aaa"
   */
  formattedStartTime: string
  /**
   * Start time of the event
   */
  startTime?: string
  /**
   * End time of the recurring event
   */
  formattedEndTime?: string
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
  /**
   * Talk url
   */
  talkUrl?: string
  /**
   * Whether the card is clickable, usually for our Recurring Events
   */
  isSecondaryCallout?: boolean
}

interface SpeakingEventProps {
  heading: string
  subheading: string
  eventTitle: string
  sources: string[]
  isPast?: boolean
  startTime?: string
  talkUrl?: string
  variant: Variants
  isClickable: boolean
}

interface RecurringEventProps {
  heading: string
  subheading: string
  isPast?: boolean
  sources: string[]
  eventTitle: string
  variant: Variants
  isClickable: boolean
}

interface BaseEventProps {
  formattedStartTime: string
  formattedEndTime?: string
  eventTitle: string
  level?: string
  isPast?: boolean
  date?: string
}

const baseEventProps = ({
  formattedStartTime,
  formattedEndTime,
  eventTitle,
  level,
  isPast,
  date,
}: BaseEventProps) => {
  const title = `${level ? `${level} ` : ""}${eventTitle}`
  return {
    HeadingComponent: <Header {...{ formattedStartTime, formattedEndTime, title, isPast, date }} />,
  }
}

const baseSpeakingEventProps = ({
  heading,
  subheading,
  eventTitle,
  sources = [],
  isPast,
  startTime,
  talkUrl,
  variant,
  isClickable,
}: SpeakingEventProps) => {
  const props = {
    preset: eventTitle,
    sources: sources.map((source) => ({ uri: source })),
  } as AvatarProps
  return {
    RightComponent: (
      <View style={$rightContainer}>
        <Avatar style={$avatar} {...props} />
        {isClickable && (
          <Icon
            icon="arrow"
            size={24}
            color={colors.palette.primary500}
            containerStyle={$arrowContainer}
          />
        )}
      </View>
    ),
    FooterComponent: <Footer {...{ heading, subheading, isPast, startTime, talkUrl, variant }} />,
  }
}

const baseRecurringEventProps = ({
  heading,
  subheading,
  isPast,
  sources,
  eventTitle,
  variant,
  isClickable,
}: RecurringEventProps) => {
  const props = {
    preset: eventTitle,
    sources: sources.map((source) => ({ uri: source })),
  } as AvatarProps
  return {
    contentStyle: isPast ? $pastContentText : $contentText,
    RightComponent: (
      <View style={$rightContainer}>
        <Avatar style={$avatar} {...props} />
        {isClickable && (
          <Icon
            icon="arrow"
            size={24}
            color={colors.palette.primary500}
            containerStyle={$arrowContainer}
          />
        )}
      </View>
    ),
    FooterComponent: <Footer {...{ subheading, isPast, heading, variant }} />,
  }
}

const ScheduleCard: FC<ScheduleCardProps> = (props) => {
  const {
    variant = "recurring",
    formattedStartTime,
    formattedEndTime,
    eventTitle,
    heading,
    subheading,
    sources,
    level,
    id,
    isPast,
    talkUrl,
    isSecondaryCallout,
  } = props
  const navigation = useAppNavigation()
  const onPress = ["talk", "trivia-show"].includes(variant)
    ? () => navigation.navigate("TalkDetails", { scheduleId: id })
    : ["workshop"].includes(variant)
    ? () => navigation.navigate("WorkshopDetails", { scheduleId: id })
    : ["recurring"].includes(variant) && isSecondaryCallout
    ? () => navigation.navigate("BreakDetails", { scheduleId: id })
    : undefined

  const cardProps = {
    ...baseEventProps({ formattedStartTime, formattedEndTime, eventTitle, level, isPast }),
  }
  const variantProps =
    variant === "recurring"
      ? baseRecurringEventProps({
          subheading,
          isPast,
          sources,
          eventTitle,
          heading,
          variant,
          isClickable: !!onPress,
        })
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
      : baseSpeakingEventProps({
          heading,
          subheading,
          eventTitle,
          sources,
          isPast,
          talkUrl,
          variant,
          isClickable: !!onPress,
        })

  const isReversed = variant === "recurring" || variant === "party"
  const cardPreset = isReversed
    ? isPast
      ? "pastReversed"
      : "reversed"
    : isPast
    ? "pastDefault"
    : "default"

  return <Card accessible preset={cardPreset} {...{ ...cardProps, ...variantProps, onPress }} />
}

const $avatar: ViewStyle = {
  position: "absolute",
  top: spacing.extraSmall,
  right: spacing.medium,
}

const $footerSubheading: TextStyle = {
  color: colors.palette.neutral800,
}

const $pastFooterSubheading: TextStyle = {
  color: colors.palette.primary100,
}

const $talkRecording: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: spacing.extraSmall,
}

const $talkRecordingLabel: TextStyle = {
  color: colors.palette.primary400,
  marginStart: spacing.extraSmall,
}

const $timeText: TextStyle = {
  color: colors.palette.neutral800,
  marginBottom: spacing.large,
}

const $titleTextBase: TextStyle = {
  width: "80%",
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
  color: colors.palette.neutral700,
  paddingTop: 10,
}

const $pastContentText: TextStyle = {
  color: colors.palette.neutral100,
  paddingTop: 10,
}

const $footerHeading: TextStyle = {
  color: colors.palette.neutral800,
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
  right: 0,
  top: 0,
  bottom: 0,
}

const $arrowContainer: ViewStyle = {
  bottom: spacing.extraSmall,
  right: spacing.medium,
  position: "absolute",
}

const $partyArrowContainer: ViewStyle = {
  bottom: 0,
  right: 0,
  position: "absolute",
}

const $headerContainer: ViewStyle = {
  marginBottom: spacing.small,
}

export default ScheduleCard
