import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen } from "../components"
import { TabScreenProps } from "../navigators/TabNavigator"
import { useTabNavigation } from "../hooks"

export const PlaceholderScreen: FC<TabScreenProps<"Schedule">> = observer(
  function PlaceholderScreen() {
    // Pull in navigation via hook
    const navigation = useTabNavigation()

    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <Button onPress={navigation.goBack} text="Go Back" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
