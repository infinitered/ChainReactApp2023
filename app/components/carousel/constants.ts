import { Dimensions } from "react-native"
import { spacing } from "../../theme"

export const { width: SCREEN_WIDTH } = Dimensions.get("screen")
export const SCREEN_CONTENT_WIDTH = SCREEN_WIDTH - spacing.large * 2
export const CAROUSEL_IMAGE_WIDTH = SCREEN_WIDTH * 0.85
export const SPACING = spacing.extraSmall
export const SPACER_WIDTH = (SCREEN_WIDTH - SCREEN_WIDTH * 0.9) / 2
