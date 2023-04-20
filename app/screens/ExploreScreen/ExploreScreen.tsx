import React, { FC } from "react"
import {
  ActivityIndicator,
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
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"

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

const useRecommendationSections = (): {
  isLoading: boolean
  sections: Array<SectionListData<Array<DynamicCarouselItem>>>
} => {
  const { data: recommendations = [], isLoading } = useRecommendations()

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
    isLoading,
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

export const ExploreScreen: FC<TabScreenProps<"Explore">> = () => {
  useHeader({ title: translate("exploreScreen.title") })
  const { sections, isLoading } = useRecommendationSections()

  return (
    <Screen style={$root} preset="fixed">
      {isLoading && (
        <ActivityIndicator color={colors.tint} size="large" style={$activityIndicator} />
      )}
      {!isLoading && sections.length > 0 && (
        <SectionList
          ListFooterComponent={
            <ButtonLink
              openLink={() =>
                openLinkInBrowser(
                  "https://www.google.com/maps/d/u/0/viewer?mid=1QWdKaK186ufwRQR2m_oGSOIiRVMRjSs&hl=en_US&ll=45.52275389785826%2C-122.67765992521456&z=16",
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
      )}
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
