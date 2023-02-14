import React from "react"
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { Icon, IconProps } from "./Icon"

export interface SocialButtonProps extends PressableProps {
  /**
   * The icon to display.
   */
  icon: IconProps["icon"]
  /**
   * The size of the icon.
   */
  size?: number
  /**
   * Style overrides.
   */
  style?: StyleProp<ViewStyle>
  /**
   * The url to open when the button is pressed.
   */
  url: string
}

export function SocialButton(props: SocialButtonProps) {
  const { size, url, icon, style: $styleOverride, ...rest } = props

  if (!url) return null

  return (
    <Pressable
      onPress={() => {
        openLinkInBrowser(url)
      }}
      style={[$socialButton, $styleOverride]}
      {...rest}
    >
      <Icon icon={icon} size={size} />
    </Pressable>
  )
}

const $socialButton: ViewStyle = {
  backgroundColor: "#1C2B3D",
  width: 42,
  height: 42,
  borderRadius: 21,
  alignItems: "center",
  justifyContent: "center",
}
