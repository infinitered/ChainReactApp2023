import React from "react"
import { TouchableOpacity, ImageStyle, TextStyle, ViewStyle, Linking, View } from "react-native"
import { AutoImage, Icon, Text } from "../../components"
import { spacing } from "../../theme"
import { translate } from "../../i18n"

export type CommonProps = {
  containerStyle?: ViewStyle
}

export type TierLevelProps =
  | {
      tier: "platinum" | "gold"
      openURL: string
      bio: string
      sponsor: string
      sponsorImage: { uri: string }
      sponsorImages?: never
    }
  | {
      tier: "silver" | "bronze"
      sponsorImages: { uri: string; sponsor: string }[]
      openURL?: never
      bio?: never
      sponsor?: never
      sponsorImage?: never
    }

export type SponsorCardProps = CommonProps & TierLevelProps

export const SponsorCard = ({
  openURL,
  bio,
  sponsor,
  sponsorImage,
  tier = "gold",
  containerStyle,
  sponsorImages,
}: SponsorCardProps) => {
  const onPress = () => {
    Linking.openURL(openURL)
  }

  switch (tier) {
    case "platinum":
    case "gold":
      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <TouchableOpacity style={$sponsorTitle} onPress={onPress}>
            <AutoImage
              accessibilityLabel={sponsor}
              style={$sponsorImage}
              source={sponsorImage}
            ></AutoImage>
            <Icon icon="arrow" containerStyle={$iconButton} />
          </TouchableOpacity>
          <Text preset="primaryLabel" style={$sponsorType}>
            {
              {
                platinum: translate("VenueScreen.platinumSponsor"),
                gold: translate("VenueScreen.goldSponsor"),
              }[tier]
            }
          </Text>
          <Text style={$sponsorBio}>{bio}</Text>
        </View>
      )
    case "silver":
    case "bronze":
      return (
        <View style={[$sponsorContainer, containerStyle]}>
          <Text preset="primaryLabel" style={$sponsorType}>
            {
              {
                silver: translate("VenueScreen.silverSponsor"),
                bronze: translate("VenueScreen.bronzeSponsor"),
              }[tier]
            }
          </Text>
          <View style={$sponsorBottomTierImages}>
            {sponsorImages.map(({ uri, sponsor }, index) => (
              <AutoImage
                key={index}
                accessibilityLabel={sponsor}
                style={[
                  $sponsorImageBottomTier,
                  index % 2 === 0 ? $sponsorImageBottomTierStart : $sponsorImageBottomTierEnd,
                ]}
                source={{ uri }}
              ></AutoImage>
            ))}
          </View>
        </View>
      )
  }
}

const $sponsorTitle: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}

const $sponsorImage: ImageStyle = {
  maxWidth: 280,
  maxHeight: 60,
}

const $sponsorType: TextStyle = {
  marginVertical: spacing.medium,
}

const $sponsorBio: TextStyle = {}

const $sponsorContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $iconButton: ViewStyle = {
  marginStart: spacing.medium,
}

const $sponsorBottomTierImages: ViewStyle = {
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
