import React, { FC } from "react"
import { GestureResponderEvent, Linking, ViewStyle } from "react-native"
import { Button } from "./Button"
import { AutoImage } from "./AutoImage"
import { spacing } from "../theme"

type Props = {
  children: string
  style?: ViewStyle
  openLink: string | ((event: GestureResponderEvent) => void)
  preset?: "link" | "reversed" // "default" is not supported
}

export const ButtonLink: FC<Props> = ({ children, style, preset = "link", ...props }) => {
  const openLink = (e: GestureResponderEvent) => {
    if (typeof props.openLink === "function") {
      props.openLink(e)
      return
    }
    Linking.openURL(props.openLink)
  }

  return (
    <Button
      preset={preset}
      onPress={openLink}
      accessibilityRole="link"
      style={style}
      RightAccessory={() => (
        <AutoImage source={require("../../assets/icons/arrows.png")} style={$arrow} />
      )}
    >
      {children}
    </Button>
  )
}

const $arrow = {
  height: 24,
  width: 24,
  marginStart: spacing.extraSmall,
}
