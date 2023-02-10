import React from "react"
import { TouchableOpacityProps, ViewStyle } from "react-native"
import { Icon, IconProps } from "./Icon"

interface IconButtonProps extends IconProps {
  /**
   * Called when a single tap gesture is detected.
   */
  onPress: TouchableOpacityProps["onPress"]
}

export function IconButton({
  onPress,
  icon,
  containerStyle: containerStyleOverride,
  ...props
}: IconButtonProps) {
  const $containerStyle = [$iconContainerStyle, containerStyleOverride]

  return <Icon {...{ onPress, icon }} containerStyle={$containerStyle} size={24} {...props} />
}

const $iconContainerStyle: ViewStyle = {
  backgroundColor: "#1C2B3D",
  width: 42,
  height: 42,
  borderRadius: 21,
  alignItems: "center",
  justifyContent: "center",
}
