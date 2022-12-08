import React from "react"
import {
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  ImageSourcePropType,
  Image,
  Animated,
  StyleSheet,
} from "react-native"
import { Button, Screen, Text } from "../components"
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
  // NOTE: this only works on a device, warning in sim
  const callPhoneNumber = () => openLinkInBrowser(`tel:${phoneNumber}`)
  const contactByEmail = () => openLinkInBrowser("mailto:conf@infinite.red")

  useHeader({
    title: translate("infoScreen.title"),
    RightActionComponent: (
      <Button preset="link" text="Contact" onPress={contactByEmail} style={$emailButton} />
    ),
  })

  const scrollX = React.useRef(new Animated.Value(0)).current

  return (
    <Screen style={$root} preset="scroll" ScrollViewProps={{ showsVerticalScrollIndicator: false }}>
      <View style={$content}>
        <Text preset="screenHeading" tx="infoScreen.screenHeading" />
      </View>

      <Animated.FlatList
        data={carouselImages}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        keyExtractor={(_, index) => `info-image-${index}`}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={IMAGE_WIDTH}
        style={$carousel}
        contentContainerStyle={$carouselContent}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * IMAGE_WIDTH,
            index * IMAGE_WIDTH,
            (index + 1) * IMAGE_WIDTH,
          ]

          const scale = scrollX.interpolate({ inputRange, outputRange: [1, 1.1, 1] })

          return (
            <View style={{ overflow: "hidden", borderRadius: 4, marginEnd: spacing.extraSmall }}>
              <Animated.Image
                source={item}
                style={[{ resizeMode: "cover", transform: [{ scale }] }]}
              />
            </View>
          )
        }}
      />

      <View style={$content}>
        <Text preset="subheading" tx="infoScreen.aboutTitle" style={$heading} />
        <Text preset="infoText" tx="infoScreen.about" />

        <Text preset="screenHeading" text="Code of conduct" style={$codeOfConductHeading} />
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
  marginEnd: spacing.extraSmall,
  width: IMAGE_WIDTH,
}

const $heading: TextStyle = {
  marginBottom: spacing.extraSmall,
}

const $carousel: ViewStyle = {
  paddingStart: spacing.extraSmall,
  marginVertical: spacing.medium,
}

const $carouselContent: ViewStyle = {
  paddingEnd: spacing.extraSmall,
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

const $codeOfConductHeading: TextStyle = {
  marginTop: spacing.extraLarge * 2,
  marginBottom: spacing.extraSmall,
}

const $emailButton: ViewStyle = {
  marginEnd: spacing.medium,
}
