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
import { Button, Carousel, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { useRecommendations } from "../../services/api"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"
import { groupBy } from "../../services/api/webflow-helpers"
import { RawRecommendations } from "../../services/api/webflow-api.types"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"

const exploreMap = require("../../../assets/images/exploreMap.png")

interface CreditData {
  author: string
  text: string
  link: string
}
interface ExploreMapProps {
  image: ImageSourcePropType
  description: string
  credit: CreditData
}

const recommendationTypes = Object.values(WEBFLOW_MAP.recommendationType)
type RecommendationType = typeof recommendationTypes[number]
type GroupedRecommendations = Record<RecommendationType, RawRecommendations[]>

const initialRecs = recommendationTypes.reduce<GroupedRecommendations>(
  (acc, recommendationType) => ({ ...acc, [recommendationType]: [] }),
  {} as GroupedRecommendations,
)

const FoodAndDrink = ({ item }) => {
  return <Carousel preset="dynamic" data={item} />
}

const ArtMurals = ({ item }) => {
  return (
    <View style={$carousel}>
      <Carousel preset="dynamic" data={item} />
      <View style={$artButtonContainer}>
        <Button
          text="Open Google Maps list"
          onPress={() =>
            openLinkInBrowser(
              "https://www.google.com/maps/@45.5222313,-122.6833028,17z/data=!3m1!4b1!4m2!11m1!2sZuep6RPMS_uPvVRGkziJ3w",
            )
          }
        />
      </View>
    </View>
  )
}

const ExploreMap = ({ item }: { item: ExploreMapProps }) => {
  return (
    <View style={$exploreMapContainer}>
      <Image source={item.image} style={$exploreMap} />
      <Text text={translate("exploreScreen.exploreNeighborhoods")} preset="screenHeading" />
      <Text text={item.description} style={$description} />
      <View style={$creditContainer}>
        <Text text={item.credit.text} />
        <Text onPress={() => openLinkInBrowser(item.credit.link)} style={$credit}>
          {" "}
          {item.credit.author}
        </Text>
      </View>
    </View>
  )
}

const Neighborhood = ({ item }) => {
  console.tron.log("item", item)
  return (
    <View style={$carousel}>
      <Carousel
        preset="static"
        data={item.images}
        subtitle={item.subtitle}
        body={item.body}
        meta={item.meta}
        button={item.button}
      />
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

  return [
    {
      title: sectionTitle("Food/Drink"),
      renderItem: FoodAndDrink,
      data: [
        recs["Food/Drink"].map((rec) => ({
          image: { uri: rec.images[0]?.url },
          subtitle: rec.name,
          meta: rec.descriptor,
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
        })),
      ],
    },
    {
      title: sectionTitle("SightSee"),
      renderItem: ArtMurals,
      data: [
        recs.SightSee.map((rec) => ({
          image: { uri: rec.images[0]?.url },
          subtitle: rec.name,
          meta: `${rec.descriptor} • free`,
          body: rec.description,
        })),
      ],
    },
    {
      title: sectionTitle("Neighborhood"),
      renderItem: ExploreMap,
      data: [
        {
          image: exploreMap,
          description:
            "Here’s a quick guide to the areas around the city. Each area has it’s own distinct feel and different things to do!",

          credit: {
            text: "map illustration by",
            author: "Subin Yang",
            link: "https://www.travelportland.com/about-us/meet-our-writers/#subin-yang",
          },
        },
      ],
    },
    {
      title: sectionTitle("Neighborhood"),
      renderItem: Neighborhood,
      data: recs.Neighborhood.map((rec) => ({
        images: rec.images.map((image) => ({ uri: image.url })),
        subtitle: rec.name,
        meta: rec.descriptor,
        body: rec.description,
        button: {
          text: "Open our Yelp guide",
          // The external link is not ready in the CMS yet
          link: rec["external-url"],
        },
      })),
    },
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
          <Text preset="screenHeading" style={!!title && $heading}>
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
  marginTop: spacing.large,
  paddingHorizontal: spacing.large,
}

const $carousel: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $artButtonContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $exploreMapContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  marginBottom: spacing.extraLarge,
}

const $exploreMap: ImageStyle = {
  width: "100%",
  marginBottom: spacing.large,
  borderRadius: 4,
}

const $description: TextStyle = {
  marginTop: spacing.extraSmall,
  marginBottom: spacing.large,
}

const $creditContainer: ViewStyle = {
  flexDirection: "row",
}

const $credit: TextStyle = {
  textDecorationLine: "underline",
}
