import React, { FC, RefObject } from "react"
import { Schedule } from "./ScheduleScreen"
import {
  RefreshControl,
  TextStyle,
  View,
  ViewStyle,
  ViewToken,
  useWindowDimensions,
} from "react-native"
import { colors, layout, spacing } from "../../theme"
import { Text } from "../../components"
import ScheduleCard, { ScheduleCardProps } from "./ScheduleCard"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const BUTTON_HEIGHT = 48
const ITEM_HEIGHT = 242

interface ScheduleDayProps {
  eventIndex: number
  index: number
  isRefetching: boolean
  isConfOver: boolean
  onRefresh: () => void
  onViewableItemsChanged: ({ viewableItems }: { viewableItems: ViewToken[] }) => void
  schedule: Schedule
  scheduleIndex: number
  scheduleListRef: RefObject<FlashList<ScheduleCardProps>>
}

const ScheduleDay: FC<ScheduleDayProps> = (props) => {
  const {
    eventIndex,
    index,
    isRefetching,
    isConfOver,
    onRefresh,
    onViewableItemsChanged,
    schedule,
    scheduleIndex,
    scheduleListRef,
  } = props

  const { height: screenHeight, width: screenWidth } = useWindowDimensions()
  const { bottom } = useSafeAreaInsets()
  const listHeight = screenHeight - bottom - layout.headerHeight - layout.tabHeight

  return (
    <View style={[$container, { width: screenWidth }]}>
      {schedule.bannerTx && (
        <View style={$banner}>
          <Text style={$bannerText} tx={schedule.bannerTx} />
        </View>
      )}
      <View style={$listContainer}>
        <FlashList<ScheduleCardProps>
          data={schedule.events}
          estimatedItemSize={ITEM_HEIGHT}
          estimatedListSize={{ height: listHeight, width: screenWidth }}
          // To achieve better performance, specify the type based on the item
          getItemType={(item) => item.variant}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChanged}
          ref={scheduleListRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ itemVisiblePercentThreshold: 1, minimumViewTime: 100 }}
          contentContainerStyle={
            scheduleIndex === index && eventIndex !== 0 ? $list : $listWithoutButton
          }
          renderItem={({ item, index: itemIndex }) => (
            <View style={$cardContainer}>
              <ScheduleCard
                {...item}
                isPast={
                  index < scheduleIndex ||
                  (index === scheduleIndex && itemIndex < eventIndex) ||
                  isConfOver
                }
              />
            </View>
          )}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isRefetching}
              tintColor={colors.palette.neutral100}
            />
          }
        />
      </View>
    </View>
  )
}

const $banner: ViewStyle = {
  backgroundColor: colors.palette.primary400,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.extraSmall,
}

const $bannerText: TextStyle = {
  color: colors.palette.neutral800,
}

const $container: ViewStyle = {
  flex: 1,
}

const $listContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $list: ContentStyle = {
  paddingTop: BUTTON_HEIGHT + spacing.extraLarge + spacing.extraSmall,
  paddingBottom: BUTTON_HEIGHT + spacing.medium,
}

const $listWithoutButton: ContentStyle = {
  paddingTop: spacing.extraLarge,
  paddingBottom: BUTTON_HEIGHT + spacing.medium,
}

const $cardContainer: ViewStyle = {
  paddingBottom: spacing.large,
}

export default ScheduleDay
