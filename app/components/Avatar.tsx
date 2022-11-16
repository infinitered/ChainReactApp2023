import * as React from "react"
import { Image, StyleProp, View, ViewStyle, ImageStyle, ImageSourcePropType } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "../theme"

type Presets = keyof typeof $viewPresets

interface CommonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional style to override the Image
   */
  imageStyle?: StyleProp<ImageStyle>
}

type SourceProps =
  | {
      preset?: Omit<Presets, "panel">
      /**
       * The avatar to display
       */
      source: ImageSourcePropType
      sources: never
    }
  | {
      preset: Omit<Presets, "default" | "talk">
      source: never
      /**
       * Multiple avatars to display
       */
      sources: ImageSourcePropType[]
    }

type AvatarProps = CommonProps & SourceProps

/**
 * Displays an avatar for a workshop, talk or speaker panel
 */
export const Avatar = observer(function Avatar(props: AvatarProps) {
  const { style, imageStyle } = props
  const preset: Presets = $viewPresets[props.preset] ? props.preset : "default"
  const $imageStyle = Object.assign({}, $viewPresets[preset], imageStyle)

  if (preset !== "panel") {
    return (
      <View style={style}>
        <Image source={props.source} style={$imageStyle} resizeMode="contain" />
      </View>
    )
  } else {
    // TODO
    // speaker panel multiple images here
    // map over sources
    return <View />
  }
})

const $viewPresets = {
  default: {
    backgroundColor: colors.palette.primary500,
    width: 80,
    height: 80,
    borderRadius: 40,
  } as StyleProp<ImageStyle>,

  talk: {
    backgroundColor: colors.palette.primary500,
    width: 100,
    height: 100,
    borderRadius: 50,
  } as StyleProp<ImageStyle>,

  panel: {
    width: 42,
    height: 42,
    borderRadius: 21,
  } as StyleProp<ImageStyle>,
}
