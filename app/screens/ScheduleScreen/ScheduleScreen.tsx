import React, { FC, Fragment, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard from "./ScheduleCard"
import { useStores } from "../../models"
import { formatDate } from "../../utils/formatDate"

export const ScheduleScreen: FC<TabScreenProps<"Schedule">> = observer(function ScheduleScreen() {
  useHeader({ title: "Schedule" })
  const { schedulesStore } = useStores()
  const { fetchData, selectedSchedule } = schedulesStore

  useLayoutEffect(() => {
    fetchData()
  }, [fetchData])

  if (!selectedSchedule) return null

  return (
    <>
      <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
        <Text preset="heading" style={$heading}>
          {formatDate(selectedSchedule.date, "EE, MMMM dd")}
        </Text>
        <Text style={$subheading}>{selectedSchedule.title}</Text>
        {selectedSchedule.events.map((event, index) => (
          <Fragment key={index}>
            <ScheduleCard {...event} />
            <View style={{ height: spacing.large }} />
          </Fragment>
        ))}
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
