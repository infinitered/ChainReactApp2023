import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Screen, Text, Tag, IconButton } from "../components"

export const TalkDetailsScreen: FC<StackScreenProps<AppStackParamList, "TalkDetails">> = observer(
  function TalkDetailsScreen() {
    const onPress = () => console.log("pressed")
    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <Text text="talkDetails" />

        <IconButton icon="twitter" onPress={onPress} />
        <IconButton icon="github" onPress={onPress} />
        <IconButton icon="link" onPress={onPress} />

        <Tag text="Beginner Workshop" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
