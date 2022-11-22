import i18n from "i18n-js"
import React from "react"
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native"
import { isRTL, translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const {
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = $presets[props.preset] ? props.preset : "default"
  const $styles = [
    $rtlStyle,
    $presets[preset],
    $fontWeightStyles[weight],
    $sizeStyles[size],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $sizeStyles = {
  xxxl: { fontSize: 42, lineHeight: 46.2 } as TextStyle,
  xxl: { fontSize: 32, lineHeight: 45.2 } as TextStyle,
  xl: { fontSize: 26, lineHeight: 28.6 } as TextStyle,
  lg: { fontSize: 22, lineHeight: 24.2 } as TextStyle,
  md: { fontSize: 18, lineHeight: 19.8 } as TextStyle,
  sm: { fontSize: 16, lineHeight: 17.6 } as TextStyle,
  xs: { fontSize: 14, lineHeight: 15.4 } as TextStyle,
  xxs: { fontSize: 12, lineHeight: 13.2 } as TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } }
  },
  {}
) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.book,
  { color: colors.text },
  { lineHeight: 22.4 },
]

const $secondaryFontWeightStyles = Object.entries(typography.secondary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } }
  },
  {}
) as Record<Weights, TextStyle>

const $baseSecondaryStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $secondaryFontWeightStyles.book,
  { color: colors.text },
]

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [
    $baseStyle,
    $sizeStyles.xxxl,
    $fontWeightStyles.bold,
  ] as StyleProp<TextStyle>,

  companionHeading: [
    $baseStyle,
    $sizeStyles.md,
    $fontWeightStyles.medium,
  ] as StyleProp<TextStyle>,

  subheading: [
    $baseStyle,
    $sizeStyles.lg,
    $fontWeightStyles.medium,
  ] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formHelper: [
    $baseStyle,
    $sizeStyles.sm,
    $fontWeightStyles.book,
  ] as StyleProp<TextStyle>,

  eventTitle: [
    $baseSecondaryStyle,
    $sizeStyles.xxs,
    $secondaryFontWeightStyles.medium,
  ],

  link: [
    $baseSecondaryStyle,
    $sizeStyles.xxs,
    $secondaryFontWeightStyles.medium,
  ],

  primaryLabel: [
    $baseSecondaryStyle,
    $sizeStyles.xxs,
    $secondaryFontWeightStyles.medium,
    { color: colors.palette.primary500, textTransform: "uppercase" },
  ],
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
