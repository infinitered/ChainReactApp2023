import React from "react"
import { ImageStyle, TextStyle, ViewStyle, View, Pressable } from "react-native"
import { AutoImage, Icon, Text } from "../../components"
import { spacing } from "../../theme"
import { translate } from "../../i18n"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { SCREEN_CONTENT_WIDTH } from "../../components/carousel/constants"

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
    case "Silver":
      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Text preset="primaryLabel" style={$sponsorType} tx="infoScreen.silverSponsor" />
          <View style={$silverTierWrapper}>
            {sponsorImages.map(({ uri, sponsor, externalURL }, index) => (
              <View key={index} style={$silverTierButtonWrapper}>
                <Pressable style={$silverTierButton} onPress={() => openLinkInBrowser(externalURL)}>
                  <AutoImage
                    {...maxImageDimensions(tier)}
                    accessibilityLabel={sponsor}
                    source={{ uri }}
                  />
                  <Icon icon="arrow" containerStyle={$iconButton} />
                </Pressable>
              </View>
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

const $silverTierWrapper: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const $silverTierButtonWrapper: ViewStyle = {
  width: "45%",
  marginVertical: spacing.small,
}

const $silverTierButton: ViewStyle = {
  flex: 1,
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
