import * as React from "react"
import {
  Image,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
  ImageStyle,
  ImageSourcePropType,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"

type Presets = keyof typeof $viewPresets

// interface SingleAvatarProps {
//   /**
//    * An optional style override useful for padding & margin.
//    */
//   style?: StyleProp<ViewStyle>
//   /**
//    * One of the different types of button presets.
//    */
//   preset?: Omit<Presets, "panel">
//   /**
//    * An optional style to override the Image
//    */
//   imageStyle?: StyleProp<ImageStyle>
//   /**
//    * The avatar to display
//    */
//   source: ImageSourcePropType
// }

// interface MultipleAvatarProps {
//   /**
//    * An optional style override useful for padding & margin.
//    */
//   style?: StyleProp<ViewStyle>
//   /**
//    * One of the different types of button presets.
//    */
//   preset?: Pick<Presets, "panel">
//   /**
//    * An optional style to override the Image
//    */
//   imageStyle?: StyleProp<ImageStyle>
//   /**
//    * The avatars to display
//    */
//   sources: ImageSourcePropType[]
// }

// export type AvatarProps = MultipleAvatarProps | SingleAvatarProps

export interface AvatarProps {
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
  /**
   * The avatar to display
   */
  source: ImageSourcePropType
}

/**
 * Describe your component here
 */
export const Avatar = observer(function Avatar(props: AvatarProps) {
  const { style, imageStyle, source } = props
  const preset: Presets = $viewPresets[props.preset] ? props.preset : "default"
  const $imageStyle = Object.assign({}, $viewPresets[preset], imageStyle)

  return (
    <View style={style}>
      <Image source={source} style={$imageStyle} resizeMode="contain" />
    </View>
  )
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
