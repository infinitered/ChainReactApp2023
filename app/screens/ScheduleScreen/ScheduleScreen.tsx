import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, Dimensions } from "react-native"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { ScheduleDayPicker } from "./ScheduleDayPicker"
import ScheduleCard, { ScheduleCardProps, Variants } from "./ScheduleCard"
import { useStores } from "../../models"
import { formatDate } from "../../utils/formatDate"
import { useAppNavigation } from "../../hooks"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated"

const { width } = Dimensions.get("window")

export const ScheduleScreen: FC<TabScreenProps<"Schedule">> = observer(function ScheduleScreen() {
  useHeader({ title: "Schedule" })
  const navigation = useAppNavigation()
  const { schedulesStore } = useStores()
  const { fetchData, setSelectedSchedule, selectedSchedule, schedules } = schedulesStore

  useLayoutEffect(() => {
    fetchData()
  }, [fetchData])

  const updateSchedule = (index) => setSelectedSchedule(schedules[index])

  const scrollX = useSharedValue(0)
  const ref = React.useRef(null)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
    onMomentumEnd: (event) => {
      const contentOffset = event.contentOffset
      const viewSize = event.layoutMeasurement

      // Divide the horizontal offset by the width of the view to see which page is visible
      const index = Math.floor(contentOffset.x / viewSize.width)

      // ? Why does this work this way with MST?
      // Just passing runOnJS(setSelectedSchedule)(schedules[index]) here results in an MST error
      runOnJS(updateSchedule)(index)
    },
  })

  const onItemPress = React.useCallback(
    (itemIndex) => {
      ref?.current?.scrollToOffset({ offset: itemIndex * width })
    },
    [ref],
  )

  if (!selectedSchedule) return null

  return (
    <>
      <View style={$root}>
        <Animated.FlatList
          ref={ref}
          data={schedules}
          keyExtractor={(item) => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          bounces={false}
          renderItem={({ item: schedule }) => (
            <View style={[$container, { width }]}>
              <FlashList
                ListHeaderComponent={
                  <View style={$headingContainer}>
                    <Text preset="heading" style={$heading}>
                      {formatDate(schedule.date, "EE, MMMM dd")}
                    </Text>
                    <Text style={$subheading}>{schedule.title}</Text>
                  </View>
                }
                data={schedule.events}
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
          )}
        />
      </View>
      <ScheduleDayPicker {...{ scrollX, onItemPress }} />
    </>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $container: ViewStyle = {
  flex: 1,
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
  paddingTop: spacing.medium,
  paddingBottom: 48 + spacing.medium,
}

const $cardContainer: ViewStyle = {
  paddingBottom: spacing.large,
}

const $listContainer: ViewStyle = {
  height: "100%",
}

const $headingContainer: ViewStyle = {
  paddingBottom: spacing.large,
}
