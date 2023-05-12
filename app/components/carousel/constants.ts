import { SCREEN_CONTENT_GUTTER, SCREEN_CONTENT_WIDTH } from "../../constants"
import { spacing } from "../../theme"

// This sets the carousel card with to a percentage of the
// content width so that the next card subtly shows next to it.
export const CAROUSEL_CARD_WIDTH = Math.floor(SCREEN_CONTENT_WIDTH * 0.95)
export const CAROUSEL_GAP = spacing.medium
export const CAROUSEL_INTERVAL = CAROUSEL_CARD_WIDTH + CAROUSEL_GAP
export const CAROUSEL_START_SPACER = SCREEN_CONTENT_GUTTER
// The ending spacer allows the carousel to scroll precisely to the
// last card in the carousel based on the CAROUSEL_INTERVAL
export const CAROUSEL_END_SPACER = SCREEN_CONTENT_WIDTH - CAROUSEL_INTERVAL + SCREEN_CONTENT_GUTTER
