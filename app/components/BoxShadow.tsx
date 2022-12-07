import React from "react"
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"

const cardOffset = require("../../assets/images/card-offset.png")

type Presets = keyof typeof $offsetPresets

interface BoxShadowProps {
  /**
   * The children node(s) to build the box under
   */
  children: React.ReactNode
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * Style override for the outside container
   */
  style?: StyleProp<ViewStyle>
  /**
   * Offset spacing amount the shadow should be from the children
   */
  offset?: number
}

export function BoxShadow(props: BoxShadowProps): React.ReactElement {
  const [height, setHeight] = React.useState(null)
  const [width, setWidth] = React.useState(null)
  const preset: Presets = $offsetPresets[props.preset] ? props.preset : "default"
  const $offset = [$offsetPresets[preset]]
  const offsetAmount = props.offset || spacing.tiny
  const $offsetContainerSpacing = { left: offsetAmount, top: offsetAmount }

  return (
    <View
      onLayout={(e) => {
        setHeight(e.nativeEvent.layout.height)
        setWidth(e.nativeEvent.layout.width)
      }}
      style={props.style}
    >
      <View style={[$offsetContainer, $offsetContainerSpacing]}>
        <Image style={[$offset, { height, width: width - offsetAmount }]} source={cardOffset} />
      </View>
      <View style={{ marginEnd: offsetAmount }}>{props.children}</View>
    </View>
  )
}

const $offsetContainer: ViewStyle = {
  position: "absolute",
}

const $offsetPresets = {
  default: [
    {
      borderColor: colors.palette.primary500,
      borderWidth: 1,
      tintColor: colors.palette.primary500,
    },
  ] as StyleProp<ImageStyle>,

  primary: [
    {
      backgroundColor: colors.palette.primary500,
      tintColor: colors.palette.secondary500,
      borderColor: colors.palette.neutral500,
      borderWidth: 1,
    },
  ] as StyleProp<ImageStyle>,

  bold: [
    {
      backgroundColor: colors.palette.bold500,
      tintColor: colors.palette.highlight500,
      borderColor: colors.palette.neutral500,
      borderWidth: 1,
    },
  ] as StyleProp<ImageStyle>,
}
