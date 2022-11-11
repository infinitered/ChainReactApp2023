import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { PlaceholderScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type TabParamList = {
  Schedule: undefined
  Venue: undefined
  Explore: undefined
  Info: undefined
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

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Schedule"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: translate("tabNavigator.scheduleTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused ? colors.tint : colors.palette.primary100} />
          ),
        }}
      />

      <Tab.Screen
        name="Venue"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: translate("tabNavigator.venueTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : colors.palette.primary100} />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: translate("tabNavigator.exploreTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="podcast" color={focused ? colors.tint : colors.palette.primary100} />
          ),
        }}
      />

      <Tab.Screen
        name="Info"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: translate("tabNavigator.infoTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused ? colors.tint : colors.palette.primary100} />
          ),
        }}
      />
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

// @demo remove-file
