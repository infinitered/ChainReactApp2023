import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Screen, Text } from "../components"

export const TalkDetailsScreen: FC<StackScreenProps<AppStackParamList, "TalkDetails">> = observer(
  function TalkDetailsScreen() {
    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <Text text="talkDetails" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
