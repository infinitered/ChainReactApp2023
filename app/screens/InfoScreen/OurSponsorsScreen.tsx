import React, { Suspense } from "react"
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
import { colors, spacing } from "../../theme"
import { SponsorCard } from "./SponsorCard"
import { groupBy } from "../../utils/groupBy"

const sponsorTiers = Object.values(WEBFLOW_MAP.sponsorTier)
type Tiers = typeof sponsorTiers[number]

const initialTiers = sponsorTiers.reduce<Record<Tiers, RawSponsor[]>>(
  (acc, tier) => ({ ...acc, [tier]: [] }),
  {} as Record<Tiers, RawSponsor[]>,
)

const useSponsorsSections = (): {
  sections: Array<SectionListData<any>>
} => {
  const { data: sponsors = [] } = useSponsors()
  const rawTiers = groupBy("sponsor-tier")(sponsors)
  const tiers = Object.keys(rawTiers).reduce<Record<Tiers, RawSponsor[]>>(
    (acc, tier) => ({
      ...acc,
      [tier]: rawTiers[tier] ?? [],
    }),
    initialTiers,
  )
  return {
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

const Layout = () => {
  const { sections } = useSponsorsSections()

  return (
    <>
      <SectionList
        ListHeaderComponent={
          <Text preset="screenHeading" tx="infoScreen.thanksToThisYearsSponsors" style={$heading} />
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
  )
}

export const OurSponsorsScreen = () => {
  const navigation = useAppNavigation()

  useHeader({
    title: translate("infoScreen.ourSponsorsTitle"),
    leftIcon: "back",
    onLeftPress: () => navigation.goBack(),
  })

  return (
    <Screen style={$root} preset="fixed">
      <Suspense
        fallback={<ActivityIndicator color={colors.tint} size="large" style={$activityIndicator} />}
      >
        <Layout />
      </Suspense>
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
