import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
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
        <ScheduleCard />
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
