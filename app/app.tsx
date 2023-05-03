/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React, { useLayoutEffect } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import { setupReactotron } from "./services/reactotron/reactotron"
import Config from "./config"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./services/api/react-query"
import { CustomToast, OTAUpdates } from "./components"

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
          <OTAUpdates />
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
