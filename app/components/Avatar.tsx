import * as React from "react"
import { Image, StyleProp, View, ViewStyle, ImageStyle, ImageSourcePropType } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "../theme"

type Presets = keyof typeof $viewPresets

type CommonProps = {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style to override the Image
   */
  imageStyle?: StyleProp<ImageStyle>
}

interface SingleAvatarProps extends CommonProps {
  preset?: "default" | "talk"
  /**
   * The avatar to display
   */
  source: ImageSourcePropType
}

interface PanelAvatarProps extends CommonProps {
  preset: "panel"
  /**
   * Multiple avatars to display
   */
  sources: ImageSourcePropType[]
}

type AvatarProps = SingleAvatarProps | PanelAvatarProps

/**
 * Displays an avatar for a workshop, talk or speaker panel
 */
export const Avatar: React.FC<AvatarProps> = observer(function Avatar(props) {
  const { style, imageStyle } = props
  const preset: Presets = $viewPresets[props.preset] ? props.preset : "default"
  const $imageStyle = Object.assign({}, $viewPresets[preset], imageStyle)

  if (preset !== "panel") {
    return (
      <View style={style}>
        <Image
          source={(props as SingleAvatarProps).source}
          style={$imageStyle}
          resizeMode="contain"
        />
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
