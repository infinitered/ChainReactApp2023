const palette = {
  neutral100: "#F8F7F7",
  neutral300: "#394D64",
  neutral500: "#081828",
  neutral900: "##060B10",

  primary100: "#E2E1F2",
  primary500: "#776EFB",

  secondary500: "#00C6B7",

  bold500: "#F05F3F",

  highlight500: "#FFC854",

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
  background: palette.neutral500,
  /**
   * The default border color.
   */
  border: palette.primary500,
  /**
   * The main tinting color.
   */
  tint: palette.primary100,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
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
