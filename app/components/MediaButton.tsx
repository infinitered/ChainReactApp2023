import React from "react"
import { colors } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { Icon } from "./Icon"
import { FloatingButton, FloatingButtonProps } from "./Button"

export interface MediaButtonProps extends FloatingButtonProps {
  /**
   * The url to open when the button is pressed.
   */
  talkURL: string
  /**
   * Whether the button should be visible or not when scrolling.
   */
  isScrolling: boolean
}

export function MediaButton(props: MediaButtonProps) {
  const { isScrolling, talkURL, ...rest } = props

  if (!talkURL) return null

  return (
    <FloatingButton
      isVisible={!isScrolling}
      testID="see-the-schedule-button"
      tx="talkDetailsScreen.watchTalk"
      LeftAccessory={(props) => (
        <Icon icon="youtube" color={colors.palette.neutral800} {...props} />
      )}
      TextProps={{ allowFontScaling: false }}
      onPress={() => openLinkInBrowser(talkURL)}
      {...rest}
    />
  )
}
