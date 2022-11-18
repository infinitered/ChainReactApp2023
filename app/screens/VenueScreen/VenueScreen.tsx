import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"

export const VenueScreen: FC<TabScreenProps<"Venue">> = observer(function VenueScreen() {
  useHeader({ title: translate('VenueScreen.title') })

  return (
    <>
      <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
        <Text preset="heading" style={$heading}>
        {translate('VenueScreen.conferenceAndWorkshopVenues')}
        </Text>

        <View style={$listContainer}>
          
        </View>
      </Screen>
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

const $listContainer: ViewStyle = {
  height: "100%",
}
