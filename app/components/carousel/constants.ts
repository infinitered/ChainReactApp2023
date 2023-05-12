import { Dimensions } from "react-native"
import { layout, spacing } from "../../theme"

// Note: This will not react to screen dimension changes post intial render
const { width: screenWidth } = Dimensions.get("screen")
const screenContentWidth = screenWidth - layout.horizontalGutter * 2

// This sets the carousel card with to a percentage of the
// content width so that the next card subtly shows next to it.
export const CAROUSEL_CARD_WIDTH = Math.floor(screenContentWidth * 0.95)
export const CAROUSEL_GAP = spacing.medium
export const CAROUSEL_INTERVAL = CAROUSEL_CARD_WIDTH + CAROUSEL_GAP
export const CAROUSEL_START_SPACER = layout.horizontalGutter
// The ending spacer allows the carousel to scroll precisely to the
// last card in the carousel based on the CAROUSEL_INTERVAL
export const CAROUSEL_END_SPACER = screenContentWidth - CAROUSEL_INTERVAL + layout.horizontalGutter
