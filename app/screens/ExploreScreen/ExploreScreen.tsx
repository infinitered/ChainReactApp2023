import React, { FC, Suspense } from "react"
import {
  ActivityIndicator,
  Linking,
  SectionList,
  SectionListData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { ButtonLink, Carousel, Screen, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../hooks/useHeader"
import { translate } from "../../i18n"
import { useRecommendations } from "../../services/api"
import { WEBFLOW_MAP } from "../../services/api/webflow-consts"
import { RawRecommendations } from "../../services/api/webflow-api.types"
import { DynamicCarouselItem } from "../../components/carousel/carousel.types"
import { groupBy } from "../../utils/groupBy"
import { customSortObjectKeys } from "../../utils/customSort"

const recommendationTypes = Object.values(WEBFLOW_MAP.recommendationType)
type RecommendationType = typeof recommendationTypes[number]
type GroupedRecommendations = Record<RecommendationType, RawRecommendations[]>

const initialRecs = recommendationTypes.reduce<GroupedRecommendations>(
  (acc, recommendationType) => ({ ...acc, [recommendationType]: [] }),
  {} as GroupedRecommendations,
)

const RenderItem = ({ item }: { item: Array<DynamicCarouselItem> }) =>
  item.length > 0 ? (
    <View style={$carouselWrapper}>
      <Carousel data={item} preset="dynamic" />
    </View>
  ) : null

const sectionTitle = (type: RecommendationType) => {
  switch (type) {
    case "Food/Drink":
      return translate("exploreScreen.nearbyFoodAndDrink")
    case "SightSee":
      return translate("exploreScreen.sightSee")
    case "Unique/to/Portland":
      return translate("exploreScreen.uniqueToPortland")
    default:
      return translate("exploreScreen.nearbyFoodAndDrink")
  }
}

const useRecommendationSections = (): { sections: SectionListData<any>[] } => {
  const { data: recommendations = [] } = useRecommendations()

  const rawRecs = groupBy("type")(recommendations)
  const recs = Object.keys(rawRecs).reduce<GroupedRecommendations>(
    (acc, recommendationType) => ({
      ...acc,
      [WEBFLOW_MAP.recommendationType[recommendationType]]: rawRecs[recommendationType] ?? [],
    }),
    initialRecs,
  )
  const sortedRecs = customSortObjectKeys(recs, ["Food/Drink", "Unique/to/Portland"])

  return {
    sections: Object.entries(sortedRecs).map(
      ([key, value]: [RecommendationType, RawRecommendations[]]) => ({
        title: sectionTitle(key),
        renderItem: RenderItem,
        data: [
          value.map(
            (item) =>
              ({
                image: item.images.map((image) => ({ uri: image.url })),
                subtitle: item.name,
                meta: item.descriptor,
                body: item.description,
                leftButton:
                  item["street-address"] && item["city-state-zip"]
                    ? {
                        text: translate("exploreScreen.openInMaps"),
                        link: `${item["street-address"]},${item["city-state-zip"]}`,
                      }
                    : undefined,
              } as DynamicCarouselItem),
          ),
        ],
      }),
    ),
  }
}

const Layout = () => {
  const { sections } = useRecommendationSections()

  return (
    <SectionList
      ListFooterComponent={
        <ButtonLink
          openLink={() =>
            Linking.openURL(
              "https://www.google.com/maps/d/viewer?mid=1QWdKaK186ufwRQR2m_oGSOIiRVMRjSs&hl=en_US&ll=45.52275389785826%2C-122.67765992521456&z=16",
            )
          }
          style={$buttonLink}
          preset="reversed"
        >
          {translate("exploreScreen.wantToSeeMore")}
        </ButtonLink>
      }
      stickySectionHeadersEnabled={false}
      sections={sections}
      renderSectionHeader={({ section: { title, data } }) =>
        data[0].length > 0 ? (
          <Text preset="screenHeading" style={!!title && $heading}>
            {title}
          </Text>
        ) : null
      }
    />
  )
}

export const ExploreScreen: FC<TabScreenProps<"Explore">> = () => {
  useHeader({ title: translate("exploreScreen.title") })

  return (
    <Screen style={$root} preset="fixed">
      <Suspense
        fallback={<ActivityIndicator color={colors.tint} size="large" style={$activityIndicator} />}
      >
        <Layout />
      </Suspense>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  alignItems: "center",
}

const $activityIndicator: ViewStyle = {
  flex: 1,
}

const $heading: TextStyle = {
  marginBottom: spacing.medium,
  paddingHorizontal: spacing.large,
}

const $carouselWrapper: ViewStyle = {
  marginBottom: spacing.large,
}

const $buttonLink: ViewStyle = {
  marginBottom: spacing.large,
  marginHorizontal: spacing.large,
}
