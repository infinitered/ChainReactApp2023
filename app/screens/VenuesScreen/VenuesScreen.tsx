import React, { FC } from "react"
import {
  ActivityIndicator,
  ImageSourcePropType,
  SectionList,
  SectionListData,
  ViewStyle,
} from "react-native"
import { Carousel, Screen } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { useVenues } from "../../services/api"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"
import { customSort } from "../../utils/customSort"

interface VenuesSection {
  body: string
  cta: {
    text: string
    link: string
  }
  imageSource: Array<ImageSourcePropType>
  subtitle: string
  title: string
}

const useVenuesSections = (): {
  isLoading: boolean
  sections: Array<SectionListData<Array<VenuesSection>>>
} => {
  const { data: venues = [], isLoading: venuesLoading } = useVenues()
  const sortedVenues = customSort(venues, "slug", [
    "the-armory",
    "after-party-expensify-office",
    "courtyard-portland-city-center",
  ])

  return {
    isLoading: venuesLoading,
    sections: [
      {
        data: [
          sortedVenues?.map((venue) => ({
            imageSource: venue["venue-image-s"].map((image) => ({ uri: image.url })),
            title: venue.name,
            subtitle: `${WEBFLOW_MAP.venueTag[venue.tag]} • ${
              WEBFLOW_MAP.venueTag[venue.tag] === "Workshop"
                ? "May 17"
                : WEBFLOW_MAP.venueTag[venue.tag] === "After Party"
                ? "May 18"
                : "May 18-19"
            }`,
            body: `${venue["street-address"]}\n${venue["city-state-zip"]}`,
            cta: {
              text: translate("venuesScreen.openInMaps"),
              link: `${venue["street-address"]},${venue["city-state-zip"]}`,
            },
          })),
        ],
      },
    ],
  }
}

const VenueCard = ({ body, cta, imageSource, subtitle, title }: VenuesSection) => (
  <Carousel
    preset="static"
    data={imageSource}
    body={body}
    subtitle={title}
    meta={subtitle}
    link={cta}
    isBodySelectable
  />
)

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
