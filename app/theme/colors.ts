const palette = {
  neutral100: "#F8F7F7",
  neutral200: "#D8DCE1",
  neutral300: "#8C97A4",
  neutral400: "#394D64",
  neutral500: "#152B42",
  neutral600: "#102438",
  neutral700: "#081828",
  neutral800: "#060B10",

  primary100: "#E2E1F2",
  primary200: "#BFBCEB",
  primary300: "#9C96F8",
  primary400: "#8880FF",
  primary500: "#776EFB",
  primary600: "#655DE5",
  primary700: "#4E46C6",
  primary800: "#4039B5",

  secondary100: "#E5F4F3",
  secondary200: "#D0E9E7",
  secondary300: "#ACDDD9",
  secondary400: "#82D3CD",
  secondary500: "#00C6B7",
  secondary600: "#19BFB3",
  secondary700: "#4CB8B0",
  secondary800: "#3FA39B",

  bold100: "#FAE8E4",
  bold200: "#F2D2CB",
  bold300: "#F1A493",
  bold400: "#EE856E",
  bold500: "#F05F3F",
  bold600: "#E05C3F",
  bold700: "#CD4D31",
  bold800: "#BD4806",

  highlight100: "#FAF2E3",
  highlight200: "#FAE9C5",
  highlight300: "#FDE3AC",
  highlight400: "#FFD377",
  highlight500: "#FFC854",
  highlight600: "#F9C75F",
  highlight700: "#F2BA4D",
  highlight800: "#EDA943",

  angry100: "#F2D6CD",
  angry500: "#C03403",
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral100,
  /**
   * Secondary text information.
   */
  textDim: palette.primary100,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral700,
  /**
   * The default border color.
   */
  border: palette.primary500,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral400,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
