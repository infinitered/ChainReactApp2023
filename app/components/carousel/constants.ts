import { Dimensions } from "react-native"
import { spacing } from "../../theme"

export const { width: SCREEN_WIDTH } = Dimensions.get("screen")
// spacing.large is size of the gutter for the app.
export const SCREEN_CONTENT_WIDTH = SCREEN_WIDTH - spacing.large * 2
// This calculation accounts for the gutter and gives you a
// percentage of the remaining width for the carousel image width.
export const CAROUSEL_IMAGE_WIDTH = SCREEN_CONTENT_WIDTH * 0.95
export const SPACING = spacing.medium
