import React, { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"

type Presets = keyof typeof $viewPresets

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    ...rest
  } = props

  const preset: Presets = $viewPresets[props.preset] ? props.preset : "default"
  function $viewStyle({ pressed }) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
    ]
  }
  function $textStyle({ pressed }) {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
    ]
  }

  return (
    <View style={$shadowPresets[preset]}>
      <Pressable style={$viewStyle} accessibilityRole="button" {...rest}>
        {(state) => (
          <>
            {!!LeftAccessory && (
              <LeftAccessory
                style={$leftAccessoryStyle}
                pressableState={state}
              />
            )}

            <Text
              tx={tx}
              text={text}
              txOptions={txOptions}
              style={$textStyle(state)}
            >
              {children}
            </Text>

            {!!RightAccessory && (
              <RightAccessory
                style={$rightAccessoryStyle}
                pressableState={state}
              />
            )}
          </>
        )}
      </Pressable>
    </View>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: 48,
  borderRadius: 100,
  borderColor: colors.palette.neutral500,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.large,
  overflow: "hidden",
}

const $linkStyle: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  overflow: "hidden",
}

const $baseTextStyle: TextStyle = {
  color: colors.palette.neutral500,
  fontSize: 16,
  lineHeight: 20,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $linkTextStyle: TextStyle = {
  color: colors.palette.primary500,
  fontSize: 16,
  fontFamily: typography.primary.medium,
  textAlign: "center",
}

const $rightAccessoryStyle: ViewStyle = {
  marginStart: spacing.extraSmall,
  zIndex: 1,
}
const $leftAccessoryStyle: ViewStyle = {
  marginEnd: spacing.extraSmall,
  zIndex: 1,
}

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.neutral500,
      backgroundColor: colors.palette.primary500,
    },
  ] as StyleProp<ViewStyle>,

  // filled: [$baseViewStyle, { backgroundColor: colors.palette.neutral300 }] as StyleProp<ViewStyle>,

  // reversed: [
  //   $baseViewStyle,
  //   { backgroundColor: colors.palette.neutral100 },
  // ] as StyleProp<ViewStyle>,

  link: [$linkStyle] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  // filled: $baseTextStyle,
  // reversed: [$baseTextStyle, { color: colors.palette.neutral100 }],

  link: $linkTextStyle,
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.neutral100, opacity: 0.65 },
  // filled: { backgroundColor: colors.palette.neutral300 },
  // reversed: { backgroundColor: colors.palette.neutral500 },
  link: null,
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  // filled: { opacity: 0.9 },
  // reversed: { opacity: 0.9 },
  link: null,
}

const $baseShadowStyle: ViewStyle = {
  paddingBottom: spacing.tiny,
  borderRadius: 100,
  borderColor: colors.palette.neutral500,
}

const $shadowPresets = {
  default: [
    $baseShadowStyle,
    {
      backgroundColor: colors.palette.primary500,
      flexGrow: 1,
    },
  ] as StyleProp<ViewStyle>,
  link: null,
}
