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

function maxImageDimensions(tier: SponsorCardProps["tier"]): {
  maxWidth: number
  maxHeight: number
} {
  switch (tier) {
    case "Platinum":
      return {
        maxWidth: 280,
        maxHeight: 60,
      }
    case "Gold":
      return {
        maxWidth: 240,
        maxHeight: 48,
      }
    case "Silver":
      return {
        maxWidth: 135,
        maxHeight: 26,
      }
    case "Bronze":
      return {
        maxWidth: 155,
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
          <View style={$silverTierButtonWrapper}>
            {sponsorImages.map(({ uri, sponsor, externalURL }, index) => (
              <Pressable
                key={index}
                style={$silverTierButton}
                onPress={() => openLinkInBrowser(externalURL)}
              >
                <AutoImage
                  {...maxImageDimensions(tier)}
                  accessibilityLabel={sponsor}
                  style={$silverTierImage}
                  source={{ uri }}
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
              <View key={index} style={$sponsorBottomTierLogoWrapper}>
                <AutoImage
                  {...maxImageDimensions(tier)}
                  accessibilityLabel={sponsor}
                  style={[
                    $sponsorImageBottomTier,
                    index % 2 === 0 ? $sponsorImageBottomTierStart : $sponsorImageBottomTierEnd,
                  ]}
                  source={{ uri }}
                />
              </View>
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

const $sponsorImageBottomTierStart: ImageStyle = {
  marginEnd: spacing.large,
}

const $sponsorImageBottomTierEnd: ImageStyle = {
  marginEnd: 0,
}
