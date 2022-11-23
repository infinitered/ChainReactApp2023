import React from "react"
import { AppState, AppStateStatus } from "react-native"

type UseAppStateProps = {
  match: RegExp
  nextAppState: AppStateStatus
  callback: () => void
}

export function useAppState({ match, nextAppState, callback }: UseAppStateProps) {
  const appState = React.useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current)

  React.useEffect(() => {
    // First time check (opening App from a killed state)
    if (appState.current === nextAppState) {
      callback()
    }

    // Set up event listener
    const subscription = AppState.addEventListener("change", _handleAppStateChange)
    return () => {
      subscription.remove()
    }
  }, [])

  const _handleAppStateChange = (newAppState) => {
    if (appState.current.match(match) && newAppState === nextAppState) {
      console.tron.log(`App has changed state to ${nextAppState} from ${appStateVisible}`)
      callback()
    }

    appState.current = newAppState
    setAppStateVisible(appState.current)
  }
}
