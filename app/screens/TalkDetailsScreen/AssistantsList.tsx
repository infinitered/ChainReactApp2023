import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage, Text } from "../../components"
import { translate } from "../../i18n"
import { colors, spacing } from "../../theme"
import { Speaker } from "../../services/api/webflow-api.types"
import { SocialButtons } from "../../components/SocialButton"

export interface AssistantsListProp {
  assistants: Speaker[]
}

export function AssistantsList(props: AssistantsListProp) {
  const { assistants } = props

  if (!assistants) return null

  return (
    <>
      <View style={$assistantContainer}>
        <Text
          preset="listHeading"
          text={translate("talkDetailsScreen.assistingTheWorkshop")}
          style={$assistantHeading}
        />
        <View
          style={assistants.length < 2 ? $assistantsContainerWithOne : $assistantsContainerWithMore}
        >
          {assistants.map((assistant) => (
            <View style={$assistant} key={assistant._id}>
              <AutoImage source={{ uri: assistant["speaker-photo"].url }} style={$assistantImage} />
              <Text preset="companionHeading" text={assistant.name} />
              <Text preset="label" style={$assistantCompany} text={assistant.company} />
              <View style={$assistantLinks}>
                <SocialButtons
                  socialButtons={[
                    { icon: "twitter", url: assistant.twitter },
                    { icon: "github", url: assistant.github },
                    { icon: "link", url: assistant.externalURL },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

const $assistantsContainerWithOne: ViewStyle = {
  flexDirection: "row",
  marginStart: spacing.large,
}

const $assistantsContainerWithMore: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
}

const $assistantContainer: ViewStyle = {
  marginTop: spacing.large,
  marginBottom: spacing.huge,
}

const $assistant: ViewStyle = {
  alignItems: "center",
}

const $assistantHeading: TextStyle = {
  marginVertical: spacing.large,
}

const $assistantImage: ImageStyle = {
  height: 90,
  width: 90,
  aspectRatio: 1,
  borderRadius: 100,
  marginBottom: spacing.large,
}

const $assistantCompany: TextStyle = {
  marginTop: spacing.tiny,
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $assistantLinks: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.large,
}
