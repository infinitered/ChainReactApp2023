import React, { FC } from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { Carousel, DynamicCarouselItem, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { SponsorCard } from "./SponsorCard"

const irImage1 = require("../../../assets/images/info-ir1.png")
const irImage2 = require("../../../assets/images/info-ir2.png")

const WORKSHOP_DATA: DynamicCarouselItem[] = [
  {
    image: irImage1,
    subtitle: "The Armory",
    meta: "Conference • May 18-19",
    body: "11134 Washington St #302\nPortland, OR 97006",
    leftButton: {
      text: "Open in maps",
      link: "11134 Washington St #302, Portland, OR 97006",
    },
  },
  {
    image: irImage2,
    subtitle: "Workshops • May 17",
    meta: "Marriott Portland City Center",
    body: "550 SW Oak Street\nPortland, OR 97204",
    leftButton: {
      text: "Open in maps",
      link: "550 SW Oak Street\nPortland, OR 97204",
    },
  },
]

const Workshops = () => {
  return (
    <View style={$carousel}>
      <Carousel
        preset="dynamic"
        data={WORKSHOP_DATA}
        title={translate("venueScreen.conferenceAndWorkshopVenues")}
      />
    </View>
  )
}

const SponsorSection = ({ item }) => {
  return <SponsorCard {...item} />
}

const SPONSORS_DATA = [
  {
    sponsor: "Sponsor 1",
    tier: "platinum",
    bio: "Bio info included with sponsor tier section for website and mobile app. Applies to platinum and gold sponsors.",
    openURL: "https://placekitten.com",
    sponsorImage: {
      uri: "https://placekitten.com/g/280/60",
    },
  },
  {
    sponsor: "Sponsor 2",
    tier: "gold",
    bio: "Bio info included with sponsor tier section for website and mobile app. Applies to platinum and gold sponsors.",
    openURL: "https://placekitten.com",
    sponsorImage: {
      uri: "https://placekitten.com/g/280/60",
    },
  },
  {
    sponsor: "Sponsor 3",
    tier: "gold",
    bio: "Bio info included with sponsor tier section for website and mobile app. Applies to platinum and gold sponsors.",
    openURL: "https://placekitten.com",
    sponsorImage: {
      uri: "https://placekitten.com/g/280/60",
    },
  },
  {
    tier: "silver",
    sponsorImages: [
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats r us" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats r us" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats r us" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats r us" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats r us" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats r us" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats r us" },
    ],
  },
  {
    tier: "bronze",
    sponsorImages: [
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats rule dog drool" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats rule dog drool" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats rule dog drool" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats rule dog drool" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats rule dog drool" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats rule dog drool" },
      { uri: "https://placekitten.com/g/155/36", sponsor: "cats rule dog drool" },
    ],
  },
]

export const VenueScreen: FC<TabScreenProps<"Venue">> = () => {
  useHeader({ title: translate("venueScreen.title") })

  return (
    <Screen style={$root} preset="fixed">
      <FlatList
        ListHeaderComponent={
          <>
            <Workshops />
            <Text preset="screenHeading" style={$heading}>
              {translate("venueScreen.thanksToThisYearsSponsors")}
            </Text>
          </>
        }
        data={SPONSORS_DATA}
        renderItem={({ item }) => (
          <View style={$container}>
            <SponsorSection item={item} />
          </View>
        )}
      />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $heading: TextStyle = {
  backgroundColor: colors.palette.neutral500,
  paddingHorizontal: spacing.large,
}

const $carousel: ViewStyle = {
  marginTop: spacing.extraLarge,
  marginBottom: spacing.extraLarge * 2,
}
