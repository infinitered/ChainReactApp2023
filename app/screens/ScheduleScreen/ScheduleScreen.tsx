import React, { FC, Fragment, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle } from "react-native"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard, { ScheduleCardProps, Variants } from "./ScheduleCard"
import { useStores } from "../../models"
import { formatDate } from "../../utils/formatDate"
import { useAppNavigation } from "../../hooks"

export const ScheduleScreen: FC<TabScreenProps<"Schedule">> = observer(function ScheduleScreen() {
  useHeader({ title: "Schedule" })
  const navigation = useAppNavigation()
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

        <View style={$listContainer}>
          <FlashList
            data={selectedSchedule.events}
            renderItem={({ item }: { item: ScheduleCardProps }) => {
              const { time, eventTitle, heading, subheading } = item
              const onPress =
                item.variant !== "event" ? () => navigation.navigate("TalkDetails") : undefined
              return (
                <View style={$cardContainer}>
                  <ScheduleCard
                    variant={item.variant as Variants}
                    {...{ time, eventTitle, heading, subheading, onPress }}
                  />
                </View>
              )
            }}
            getItemType={(item) => {
              // To achieve better performance, specify the type based on the item
              return item.variant
            }}
            estimatedItemSize={225}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={$list}
          />
        </View>
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

const $list: ContentStyle = {
  paddingVertical: spacing.large,
  paddingBottom: 48 + spacing.medium,
}

const $cardContainer: ViewStyle = {
  paddingBottom: spacing.large,
}

const $listContainer: ViewStyle = {
  height: "100%",
}
