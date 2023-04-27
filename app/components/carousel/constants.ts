import { Dimensions } from "react-native"
import { spacing } from "../../theme"

export const { width: SCREEN_WIDTH } = Dimensions.get("screen")
// spacing.large is size of the content gutter for the app.
export const SCREEN_CONTENT_GUTTER = spacing.large
export const SCREEN_CONTENT_WIDTH = SCREEN_WIDTH - SCREEN_CONTENT_GUTTER * 2
export const CAROUSEL_CARD_WIDTH = Math.floor(SCREEN_CONTENT_WIDTH * 0.95)
export const CAROUSEL_GAP = spacing.medium
export const CAROUSEL_INTERVAL = CAROUSEL_CARD_WIDTH + CAROUSEL_GAP
