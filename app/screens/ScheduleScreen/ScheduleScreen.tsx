import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle } from "react-native"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { useAppNavigation } from "../../hooks"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard, { Variants } from "./ScheduleCard"
import { useStores } from "../../models"

const data = [
  {
    id: 1,
    type: "event",
    time: "6:00 — 8:00 am",
    eventTitle: "Check-in & Registration",
    subheading: "Check-in for attendees with a workshop ticket begins at 6:00 am.",
  },
  {
    id: 2,
    type: "workshop",
    time: "8:00 am",
    eventTitle: "beginner workshop",
    heading: "Gant Laborde",
    subheading: "Leveling up on the new architecture",
    // onPress: () => navigation.navigate("EventDetail"),
  },
  {
    id: 3,
    type: "talk",
    time: "8:00 am",
    eventTitle: "talk",
    heading: "Ferran Negre Pizarro",
    subheading: "React Native case study: from an idea to market",
    // onPress: () => navigation.navigate("EventDetail"),
  },
  {
    id: 4,
    type: "event",
    time: "6:00 — 8:00 am",
    eventTitle: "Check-in & Registration",
    subheading: "Check-in for attendees with a workshop ticket begins at 6:00 am.",
  },
]

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

        <View style={$listContainer}>
          <FlashList
            data={data}
            renderItem={({ item }) => {
              const { time, eventTitle, heading, subheading } = item
              const onPress =
                item.type !== "event" ? () => navigation.navigate("EventDetail") : undefined
              return (
                <View style={$cardContainer}>
                  <ScheduleCard
                    variant={item.type as Variants}
                    {...{ time, eventTitle, heading, subheading, onPress }}
                  />
                </View>
              )
            }}
            getItemType={(item) => {
              // To achieve better performance, specify the type based on the item
              return item.type
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
