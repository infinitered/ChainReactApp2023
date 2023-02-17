/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React, { useLayoutEffect } from "react"
import {
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { colors, customFontsToLoad, spacing } from "./theme"
import { setupReactotron } from "./services/reactotron/reactotron"
import Config from "./config"
import { QueryClientProvider } from "@tanstack/react-query"
import messaging from "@react-native-firebase/messaging"
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message"
import { $baseSecondaryStyle, $baseStyle } from "./components"
import { Dimensions, ViewStyle } from "react-native"
import { queryClient } from "./services/api/react-query"

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: "localhost",
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

// Setting up our custom Toast component
const CustomToast = () => {
  const insets = useSafeAreaInsets()

  useLayoutEffect(() => {
    // handle a new push notification received while the app is in "foreground" state
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (
        remoteMessage.notification &&
        (remoteMessage.notification.title || remoteMessage.notification.body)
      ) {
        Toast.show({
          text1: remoteMessage.notification.title,
          text2: remoteMessage.notification.body,
        })
      }
    })
    return unsubscribe
  })

  const toastConfig: ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        contentContainerStyle={$toastContainer}
        style={$toast}
        text1Style={$baseStyle}
        text2Style={$baseSecondaryStyle}
      />
    ),
  }

  return <Toast config={toastConfig} topOffset={insets.top} />
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)
  const [recoveredFromError, setRecoveredFromError] = React.useState(false)
  const [areFontsLoaded] = useFonts(customFontsToLoad)

  useLayoutEffect(() => {
    // hide splash screen after 500ms
    setTimeout(hideSplashScreen, 500)
  })

  useLayoutEffect(() => {
    if (recoveredFromError) {
      setRecoveredFromError(false)
    }
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!isNavigationStateRestored || !areFontsLoaded) return null

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors} onReset={() => setRecoveredFromError(true)}>
        <QueryClientProvider client={queryClient}>
          <AppNavigator
            initialState={recoveredFromError ? { index: 0, routes: [] } : initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
          <CustomToast />
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App

const $toast: ViewStyle = {
  backgroundColor: colors.palette.neutral400,
  borderLeftWidth: 0,
  borderRadius: spacing.extraSmall,
  width: Dimensions.get("window").width - spacing.extraSmall * 2,
}

const $toastContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.medium,
}
