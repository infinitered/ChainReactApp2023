import { Tabs } from "expo-router"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, IconTypes } from "../../components"
import { translate, TxKeyPath } from "../../i18n"
import { colors, spacing, typography } from "../../theme"

interface Screen {
  name: string
  txLabel: TxKeyPath
  icon: IconTypes
}

const screens: Screen[] = [
  {
    name: "schedule",
    txLabel: "tabNavigator.scheduleTab",
    icon: "schedule",
  },
  {
    name: "venue",
    txLabel: "tabNavigator.venueTab",
    icon: "venue",
  },
  {
    name: "explore",
    txLabel: "tabNavigator.exploreTab",
    icon: "explore",
  },
  {
    name: "info",
    txLabel: "tabNavigator.infoTab",
    icon: "info",
  },
]

export default function Layout() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            tabBarLabel: translate(screen.txLabel),
            tabBarIcon: ({ focused }) => (
              <Icon icon={screen.icon} color={focused ? colors.tint : colors.palette.primary100} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
