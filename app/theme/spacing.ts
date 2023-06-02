/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
} as const

export const layout = {
  // Horizontal padding used for the app
  horizontalGutter: spacing.large,
  headerHeight: 56,
  tabBarHeight: 70,
  mediaButtonGutter: spacing.medium * 2 + 16 + spacing.small, // 16 for the font size, medium * 2 for the vertical padding, small for extra breathing room
}

export type Spacing = keyof typeof spacing
