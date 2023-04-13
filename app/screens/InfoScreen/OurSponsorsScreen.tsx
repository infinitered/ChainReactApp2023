import React from "react"
import {
  ActivityIndicator,
  SectionList,
  SectionListData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Screen, Text } from "../../components"
import { translate } from "../../i18n"
import { useAppNavigation, useHeader } from "../../hooks"
import { useSponsors } from "../../services/api"
import { RawSponsor } from "../../services/api/webflow-api.types"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"
import { groupBy } from "../../services/api/webflow-helpers"
import { colors, spacing } from "../../theme"
import { SponsorCard } from "./SponsorCard"

const sponsorTiers = Object.values(WEBFLOW_MAP.sponsorTier)
type Tiers = typeof sponsorTiers[number]

const initialTiers = sponsorTiers.reduce<Record<Tiers, RawSponsor[]>>(
  (acc, tier) => ({ ...acc, [tier]: [] }),
  {} as Record<Tiers, RawSponsor[]>,
)

const useSponsorsSections = (): {
  isLoading: boolean
  sections: Array<SectionListData<any>>
} => {
  const { data: sponsors = [], isLoading } = useSponsors()
  const rawTiers = groupBy("sponsor-tier")(sponsors)
  const tiers = Object.keys(rawTiers).reduce<Record<Tiers, RawSponsor[]>>(
    (acc, tier) => ({
      ...acc,
      [tier]: rawTiers[tier] ?? [],
    }),
    initialTiers,
  )
  return {
    isLoading,
    sections: [
      {
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
              externalURL: sponsor["external-url"],
            })),
          })),
        ],
      },
    ],
  }
}

export const OurSponsorsScreen = () => {
  const navigation = useAppNavigation()

  useHeader({
    title: translate("infoScreen.ourSponsorsTitle"),
    leftIcon: "back",
    onLeftPress: () => navigation.goBack(),
  })

  const { isLoading, sections } = useSponsorsSections()

  return (
    <Screen style={$root} preset="fixed">
      {isLoading && (
        <ActivityIndicator color={colors.tint} size="large" style={$activityIndicator} />
      )}
      {!isLoading && sections.length > 0 && (
        <>
          <SectionList
            ListHeaderComponent={
              <Text
                preset="screenHeading"
                tx="infoScreen.thanksToThisYearsSponsors"
                style={$heading}
              />
            }
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
            sections={sections}
            renderItem={({ item }) => (
              <View style={$container}>
                <SponsorCard {...item} />
              </View>
            )}
          />
        </>
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  alignItems: "center",
  flex: 1,
}

const $activityIndicator: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $heading: TextStyle = {
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
}
