import React from "react"
import { TextStyle, View, ViewStyle, Image } from "react-native"
import { Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { translate } from "../../i18n"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { useAppNavigation, useHeader } from "../../hooks"

const phoneNumber = "360-450-4752"

const confImage = require("../../../assets/images/info-conf.png")

export const CodeOfConductScreen = () => {
  const callPhoneNumber = () => openLinkInBrowser(`tel:${phoneNumber}`)

  const navigation = useAppNavigation()

  useHeader({
    title: translate("infoScreen.codeOfConductHeaderTitle"),
    leftIcon: "back",
    onLeftPress: () => navigation.goBack(),
  })

  return (
    <Screen style={$root} preset="scroll" ScrollViewProps={{ showsVerticalScrollIndicator: false }}>
      <View style={$content}>
        <Text preset="screenHeading" text="Code of conduct" style={$codeOfConductHeading} />
        <Text tx="infoScreen.conductWarning" />
      </View>

      <View style={$imageContainer}>
        <Image source={confImage} />
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
  margin: spacing.large,
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
