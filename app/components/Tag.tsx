import React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Text, TextProps } from "./Text"

export interface TagProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
}

export function Tag(props: TagProps) {
  const { tx, text, txOptions, style: $viewStyleOverride, textStyle: $textStyleOverride } = props

  const $shadow = [$baseShadow, $viewStyleOverride]
  const $text = [$baseText, $textStyleOverride]

  return (
    <View style={$shadow}>
      <View style={$innerContainer}>
        <Text preset="tag" tx={tx} text={text} txOptions={txOptions} style={$text} />
      </View>
    </View>
  )
}

const $innerContainer: ViewStyle = {
  minHeight: 31,
  borderRadius: 100,
  borderWidth: 1,
  borderColor: colors.palette.neutral900,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  overflow: "hidden",
}

const $baseText: TextStyle = {
  color: colors.palette.neutral500,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $baseShadow: ViewStyle = {
  paddingBottom: spacing.micro,
  borderRadius: 100,
  borderColor: colors.palette.neutral900,
  backgroundColor: colors.palette.secondary500,
  width: "50%",
}
