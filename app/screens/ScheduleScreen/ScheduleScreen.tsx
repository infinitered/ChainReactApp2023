import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { useAppNavigation } from "../../hooks"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard from "./ScheduleCard"
import { useStores } from "../../models"

export const ScheduleScreen: FC<TabScreenProps<"Schedule">> = observer(function ScheduleScreen() {
  useHeader({ title: "Schedule" })
  const navigation = useAppNavigation()
  const { schedulesStore } = useStores()
  const { viewingDay } = schedulesStore

  return (
    <>
      <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
        <Text preset="heading" style={$heading}>
          {viewingDay}
        </Text>
        <Text style={$subheading}>React Native Workshops</Text>
        <ScheduleCard
          variant="event"
          time="6:00 — 8:00 am"
          eventTitle="Check-in & Registration"
          subheading="Check-in for attendees with a workshop ticket begins at 6:00 am."
        />

        <View style={{ height: spacing.large }} />

        <ScheduleCard
          variant="workshop"
          onPress={() => navigation.navigate("EventDetail")}
          time="6:00 — 8:00 am"
          eventTitle="Check-in & Registration"
          heading="Gant Laborde"
          subheading="Leveling up on the new architecture"
        />

        <View style={{ height: spacing.large }} />

        <ScheduleCard
          variant="talk"
          onPress={() => navigation.navigate("EventDetail")}
          time="6:00 — 8:00 am"
          eventTitle="Check-in & Registration"
          heading="Ferran Negre Pizarro"
          subheading="React Native case study: from an idea to market"
        />
      </Screen>
      <ScheduleDayPicker />
    </>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $heading: TextStyle = {
  fontSize: 32,
  lineHeight: 45.2,
}

const $subheading: TextStyle = {
  color: colors.palette.primary500,
}
