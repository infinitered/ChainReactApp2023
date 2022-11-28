import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ImageStyle, Image } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Screen, Text, Tag, IconButton } from "../components"
import { colors, spacing } from "../theme"
import { useHeader } from "../hooks/useHeader"
import { useAppNavigation } from "../hooks"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"

export const TalkDetailsScreen: FC<StackScreenProps<AppStackParamList, "TalkDetails">> = observer(
  function TalkDetailsScreen() {
    const navigation = useAppNavigation()
    useHeader(
      {
        title: "Talk Title",
        leftIcon: "back",
        onLeftPress: navigation.goBack,
      },
      [navigation],
    )
    const onPress = () => openLinkInBrowser("https://infinite.red")

    return (
      <Screen
        style={$root}
        preset="scroll"
        safeAreaEdges={["bottom"]}
        contentContainerStyle={$container}
      >
        <Text preset="bold" style={$titleText} text="Talk Title" />
        <Text preset="companionHeading" style={$subheading} text="Talk location / time" />

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
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
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

const $titleText: TextStyle = {
  fontSize: 32,
  lineHeight: 35.2,
  marginBottom: spacing.extraSmall,
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

const $subheading: TextStyle = {
  ...$subheadingColor,
  marginBottom: spacing.extraLarge,
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
