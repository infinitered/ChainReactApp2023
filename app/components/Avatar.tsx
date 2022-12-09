import * as React from "react"
import { Image, StyleProp, View, ViewStyle, ImageStyle, ImageSourcePropType } from "react-native"
import { spacing } from "../theme"

export type AvatarPresets = keyof typeof $viewPresets

export type AvatarProps = {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style to override the Image
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * Multiple avatars to display
   */
  sources: ImageSourcePropType[]
  /**
   * Preset for the avatar
   */
  preset?: "workshop" | "talk" | "speaker-panel"
}

/**
 * Displays an avatar for a workshop, talk or speaker panel
 */
export const Avatar: React.FC<AvatarProps> = (props) => {
  const { style: $styleOverride, imageStyle } = props
  const preset: AvatarPresets =
    props.sources.length > 1
      ? "multiple-images"
      : $viewPresets[props.preset]
      ? props.preset
      : "workshop"
  const $imageStyle = Object.assign({}, $viewPresets[preset], imageStyle)
  const $containerStyle = [$baseContainerStyle, $styleOverride]

  return (
    <View style={$containerStyle}>
      {props.sources.map((source, index) => (
        <Image
          key={`panel-${index}-${source}`}
          source={source}
          style={[$imageStyle, $panelImageStyle]}
          resizeMode="contain"
        />
      ))}
    </View>
  )
}

const $baseContainerStyle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
}

const $viewPresets = {
  workshop: {
    width: 80,
    height: 80,
    borderRadius: 40,
  } as StyleProp<ImageStyle>,

  talk: {
    width: 100,
    height: 100,
    borderRadius: 50,
  } as StyleProp<ImageStyle>,

  "speaker-panel": {
    width: 42,
    height: 42,
    borderRadius: 21,
  } as StyleProp<ImageStyle>,

  "multiple-images": {
    width: 42,
    height: 42,
    borderRadius: 21,
  } as StyleProp<ImageStyle>,
}

const $panelImageStyle: ImageStyle = {
  marginTop: spacing.small,
  marginStart: -spacing.small,
}
