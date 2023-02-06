import React, { FC } from "react"
import { SectionList, SectionListData, TextStyle, View, ViewStyle } from "react-native"
import { Carousel, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { SponsorCard } from "./SponsorCard"
import { useSponsors, useVenues } from "../../services/api"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"
import { groupBy } from "../../services/api/webflow-helpers"
import { RawSponsor } from "../../services/api/webflow-api.types"

const sponsorTiers = Object.values(WEBFLOW_MAP.sponsorTier)
type Tiers = typeof sponsorTiers[number]

const initialTiers = sponsorTiers.reduce<Record<Tiers, RawSponsor[]>>(
  (acc, tier) => ({ ...acc, [tier]: [] }),
  {} as Record<Tiers, RawSponsor[]>,
)

const Workshops = ({ item }) => {
  return (
    <View style={$carousel}>
      <Carousel preset="dynamic" data={item} />
    </View>
  )
}

const SponsorSection = ({ item }) => {
  return (
    <View style={$container}>
      <SponsorCard {...item} />
    </View>
  )
}

const useVenueSections = (): SectionListData<any>[] => {
  const { data: sponsors = [] } = useSponsors()
  const rawTiers = groupBy("sponsor-tier")(sponsors)
  const tiers = Object.keys(rawTiers).reduce<Record<Tiers, RawSponsor[]>>(
    (acc, tier) => ({
      ...acc,
      [WEBFLOW_MAP.sponsorTier[tier]]: rawTiers[tier] ?? [],
    }),
    initialTiers,
  )
  const { data: venues } = useVenues()

  return [
    {
      title: translate("venueScreen.conferenceAndWorkshopVenues"),
      renderItem: Workshops,
      data: [
        venues?.map((venue) => ({
          image: { uri: venue["venue-image-s"][0]?.url },
          subtitle: venue.name,
          meta: `${WEBFLOW_MAP.venueTag[venue.tag]} • ${
            WEBFLOW_MAP.venueTag[venue.tag] === "Workshop" ? "May 17" : "May 18-19"
          }`,
          body: `${venue["street-address"]}\n${venue["city-state-zip"]}`,
          leftButton: {
            text: "Open in maps",
            link: `${venue["street-address"]},${venue["city-state-zip"]}`,
          },
        })),
      ],
    },
    {
      title: translate("venueScreen.thanksToThisYearsSponsors"),
      renderItem: SponsorSection,
      data: [
        ...(["Platinum", "Gold"] as const).flatMap((tier) =>
          tiers[tier].map((sponsor) => ({
            sponsor: sponsor.name,
            tier,
            promoSummary: sponsor["promo-summary"],
            externalURL: sponsor["external-url"],
            logo: {
              uri: sponsor.logo.url,
            },
          })),
        ),
        ...(["Silver", "Bronze", "Other"] as const).map((tier) => ({
          tier,
          sponsorImages: tiers[tier].map((sponsor) => ({
            sponsor: sponsor.name,
            uri: sponsor.logo.url,
          })),
        })),
      ],
    },
  ]
}

export const VenueScreen: FC<TabScreenProps<"Venue">> = () => {
  useHeader({ title: translate("venueScreen.title") })

  const sections = useVenueSections()

  return (
    <Screen style={$root} preset="fixed">
      <SectionList
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderSectionHeader={({ section: { title } }) => (
          <Text preset="screenHeading" style={$heading}>
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
  backgroundColor: colors.palette.neutral700,
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $carousel: ViewStyle = {
  marginBottom: spacing.extraLarge,
}
