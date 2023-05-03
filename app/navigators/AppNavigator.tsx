/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Usually this will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in, but in this case we
 * just have a single flow.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { DebugScreen, TalkDetailsScreen, WelcomeScreen, WorkshopDetailsScreen } from "../screens"
import { BreakDetailsScreen } from "../screens/TalkDetailsScreen/BreakDetailsScreen"
import { colors } from "../theme"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { TabNavigator, TabParamList } from "./TabNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Debug: undefined
  Tabs: NavigatorScreenParams<TabParamList>
  TalkDetails: { scheduleId: string }
  Welcome: undefined
  WorkshopDetails: { scheduleId: string }
  BreakDetails: { scheduleId: string }
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Welcome"}>
      <Stack.Screen name="Debug" component={DebugScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="TalkDetails"
        component={TalkDetailsScreen}
        options={{ fullScreenGestureEnabled: true }}
      />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="WorkshopDetails"
        component={WorkshopDetailsScreen}
        options={{ fullScreenGestureEnabled: true }}
      />
      <Stack.Screen
        name="BreakDetails"
        component={BreakDetailsScreen}
        options={{ fullScreenGestureEnabled: true }}
      />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  const navTheme = React.useMemo(() => {
    const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme
    return {
      ...theme,
      colors: {
        ...theme.colors,
        background: colors.background,
      },
    }
  }, [colorScheme])

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  )
}
