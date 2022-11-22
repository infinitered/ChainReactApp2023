import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacityProps, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { Icon, IconProps, Screen, Text } from "../components"
import { colors } from "../theme"
import { Tag } from "../components/Tag"

interface IconButtonProps extends IconProps {
  onPress: TouchableOpacityProps["onPress"]
}

function IconButton({
  onPress,
  icon,
  containerStyle: containerStyleOverride,
  ...props
}: IconButtonProps) {
  const $containerStyle = [$iconContainerStyle, containerStyleOverride]
  return <Icon {...{ onPress, icon }} containerStyle={$containerStyle} size={20} {...props} />
}

const $iconContainerStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  width: 42,
  height: 42,
  borderRadius: 24,
  alignItems: "center",
  justifyContent: "center",
}

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
