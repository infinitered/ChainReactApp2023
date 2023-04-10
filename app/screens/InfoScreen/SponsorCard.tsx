import React from "react"
import { ImageStyle, TextStyle, ViewStyle, View, Pressable } from "react-native"
import { AutoImage, Icon, Text } from "../../components"
import { spacing } from "../../theme"
import { translate } from "../../i18n"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"

export type CommonProps = {
  containerStyle?: ViewStyle
}

export type TierLevelProps =
  | {
      externalURL: string
      logo: { uri: string }
      promoSummary: string
      sponsor: string
      sponsorImages?: never
      tier: "Platinum" | "Gold"
    }
  | {
      externalURL: never
      logo?: never
      promoSummary?: never
      sponsor?: never
      sponsorImages: { uri: string; sponsor: string; externalURL?: string }[]
      tier: "Silver" | "Bronze"
    }

export type SponsorCardProps = CommonProps & TierLevelProps

export const SponsorCard = ({
  containerStyle,
  externalURL,
  logo,
  promoSummary,
  sponsor,
  sponsorImages,
  tier = "Gold",
}: SponsorCardProps) => {
  switch (tier) {
    case "Platinum":
    case "Gold":
      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Pressable style={$sponsorTitle} onPress={() => openLinkInBrowser(externalURL)}>
            <AutoImage
              accessibilityLabel={sponsor}
              style={tier === "Platinum" ? $platinumLogo : $goldLogo}
              source={logo}
            />
            <Icon icon="arrow" containerStyle={$iconButton} />
          </Pressable>
          <Text preset="primaryLabel" style={$sponsorType}>
            {
              {
                Platinum: translate("infoScreen.platinumSponsor"),
                Gold: translate("infoScreen.goldSponsor"),
              }[tier]
            }
          </Text>
          <Text>{promoSummary}</Text>
        </View>
      )
    case "Silver":
      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Text preset="primaryLabel" style={$sponsorType} tx="infoScreen.silverSponsor" />
          <View style={$silverTierButtonWrapper}>
            {sponsorImages.map(({ uri, sponsor, externalURL }, index) => (
              <Pressable
                key={index}
                style={$silverTierButton}
                onPress={() => openLinkInBrowser(externalURL)}
              >
                <AutoImage
                  accessibilityLabel={sponsor}
                  style={$silverTierImage}
                  source={{ uri }}
                  maxHeight={36}
                  maxWidth={125}
                />
                <Icon icon="arrow" containerStyle={$iconButton} />
              </Pressable>
            ))}
          </View>
        </View>
      )
    case "Bronze":
      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Text preset="primaryLabel" style={$sponsorType} tx="infoScreen.bronzeSponsor" />
          <View style={$sponsorBottomTierLogos}>
            {sponsorImages.map(({ uri, sponsor }, index) => (
              <AutoImage
                key={index}
                accessibilityLabel={sponsor}
                style={[
                  $sponsorImageBottomTier,
                  index % 2 === 0 ? $sponsorImageBottomTierStart : $sponsorImageBottomTierEnd,
                ]}
                source={{ uri }}
              />
            ))}
          </View>
        </View>
      )
  }
}

const $silverTierImage: ImageStyle = {
  marginVertical: spacing.small,
}

const $silverTierButton: ViewStyle = {
  alignItems: "center",
  flex: 1,
  flexDirection: "row",
}

const $silverTierButtonWrapper: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginHorizontal: spacing.large,
}

const $sponsorTitle: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}

const $platinumLogo: ImageStyle = {
  maxWidth: 280,
  maxHeight: 60,
}

const $goldLogo: ImageStyle = {
  maxWidth: 240,
  maxHeight: 48,
}

const $sponsorType: TextStyle = {
  marginTop: spacing.extraSmall,
  marginBottom: spacing.large,
}

const $sponsorContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $iconButton: ViewStyle = {
  marginStart: spacing.medium,
}

const $sponsorBottomTierLogos: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
}

const $sponsorImageBottomTier: ImageStyle = {
  maxWidth: 155,
  maxHeight: 36,
  marginVertical: spacing.small,
}

const $sponsorImageBottomTierStart: ImageStyle = {
  marginEnd: spacing.large,
}

const $sponsorImageBottomTierEnd: ImageStyle = {
  marginEnd: 0,
}
