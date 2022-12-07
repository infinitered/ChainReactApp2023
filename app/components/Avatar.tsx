import * as React from "react"
import { Image, StyleProp, View, ViewStyle, ImageStyle, ImageSourcePropType } from "react-native"
import { spacing } from "../theme"

export type AvatarPresets = keyof typeof $viewPresets

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
  preset?: "workshop" | "talk"
  /**
   * The avatar to display
   */
  source: ImageSourcePropType
}

interface PanelAvatarProps extends CommonProps {
  preset: "speaker-panel"
  /**
   * Multiple avatars to display
   */
  sources: ImageSourcePropType[]
}

export type AvatarProps = SingleAvatarProps | PanelAvatarProps

/**
 * Displays an avatar for a workshop, talk or speaker panel
 */
export const Avatar: React.FC<AvatarProps> = (props) => {
  const { style: $styleOverride, imageStyle } = props
  const preset: AvatarPresets = $viewPresets[props.preset] ? props.preset : "workshop"
  const $imageStyle = Object.assign({}, $viewPresets[preset], imageStyle)
  const $containerStyle = [$baseContainerStyle, $styleOverride]

  if (preset !== "speaker-panel") {
    return (
      <View style={$containerStyle}>
        <Image
          source={(props as SingleAvatarProps).source}
          style={$imageStyle}
          resizeMode="contain"
        />
      </View>
    )
  } else {
    const sources = (props as PanelAvatarProps).sources
    return (
      <View style={$containerStyle}>
        {sources.map((source, index) => (
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
}

const $panelImageStyle: ImageStyle = {
  marginTop: spacing.small,
  marginStart: -spacing.small,
}
