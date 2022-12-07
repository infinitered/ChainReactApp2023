import React from "react"
import {
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  FlatList,
  ImageSourcePropType,
  Image,
} from "react-native"
import { CarouselCard, Screen, Text } from "../components"
import { useHeader } from "../hooks"
import { TabScreenProps } from "../navigators/TabNavigator"
import { colors, spacing } from "../theme"
import { translate } from "../i18n"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"

const IMAGE_WIDTH = 358

const phoneNumber = "360-450-4752"

const confImage = require("../../assets/images/info-conf.png")
const irImage1 = require("../../assets/images/info-ir1.png")
const irImage2 = require("../../assets/images/info-ir2.png")
const irImage3 = require("../../assets/images/info-ir3.png")

const carouselImages: ImageSourcePropType[] = [irImage1, irImage2, irImage3]

export const InfoScreen: React.FunctionComponent<TabScreenProps<"Info">> = () => {
  useHeader({ title: translate("infoScreen.title") })

  // NOTE: this only works on a device, warning in sim
  const callPhoneNumber = () => openLinkInBrowser(`tel:${phoneNumber}`)

  return (
    <Screen style={$root} preset="scroll" ScrollViewProps={{ showsVerticalScrollIndicator: false }}>
      <View style={$content}>
        <Text preset="screenHeading" tx="infoScreen.screenHeading" />
      </View>

      <FlatList
        data={carouselImages}
        keyExtractor={(_, index) => `info-image-${index}`}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={IMAGE_WIDTH}
        style={$carousel}
        contentContainerStyle={$carouselContent}
        renderItem={({ item }) => {
          return (
            <View style={$cardWrapper}>
              <Image source={item} />
            </View>
          )
        }}
      />

      <View style={$content}>
        <Text preset="subheading" tx="infoScreen.aboutTitle" style={$heading} />
        <Text preset="infoText" tx="infoScreen.about" />

        <View style={$ctaContainer}>
          <CarouselCard.Link text="Email our team" openLink={() => console.log("email team")} />
        </View>

        <Text preset="infoText" tx="infoScreen.conductWarning" />
      </View>

      <View style={$imageContainer}>
        <Image style={$infoImage} source={confImage} />
      </View>

      <View style={$content}>
        <Text preset="primaryLabel" tx="infoScreen.codeOfConductTitle" style={$mb} />
        <Text preset="infoText" tx="infoScreen.codeOfConduct" style={$mb} />

        <Text preset="primaryLabel" tx="infoScreen.extraDetailsTitle" style={$mb} />
        <Text preset="infoText" tx="infoScreen.extraDetails" style={$mb} />

        <Text preset="primaryLabel" tx="infoScreen.reportingIncidentTitle" style={$mb} />
        <Text preset="infoText">
          {translate("infoScreen.reportingIncidentPart1")}
          <Text
            preset="infoText"
            style={$phoneNumber}
            onPress={callPhoneNumber}
            text={phoneNumber}
          />
          {translate("infoScreen.reportingIncidentPart2")}
        </Text>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $cardWrapper: ViewStyle = {
  marginRight: spacing.extraSmall,
  width: IMAGE_WIDTH,
}

const $heading: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $ctaContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.extraSmall,
  marginBottom: spacing.large,
}

const $carousel: ViewStyle = {
  paddingLeft: spacing.extraSmall,
  marginVertical: spacing.medium,
}

const $carouselContent: ViewStyle = {
  paddingRight: spacing.extraSmall,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $imageContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $infoImage: ImageStyle = {
  borderRadius: 4,
  marginHorizontal: spacing.extraSmall,
}

const $mb: ViewStyle = {
  marginBottom: spacing.medium,
}

const $phoneNumber: TextStyle = {
  textDecorationLine: "underline",
  textDecorationColor: colors.text,
}
