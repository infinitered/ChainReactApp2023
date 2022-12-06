import React, { FC } from "react"
import { SectionList, TextStyle, View, ViewStyle } from "react-native"
import { CarouselCard, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { openMap } from "../../utils/openMap"
import { SponsorCard } from "./SponsorCard"

const Workshops = () => {
  const openLink = async () => {
    await openMap("11134 Washington St #302", "97006", "Portland")
  }
  return (
    <View style={$carousel}>
      {/* test carousel card */}
      <CarouselCard
        coverImage={{ uri: "https://placekitten.com/g/358/274" }}
        meta="Conference • May 18-19"
        title="The Armory"
        description="11134 Washington St #302, Portland, OR 97006"
        leftButton={<CarouselCard.Link text="Open in maps" openLink={openLink} />}
      />
    </View>
  )
}

const SponsorSection = ({ item }) => {
  return <SponsorCard {...item} />
}

const SECTIONS = [
  {
    title: translate("VenueScreen.conferenceAndWorkshopVenues"),
    renderItem: Workshops,
    data: [{}],
  },
  {
    title: translate("VenueScreen.thanksToThisYearsSponsors"),
    renderItem: SponsorSection,
    data: [
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
    ],
  },
]

export const VenueScreen: FC<TabScreenProps<"Venue">> = () => {
  useHeader({ title: translate("VenueScreen.title") })

  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={$container}>
      <SectionList
        stickySectionHeadersEnabled
        sections={SECTIONS}
        renderSectionHeader={({ section: { title } }) => (
          <Text preset="heading" style={$heading}>
            {title}
          </Text>
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
  fontSize: 32,
  lineHeight: 45.2,
  backgroundColor: colors.palette.neutral500,
}

const $carousel: ViewStyle = {
  marginVertical: spacing.large,
}
