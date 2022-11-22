import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { VenueCard } from "./VenueCard"

export const VenueScreen: FC<TabScreenProps<"Venue">> = observer(
  function VenueScreen() {
    useHeader({ title: translate("VenueScreen.title") })

    return (
      <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
        <Text preset="heading" style={$heading}>
          {translate("VenueScreen.conferenceAndWorkshopVenues")}
        </Text>

        <VenueCard
          coverImage={{ uri: "https://placekitten.com/g/358/274" }}
          eventTitle="Conference • May 18-19"
          place="The Armory"
          address="11134 Washington St #302"
          city="Portland"
          zipCode="97006"
          state="OR"
        />
      </Screen>
    )
  }
)

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
