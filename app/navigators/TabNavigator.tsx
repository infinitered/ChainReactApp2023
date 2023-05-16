import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React, { ComponentType, FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, IconTypes } from "../components"
import { translate, TxKeyPath } from "../i18n"
import { ExploreScreen, ScheduleScreen, VenuesScreen, ChatScreen } from "../screens"
import { colors, layout, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { InfoStackNavigator } from "./InfoStackNavigator"

export type TabParamList = {
  Schedule: undefined
  Venues: undefined
  Explore: undefined
  InfoStack: undefined
  Chat: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

type ScreenComponentType =
  | FC<TabScreenProps<"Schedule">>
  | FC<TabScreenProps<"Venues">>
  | FC<TabScreenProps<"Explore">>
  | FC<TabScreenProps<"Chat">>
  | ComponentType

interface Screen {
  name: keyof TabParamList
  component: ScreenComponentType
  txLabel: TxKeyPath
  icon: IconTypes
}

const screens: Screen[] = [
  {
    name: "Schedule",
    component: ScheduleScreen,
    txLabel: "tabNavigator.scheduleTab",
    icon: "schedule",
  },
  {
    name: "Venues",
    component: VenuesScreen,
    txLabel: "tabNavigator.venuesTab",
    icon: "venue",
  },
  {
    name: "Explore",
    component: ExploreScreen,
    txLabel: "tabNavigator.exploreTab",
    icon: "explore",
  },
  {
    name: "InfoStack",
    component: InfoStackNavigator,
    txLabel: "tabNavigator.infoTab",
    icon: "info",
  },
  {
    name: "Chat",
    component: ChatScreen,
    txLabel: "tabNavigator.chatTab",
    icon: "chat",
  },
]

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + layout.tabHeight }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarAllowFontScaling: false,
      }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component as ComponentType}
          options={{
            tabBarLabel: translate(screen.txLabel),
            tabBarIcon: ({ focused }) => (
              <Icon icon={screen.icon} color={focused ? colors.tint : colors.palette.primary100} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
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
