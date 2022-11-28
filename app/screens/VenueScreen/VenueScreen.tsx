import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { CarouselCard, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { openMap } from "../../utils/openMap"

export const VenueScreen: FC<TabScreenProps<"Venue">> = observer(function VenueScreen() {
  useHeader({ title: translate("VenueScreen.title") })

  const openLink = async () => {
    await openMap("11134 Washington St #302", "97006", "Portland")
  }

  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
      <Text preset="heading" style={$heading}>
        {translate("VenueScreen.conferenceAndWorkshopVenues")}
      </Text>

      <CarouselCard
        coverImage={{ uri: "https://placekitten.com/g/358/274" }}
        meta="Conference • May 18-19"
        title="The Armory"
        description="11134 Washington St #302, Portland, OR 97006"
        leftButton={<CarouselCard.Link text="Open in maps" openLink={openLink} />}
      />
    </Screen>
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
