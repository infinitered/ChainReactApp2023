import { Dimensions } from "react-native"
import { spacing } from "../../theme"

export const { width: SCREEN_WIDTH } = Dimensions.get("screen")
// spacing.large is size of the content gutter for the app.
export const SCREEN_CONTENT_GUTTER = spacing.large
export const SCREEN_CONTENT_WIDTH = SCREEN_WIDTH - SCREEN_CONTENT_GUTTER * 2
export const CAROUSEL_CARD_WIDTH = Math.floor(SCREEN_CONTENT_WIDTH * 0.95)
export const CAROUSEL_GAP = spacing.medium
export const CAROUSEL_INTERVAL = CAROUSEL_CARD_WIDTH + CAROUSEL_GAP
export const CAROUSEL_START_SPACER = SCREEN_CONTENT_GUTTER
// The ending spacer allows the carousel to scroll precisely to the
// last card in the carousel based on the CAROUSEL_INTERVAL
export const CAROUSEL_END_SPACER = SCREEN_CONTENT_WIDTH - CAROUSEL_INTERVAL + SCREEN_CONTENT_GUTTER
