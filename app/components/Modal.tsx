import React from "react"
import { Modal as RNModal, TextStyle, View, ViewStyle } from "react-native"
import { TxKeyPath } from "../i18n"
import { colors, spacing } from "../theme"
import { Button, ButtonProps, Text } from "./"

interface OnPressProps extends ButtonProps {
  cta: () => void
  label: TxKeyPath
}

interface ModalProps {
  title: TxKeyPath
  subtitle?: TxKeyPath
  confirmOnPress: OnPressProps
  cancelOnPress: OnPressProps
  isVisible?: boolean
}

export const Modal = ({
  title,
  subtitle,
  confirmOnPress,
  cancelOnPress,
  isVisible,
}: ModalProps) => (
  <RNModal animationType="slide" transparent={true} visible={isVisible}>
    <View style={$wrapper}>
      <View style={$card}>
        <Text preset="subheading" tx={title} style={$textColor} />
        {subtitle ? <Text text="body" style={$subtitle} tx={subtitle} /> : null}
        <Button
          shadowStyle={$confirmButton}
          onPress={confirmOnPress.cta}
          tx={confirmOnPress.label}
        />
        <Button
          preset="link"
          style={$cancelButton}
          onPress={cancelOnPress.cta}
          tx={cancelOnPress.label}
        />
      </View>
    </View>
  </RNModal>
)

const $wrapper: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $card: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.medium,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.extraLarge,
  width: "80%",
}

const $textColor: TextStyle = {
  color: colors.palette.neutral800,
}

const $subtitle: TextStyle = {
  ...$textColor,
  marginTop: spacing.medium,
}

const $confirmButton: ViewStyle = {
  marginTop: spacing.large,
}

const $cancelButton: ViewStyle = {
  alignSelf: "center",
  marginTop: spacing.extraLarge,
}
