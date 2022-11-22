import React from "react"
import { TouchableOpacityProps, ViewStyle } from "react-native"
import { colors } from "../theme"
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

  return <Icon {...{ onPress, icon }} containerStyle={$containerStyle} size={20} {...props} />
}

const $iconContainerStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  width: 42,
  height: 42,
  borderRadius: 24,
  alignItems: "center",
  justifyContent: "center",
}
