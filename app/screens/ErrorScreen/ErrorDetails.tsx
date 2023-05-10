import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"

export interface ErrorDetailsProps {
  error: Error | null
  errorInfo: ErrorInfo | null
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  const { error, errorInfo } = props
  const errorTitle = `${error}`.trim()
  // Issue body that is the first 10 lines of the error stack
  const issueBodyStacktrace = errorInfo?.componentStack.split("\n").slice(0, 10).join("\n")
  const githubURL = encodeURI(
    `https://github.com/infinitered/ChainReactApp2023/issues/new?title=(CRASH) ${errorTitle}&body=What were you doing when the app crashed?\n\n\nTruncated Stacktrace:\n\`\`\`${issueBodyStacktrace}\`\`\``,
  )

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="ladybug" size={64} />
        <Text style={$heading} preset="subheading" tx="errorScreen.title" />
        <Text tx="errorScreen.friendlySubtitle" />
      </View>

      <Button
        preset="default"
        style={$githubButton}
        shadowStyle={$button}
        tx="errorScreen.githubButton"
        onPress={() => openLinkInBrowser(githubURL)}
      />

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Text weight="bold" text={`${error}`.trim()} />
        <Text selectable style={$errorBacktrace} text={`${errorInfo?.componentStack}`.trim()} />
      </ScrollView>

      <Button
        style={$resetButton}
        shadowStyle={$button}
        onPress={props.onReset}
        tx="errorScreen.reset"
      />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.medium,
  flex: 1,
}

const $topSection: ViewStyle = {
  alignItems: "center",
  marginBottom: spacing.large,
}

const $heading: TextStyle = {
  marginBottom: spacing.medium,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginBottom: spacing.medium,
  marginTop: spacing.large,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.medium,
}

const $errorBacktrace: TextStyle = {
  marginTop: spacing.medium,
  color: colors.textDim,
}

const $button: ViewStyle = {
  backgroundColor: colors.error,
}

const $resetButton: ViewStyle = {
  ...$button,
  paddingHorizontal: spacing.huge,
}

const $githubButton: ViewStyle = {
  ...$button,
  paddingHorizontal: spacing.huge,
}
