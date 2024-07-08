import React from "react"
import { Text } from "./Text"
import { View, type TextStyle, type ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { translate } from "../i18n"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"

export const ClosedBanner = () => {
  const chainReactWebsite = () =>
    openLinkInBrowser(`https://${translate("common.appClosedLinkText")}`)

  return (
    <View style={$wrapper}>
      <Text style={$text}>
        {translate("common.appClosedPart1")}
        <Text style={$link} onPress={chainReactWebsite} tx="common.appClosedLinkText" />
        {translate("common.appClosedPart2")}
      </Text>
    </View>
  )
}

const $wrapper: ViewStyle = {
  backgroundColor: colors.errorBackground,
  padding: spacing.extraSmall,
}

const $text: TextStyle = {
  color: colors.error,
  textAlign: "center",
}

const $link: TextStyle = {
  color: colors.error,
  textDecorationColor: colors.error,
  textDecorationLine: "underline",
}
