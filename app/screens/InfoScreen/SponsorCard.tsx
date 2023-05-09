import React from "react"
import { ImageStyle, TextStyle, ViewStyle, View, Pressable } from "react-native"
import { AutoImage, Icon, Text } from "../../components"
import { spacing } from "../../theme"
import { translate } from "../../i18n"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { SCREEN_CONTENT_WIDTH } from "../../components/carousel/constants"

type CommonProps = {
  containerStyle?: ViewStyle
}

type TierOneLevelProps = CommonProps & {
  externalURL: string
  logo: { uri: string }
  promoSummary: string
  sponsor: string
}

type TierTwoLevelProps = CommonProps & {
  sponsorImages: { uri: string; sponsor: string; externalURL?: string }[]
}

type PlatinumTierLevelProps = TierOneLevelProps & {
  tier: "Platinum"
}

type GoldTierLevelProps = TierOneLevelProps & {
  tier: "Gold"
}

type SilverTierLevelProps = TierTwoLevelProps & {
  tier: "Silver"
}

type BronzeTierLevelProps = TierTwoLevelProps & {
  tier: "Bronze"
}

type SponsorCardProps =
  | PlatinumTierLevelProps
  | GoldTierLevelProps
  | SilverTierLevelProps
  | BronzeTierLevelProps

function maxImageDimensions(tier: SponsorCardProps["tier"]): {
  maxWidth: number
  maxHeight: number
} {
  const iconWidth = spacing.large + spacing.medium

  switch (tier) {
    case "Platinum":
      return {
        maxWidth: SCREEN_CONTENT_WIDTH * 0.9 - iconWidth,
        maxHeight: 60,
      }
    case "Gold":
      return {
        maxWidth: SCREEN_CONTENT_WIDTH * 0.7 - iconWidth,
        maxHeight: 48,
      }
    case "Silver":
      return {
        maxWidth: SCREEN_CONTENT_WIDTH * 0.4 - iconWidth,
        maxHeight: 48,
      }
    case "Bronze":
      return {
        maxWidth: SCREEN_CONTENT_WIDTH * 0.4,
        maxHeight: 36,
      }
  }
}

export const SponsorCard = (props: SponsorCardProps) => {
  switch (props.tier) {
    case "Platinum":
    case "Gold": {
      const { containerStyle, externalURL, logo, promoSummary, sponsor, tier } = props

      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Pressable style={$sponsorTitle} onPress={() => openLinkInBrowser(externalURL)}>
            <AutoImage {...maxImageDimensions(tier)} accessibilityLabel={sponsor} source={logo} />
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
    }
    case "Silver": {
      const { containerStyle, sponsorImages, tier } = props

      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Text preset="primaryLabel" style={$sponsorType} tx="infoScreen.silverSponsor" />
          <View style={$silverTierWrapper}>
            {sponsorImages.map(({ uri, sponsor, externalURL }, index) => (
              <Pressable
                key={index}
                style={$silverTierButton}
                onPress={() => !!externalURL && openLinkInBrowser(externalURL)}
              >
                <AutoImage
                  {...maxImageDimensions(tier)}
                  accessibilityLabel={sponsor}
                  source={{ uri }}
                />
                {externalURL ? <Icon icon="arrow" containerStyle={$iconButton} /> : null}
              </Pressable>
            ))}
          </View>
        </View>
      )
    }
    case "Bronze": {
      const { containerStyle, sponsorImages, tier } = props

      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Text preset="primaryLabel" style={$sponsorType} tx="infoScreen.bronzeSponsor" />
          <View style={$sponsorBottomTierLogos}>
            {sponsorImages.map(({ uri, sponsor }, index) => (
              <View key={index} style={$sponsorBottomTierLogoWrapper}>
                <AutoImage
                  {...maxImageDimensions(tier)}
                  accessibilityLabel={sponsor}
                  style={$sponsorImageBottomTier}
                  source={{ uri }}
                />
              </View>
            ))}
          </View>
        </View>
      )
    }
  }
}

const $silverTierWrapper: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const $silverTierButton: ViewStyle = {
  width: "45%",
  marginVertical: spacing.small,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $sponsorTitle: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
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
  justifyContent: "space-between",
}

const $sponsorBottomTierLogoWrapper: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "50%",
}

const $sponsorImageBottomTier: ImageStyle = {
  marginVertical: spacing.small,
}
