import React, { FC } from "react"
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  SectionList,
  SectionListData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Carousel, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { useRecommendations } from "../../services/api"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"
import { groupBy } from "../../services/api/webflow-helpers"
import { RawRecommendations } from "../../services/api/webflow-api.types"

const exploreMap = require("../../../assets/images/exploreMap.png")

interface ExploreMapProps {
  image: ImageSourcePropType
  description: string
  credit: string
}

const recommendationTypes = Object.values(WEBFLOW_MAP.recommendationType)
type RecommendationType = typeof recommendationTypes[number]
type GroupedRecommendations = Record<RecommendationType, RawRecommendations[]>

const initialRecs = recommendationTypes.reduce<GroupedRecommendations>(
  (acc, recommendationType) => ({ ...acc, [recommendationType]: [] }),
  {} as GroupedRecommendations,
)

const Recommendations = ({ item }) => {
  return (
    <View style={$carousel}>
      <Carousel preset="dynamic" data={item} />
    </View>
  )
}

const Neighborhood = ({ item }) => {
  console.tron.log({ item })

  return (
    <View style={$carousel}>
      <Carousel
        preset="static"
        data={item.images}
        subtitle={item.subtitle}
        body={item.body}
        meta={item.meta}
        ctaButton={item.ctaButton}
      />
    </View>
  )
}

const ExploreMap = ({ item }: { item: ExploreMapProps }) => {
  return (
    <View style={$exploreMapContainer}>
      <Image source={item.image} style={$exploreMap} />
      <Text text={translate("exploreScreen.exploreNeighborhoods")} preset="screenHeading" />
      <Text text={item.description} style={$description} />
      <Text text={item.credit} />
    </View>
  )
}

const sectionTitle = (type: RecommendationType) => {
  switch (type) {
    case "Food/Drink":
      return translate("exploreScreen.nearbyFoodAndDrink")
    case "SightSee":
      return translate("exploreScreen.downtownArtMurals")
    // Don't show this section for now since it's not in the CMS
    // case "Unique to Portland":
    //   return "Unique to Portland"
    case "Neighborhood":
      return undefined
    default:
      return translate("exploreScreen.nearbyFoodAndDrink")
  }
}

const useRecommendationSections = (): SectionListData<any>[] => {
  const { data: recommendations = [] } = useRecommendations()

  const rawRecs = groupBy("type")(recommendations)
  const recs = Object.keys(rawRecs).reduce<GroupedRecommendations>(
    (acc, recommendationType) => ({
      ...acc,
      [WEBFLOW_MAP.recommendationType[recommendationType]]: rawRecs[recommendationType] ?? [],
    }),
    initialRecs,
  )

  const notNeighborhoods = recommendationTypes.filter((recType) => recType !== "Neighborhood")
  const neighborhoods = recs.Neighborhood

  return [
    ...notNeighborhoods.map((recType) => ({
      title: sectionTitle(recType),
      renderItem: Recommendations,
      data: [
        recs[recType].map((rec, index) => ({
          image: { uri: rec.images[0]?.url },
          subtitle: rec.name,
          meta: `${rec.descriptor}${recType === "SightSee" ? " • free" : ""}`,
          body: rec.description,
          leftButton: rec["external-url"]
            ? {
                text: "Website",
                link: rec["external-url"],
              }
            : undefined,
          rightButton:
            rec["street-address"] && rec["city-state-zip"]
              ? {
                  text: "View on Map",
                  link: `${rec["street-address"]},${rec["city-state-zip"]}`,
                }
              : undefined,
          ctaButton: recType === "SightSee" &&
            index === 0 && {
              text: "Open Google Maps list",
              link: "https://www.google.com/maps/@45.5222313,-122.6833028,17z/data=!3m1!4b1!4m2!11m1!2sZuep6RPMS_uPvVRGkziJ3w",
            },
        })),
      ],
    })),
    {
      title: sectionTitle("Neighborhood"),
      renderItem: ExploreMap,
      data: [
        {
          image: exploreMap,
          description:
            "Here’s a quick guide to the areas around the city. Each area has it’s own distinct feel and different things to do!",
          credit: "map illustration by Subin Yang",
        },
      ],
    },
    ...neighborhoods.map((neighborhood) => ({
      title: sectionTitle("Neighborhood"),
      renderItem: Neighborhood,
      data: [
        {
          images: neighborhood.images.map((image) => ({ uri: image.url })),
          subtitle: neighborhood.name,
          meta: neighborhood.descriptor,
          body: neighborhood.description,
          ctaButton: {
            text: "Open our Yelp guide",
            link: neighborhood["external-url"],
          },
        },
      ],
    })),
  ]
}

export const ExploreScreen: FC<TabScreenProps<"Explore">> = () => {
  useHeader({ title: translate("exploreScreen.title") })

  const sections = useRecommendationSections()

  return (
    <Screen style={$root} preset="fixed">
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderSectionHeader={({ section: { title } }) => (
          <Text preset="screenHeading" style={title && $heading}>
            {title}
          </Text>
        )}
      />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $heading: TextStyle = {
  backgroundColor: colors.palette.neutral500,
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $carousel: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $exploreMapContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  marginBottom: spacing.extraLarge,
}

const $exploreMap: ImageStyle = {
  width: "100%",
  marginTop: spacing.medium,
  marginBottom: spacing.large,
  borderRadius: 4,
}

const $description: TextStyle = {
  marginTop: spacing.extraSmall,
  marginBottom: spacing.large,
}
