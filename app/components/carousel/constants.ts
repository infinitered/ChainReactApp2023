import { Dimensions } from "react-native"
import { spacing } from "../../theme"

const { width: SCREEN_WIDTH } = Dimensions.get("screen")
export const CAROUSEL_IMAGE_WIDTH = SCREEN_WIDTH * 0.9
export const SPACING = spacing.extraSmall
export const SPACER_WIDTH = (SCREEN_WIDTH - CAROUSEL_IMAGE_WIDTH) / 2
