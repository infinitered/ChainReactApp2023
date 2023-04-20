import React from "react"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { translate } from "../../i18n"
import { useAppNavigation, useHeader } from "../../hooks"
import { colors, spacing } from "../../theme"
import { FlashList } from "@shopify/flash-list"

export const CreditsScreen = () => {
  const navigation = useAppNavigation()
  const { width } = Dimensions.get("window")

  useHeader({
    title: translate("infoScreen.creditsTitle"),
    leftIcon: "back",
    onLeftPress: () => navigation.goBack(),
  })

  type Person = {
    name: string
    role: string
  }

  const data: Person[] = [
    {
      name: "Gant Laborde",
      role: "Organizer of Chain React",
    },
    {
      name: "Justin Huskey",
      role: "Co-organizer of Chain React & App Design",
    },
    {
      name: "Jamon Holmgren",
      role: "Co-organizer of Chain React & App Development",
    },
    {
      name: "Jenna Fucci",
      role: "Designer (web, app, and print)",
    },
    {
      name: "Simran Sachdeva",
      role: "CFP Committee & Workshop Assistant",
    },
    {
      name: "Darin Wilson",
      role: "CFP Committe",
    },
    {
      name: "Josh Yoes",
      role: "CFP Committee & App Development",
    },
    {
      name: "Kate Kim",
      role: "CFP Committee & App Development",
    },
    {
      name: "Robin Heinze",
      role: "App Lead & IR Table",
    },
    {
      name: "Mazen Chami",
      role: "App Development",
    },
    {
      name: "Frank Calise",
      role: "App Development",
    },
    {
      name: "Leon Kim",
      role: "App Development",
    },
    {
      name: "Silas Matson",
      role: "App Development",
    },
    {
      name: "Jon Major Condon",
      role: "App Development",
    },
    {
      name: "Yulian Glukhenko",
      role: "App Development",
    },
    {
      name: "Nick Morgan",
      role: "App Development",
    },
    {
      name: "Bryan Sterns",
      role: "App Testing",
    },
    {
      name: "Derek Greenberg",
      role: "App Testing",
    },
    {
      name: "Dan Edwards",
      role: "App Testing",
    },
    {
      name: "Jed Bartausky",
      role: "App Testing",
    },
    {
      name: "Ellie Croce",
      role: "App Testing",
    },
  ]

  return (
    <Screen style={$root}>
      <View style={[$container, { width }]}>
        <FlashList
          ListHeaderComponent={
            <Text preset="screenHeading" tx="infoScreen.creditsHeading" style={$heading} />
          }
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={$person}>
                <Text preset="companionHeading" text={item.name} />
                <Text preset="label" style={$role} text={item.role} />
              </View>
            )
          }}
          estimatedItemSize={61}
        />
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  alignItems: "center",
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
}

const $heading: TextStyle = {
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
  marginBottom: spacing.large,
}

const $person: TextStyle = {
  paddingHorizontal: spacing.large,
  marginVertical: spacing.small,
}

const $role: TextStyle = {
  marginTop: spacing.tiny,
  color: colors.palette.primary500,
}
