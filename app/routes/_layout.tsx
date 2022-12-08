import { SplashScreen, Stack } from "expo-router"
import "../i18n"
import "../utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { AppNavigator, useNavigationPersistence } from "../navigators"
import { ErrorBoundary } from "../screens/ErrorScreen/ErrorBoundary"
import * as storage from "../utils/storage"
import { customFontsToLoad } from "../theme"
import { setupReactotron } from "../services/reactotron"
import Config from "../config"

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

export default function Layout(props: AppProps) {
  const [isReady, setIsReady] = React.useState(false)
  // const {
  //   initialNavigationState,
  //   onNavigationStateChange,
  //   isRestored: isNavigationStateRestored,
  // } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 500)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  // if (!areFontsLoaded || !isReady) return <SplashScreen />

  // otherwise, we're ready to render the app
  return (
    <>
      {!areFontsLoaded && !isReady && <SplashScreen />}
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {/* <ErrorBoundary catchErrors={Config.catchErrors}> */}
        <Stack initialRouteName="welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="talk-details" />
        </Stack>
        {/* </ErrorBoundary> */}
      </SafeAreaProvider>
    </>
  )
}
