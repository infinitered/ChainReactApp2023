import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/TabNavigator"
import { spacing } from "../theme"

export const PlaceholderScreen: FC<TabScreenProps<"Schedule">> = observer(
  function PlaceholderScreen() {
    return (
      <Screen
        style={$root}
        preset="scroll"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$container}
      >
        <Text>Placeholder!</Text>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  padding: spacing.large,
  flex: 1,
  justifyContent: "space-around",
}
