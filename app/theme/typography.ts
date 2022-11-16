export const customFontsToLoad = {
  gothamRoundedBold: require("../../assets/fonts/GothamRounded-Bold.otf"),
  gothamRoundedBook: require("../../assets/fonts/GothamRounded-Book.otf"),
  gothamRoundedMedium: require("../../assets/fonts/GothamRounded-Medium.otf"),
  gothamSsmBold: require("../../assets/fonts/GothamSSm-Bold.otf"),
  gothamSsmBook: require("../../assets/fonts/GothamSSm-Book.otf"),
  gothamSsmMedium: require("../../assets/fonts/GothamSSm-Medium.otf"),
}

const fonts = {
  gothamRounded: {
    book: "gothamRoundedBook",
    medium: "gothamRoundedMedium",
    bold: "gothamRoundedBold",
  },
  gothamSsm: {
    book: "gothamSsmBook",
    medium: "gothamSsmMedium",
    bold: "gothamSsmBold",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.gothamSsm,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: fonts.gothamRounded,
}
