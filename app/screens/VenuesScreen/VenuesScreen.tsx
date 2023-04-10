import React, { FC } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  SectionList,
  SectionListData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { AutoImage, ButtonLink, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { useVenues } from "../../services/api"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"
import { openMap } from "../../utils/openMap"

interface VenuesSection {
  body: string
  cta: {
    text: string
    link: string
  }
  imageSource: { uri: string }
  subtitle: string
  title: string
}

const useVenuesSections = (): {
  isLoading: boolean
  sections: SectionListData<Array<VenuesSection>>[]
} => {
  const { data: venues = [], isLoading: venuesLoading } = useVenues()

  return {
    isLoading: venuesLoading,
    sections: [
      {
        data: [
          venues?.map((venue) => ({
            imageSource: { uri: venue["venue-image-s"][0]?.url },
            title: venue.name,
            subtitle: `${WEBFLOW_MAP.venueTag[venue.tag]} • ${
              WEBFLOW_MAP.venueTag[venue.tag] === "Workshop" ? "May 17" : "May 18-19"
            }`,
            body: `${venue["street-address"]}\n${venue["city-state-zip"]}`,
            cta: {
              text: "Open in maps",
              link: `${venue["street-address"]},${venue["city-state-zip"]}`,
            },
          })),
        ],
      },
    ],
  }
}

const VenueCard = ({ body, cta, imageSource, subtitle, title }: VenuesSection) => {
  console.tron.log({ body, cta, imageSource, subtitle, title })
  return (
    <View style={$venueCardWrapper}>
      <AutoImage source={imageSource} style={$venueCardImage} />
      <View style={$venueCardBodyWrapper}>
        <Text preset="screenHeading" style={$venueCardTitle}>
          {title}
        </Text>
        <Text preset="primaryLabel">{subtitle}</Text>
        <Text selectable style={$venueCardBody}>
          {body}
        </Text>
        <ButtonLink openLink={() => openMap(cta.link)}>{cta.text}</ButtonLink>
      </View>
    </View>
  )
}

export const VenuesScreen: FC<TabScreenProps<"Venues">> = () => {
  useHeader({ title: translate("venuesScreen.title") })

  const { sections, isLoading } = useVenuesSections()

  return (
    <Screen style={$root} preset="fixed">
      {isLoading && (
        <ActivityIndicator color={colors.tint} size="large" style={$activityIndicator} />
      )}
      {!isLoading && sections.length > 0 && (
        <SectionList
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={sections}
          renderItem={({ item }) => (
            <>
              {item.map((venue, index) => (
                <VenueCard key={index} {...venue} />
              ))}
            </>
          )}
        />
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $activityIndicator: ViewStyle = {
  flex: 1,
}

const $venueCardWrapper: ViewStyle = {
  marginVertical: spacing.large,
}

const $venueCardBodyWrapper: ViewStyle = {
  marginHorizontal: spacing.medium,
  marginTop: spacing.large,
}

const $venueCardImage: ImageStyle = {
  borderRadius: 4,
  height: 274,
  width: "100%",
}

const $venueCardTitle: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $venueCardBody: TextStyle = {
  marginVertical: spacing.medium,
}
