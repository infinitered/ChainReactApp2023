import React, { FC } from "react"
import {
  ImageStyle,
  Linking,
  Platform,
  TextStyle,
  ViewStyle,
} from "react-native"
import { AutoImage, Text, ButtonLink } from "../../components"
import { spacing } from "../../theme/spacing"

interface Props {
  coverImage: {
    uri: string
  }
  eventTitle: string
  place: string
  address: string
  zipCode: string
  city: string
  state: string
}

export const VenueCard: FC<Props> = ({
  coverImage,
  eventTitle,
  address,
  place,
  zipCode,
  city,
  state,
}) => {
  const openMap = async () => {
    const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`)
    const provider = Platform.OS === "ios" ? "apple" : "google"
    const link = `http://maps.${provider}.com/?daddr=${destination}`

    try {
      const supported = await Linking.canOpenURL(link)

      if (supported) Linking.openURL(link)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <AutoImage style={$venueImage} source={coverImage}></AutoImage>
      <Text preset="primaryLabel" style={$eventDetails}>
        {eventTitle}
      </Text>
      <Text preset="bold" style={$place}>
        {place}
      </Text>
      <Text>{address}</Text>
      <Text>
        {city}, {state} {zipCode}
      </Text>
      <ButtonLink openLink={openMap} style={$openMaps}>
        Open in maps
      </ButtonLink>
    </>
  )
}

const $venueImage: ImageStyle = {
  borderRadius: 4,
  maxHeight: 274,
  maxWidth: 358,
}

const $eventDetails: TextStyle = {
  marginVertical: spacing.medium,
}

const $place: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $openMaps: ViewStyle = {
  marginTop: spacing.medium,
}
