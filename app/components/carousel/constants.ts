import { Dimensions } from "react-native"
import { spacing } from "../../theme"

const { width: SCREEN_WIDTH } = Dimensions.get("screen")
// spacing.large is size of the gutter for the app.
// This calculation accounts for the gutter and gives you a
// percentage of the remaining width for the carousel image width.
export const CAROUSEL_IMAGE_WIDTH = (SCREEN_WIDTH - spacing.large * 2) * 0.93
export const SPACING = spacing.extraSmall
export const SPACER_WIDTH = spacing.medium
