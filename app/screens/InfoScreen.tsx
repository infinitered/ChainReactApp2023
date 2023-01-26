import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle, ImageSourcePropType, Image } from "react-native"
import { Button, Screen, Text } from "../components"
import { useAppNavigation, useHeader } from "../hooks"
import { TabScreenProps } from "../navigators/TabNavigator"
import { colors, spacing } from "../theme"
import { translate } from "../i18n"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { Carousel } from "../components/Carousel"

const phoneNumber = "360-450-4752"

const confImage = require("../../assets/images/info-conf.png")
const irImage1 = require("../../assets/images/info-ir1.png")
const irImage2 = require("../../assets/images/info-ir2.png")
const irImage3 = require("../../assets/images/info-ir3.png")

const carouselData: ImageSourcePropType[] = [irImage1, irImage2, irImage3]

export const InfoScreen: React.FunctionComponent<TabScreenProps<"Info">> = () => {
  // NOTE: this only works on a device, warning in sim
  const callPhoneNumber = () => openLinkInBrowser(`tel:${phoneNumber}`)
  const contactByEmail = () => openLinkInBrowser("mailto:conf@infinite.red")

  const navigation = useAppNavigation()

  useHeader({
    title: translate("infoScreen.title"),
    rightTx: "infoScreen.contact",
    onRightPress: contactByEmail,
    leftText: "     ",
    onLeftPress: () => navigation.navigate("Debug"),
  })

  return (
    <Screen style={$root} preset="scroll" ScrollViewProps={{ showsVerticalScrollIndicator: false }}>
      <Text preset="screenHeading" tx="infoScreen.screenHeading" style={$screenHeading} />

      <Carousel
        preset="static"
        data={carouselData}
        subtitle={translate("infoScreen.aboutTitle")}
        body={translate("infoScreen.about")}
      />

      <View style={$content}>
        <Text preset="screenHeading" text="Code of conduct" style={$codeOfConductHeading} />
        <Text tx="infoScreen.conductWarning" />
      </View>

      <View style={$imageContainer}>
        <Image style={$infoImage} source={confImage} />
      </View>

      <View style={$content}>
        <Text preset="primaryLabel" tx="infoScreen.codeOfConductTitle" style={$mb} />
        <Text tx="infoScreen.codeOfConduct" style={$mb} />

        <Text preset="primaryLabel" tx="infoScreen.extraDetailsTitle" style={$mb} />
        <Text tx="infoScreen.extraDetails" style={$mb} />

        <Text preset="primaryLabel" tx="infoScreen.reportingIncidentTitle" style={$mb} />
        <Text>
          {translate("infoScreen.reportingIncidentPart1")}
          <Text style={$phoneNumber} onPress={callPhoneNumber} text={phoneNumber} />
          {translate("infoScreen.reportingIncidentPart2")}
        </Text>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $imageContainer: ViewStyle = {
  marginVertical: spacing.large,
}

const $infoImage: ImageStyle = {
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

const $screenHeading: ViewStyle = {
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $hiddenButton: ViewStyle = {
  height: 48,
  marginStart: spacing.medium,
  width: 50,
  backgroundColor: "red",
}
