import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ImageStyle, Image, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import { Screen, Text, Tag, IconButton, MIN_HEADER_HEIGHT } from "../../components"
import { colors, spacing } from "../../theme"
import { useAppNavigation, useHeader } from "../../hooks"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { TalkDetailsHeader } from "./TalksDetailsHeader"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

export const TalkDetailsScreen: FC<StackScreenProps<AppStackParamList, "TalkDetails">> = observer(
  function TalkDetailsScreen() {
    const navigation = useAppNavigation()
    // useHeader(
    //   {
    //     title: "Talk Title",
    //     leftIcon: "back",
    //     onLeftPress: navigation.goBack,
    //   },
    //   [navigation],
    // )
    const scrollY = useSharedValue(0)
    const onPress = () => openLinkInBrowser("https://infinite.red")

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y
      },
    })

    const { bottom: paddingBottom } = useSafeAreaInsets()

    return (
      <View style={{ flex: 1 }}>
        <TalkDetailsHeader
          title="Talk Title"
          subtitle="Subtitle"
          onPress={navigation.goBack}
          scrollY={scrollY}
        />

        <Animated.ScrollView
          style={[$scrollView, { paddingBottom }]}
          // preset="scroll"
          scrollEventThrottle={16}
          // safeAreaEdges={["bottom"]}
          onScroll={scrollHandler}
          contentContainerStyle={$scrollContainer}
        >
          <View style={$container}>
            <View style={$containerSpacing}>
              <Image source={{ uri: "https://picsum.photos/315" }} style={$speakerImage} />
              <Text preset="bold" style={$nameText} text="First Last" />
              <Text style={$companyNameText} text="Company, Inc" />
            </View>

            <View style={$detailsContainer}>
              <Text preset="bold" style={$detailsText} text="Workshop details" />
              <Tag text="Beginner Workshop" style={$containerSpacing} />
              <Text
                style={$bodyText}
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />
            </View>

            <View style={$containerSpacing}>
              <Text preset="eventTitle" style={$aboutHeading} text="About First" />
              <Text
                style={$bodyText}
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />
            </View>

            <View style={$linksContainer}>
              <IconButton icon="twitter" onPress={onPress} />
              <IconButton icon="github" onPress={onPress} />
              <IconButton icon="link" onPress={onPress} />
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    )
  },
)

// TODO: replace 50 with height of the title height + spacing + subtitle height from onLayout in child
const $scrollView: ViewStyle = {
  paddingTop: MIN_HEADER_HEIGHT + spacing.large + 50,
  backgroundColor: colors.background,
}

const $scrollContainer: ViewStyle = {
  paddingBottom: MIN_HEADER_HEIGHT + spacing.extraLarge + 50,
}

const $container = {
  padding: spacing.large,
}

const $containerSpacing: ViewStyle = {
  marginBottom: spacing.large,
}

const $linksContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "50%",
}

const $nameText: TextStyle = {
  fontSize: 22,
  lineHeight: 24.2,
  marginBottom: spacing.tiny,
}

const $subheadingColor: TextStyle = {
  color: colors.palette.primary500,
}

const $detailsContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $speakerImage: ImageStyle = {
  height: 315,
  marginBottom: spacing.medium,
}

const $companyNameText: TextStyle = {
  ...$subheadingColor,
  fontSize: 16,
  lineHeight: 22.4,
}

const $detailsText: TextStyle = {
  fontSize: 26,
  lineHeight: 28.6,
  ...$containerSpacing,
}

const $aboutHeading: TextStyle = {
  ...$containerSpacing,
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $bodyText: TextStyle = {
  fontSize: 16,
  lineHeight: 22.4,
}
