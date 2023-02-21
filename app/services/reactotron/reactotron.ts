/**
 * This file does the setup for integration with Reactotron, which is a
 * free desktop app for inspecting and debugging your React Native app.
 *
 * The functions are invoked from app.tsx and you can change the config there.
 *
 * Check out the "Custom Commands" section for some cool tools you can use,
 * customize, and make your own.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import { Platform } from "react-native"
import { Reactotron } from "./reactotronClient"
import { ArgType } from "reactotron-core-client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { saveString } from "../../utils/storage"
import { ReactotronConfig, DEFAULT_REACTOTRON_CONFIG } from "./reactotronConfig"
import { goBack, resetRoot, navigate, navigationRef } from "../../navigators/navigationUtilities"
import { fakeReactotron } from "./reactotronFake"
import { queryClient } from "../api/react-query"

/**
 * We tell typescript we intend to hang Reactotron off of the console object.
 *
 * It'll live at console.tron, so you can use it like so:
 *
 *   console.tron.log('hello world')
 *
 * You can also import Reactotron yourself from ./reactotronClient
 * and use it directly, like Reactotron.log('hello world')
 */
declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance,
     * and more. See https://github.com/infinitered/reactotron for more!
     */
    tron: typeof Reactotron
  }
}

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (__DEV__) {
  console.tron = Reactotron // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneak by our __DEV__ guards, we won't crash.
  console.tron = fakeReactotron
}

const config = DEFAULT_REACTOTRON_CONFIG

// Avoid setting up Reactotron multiple times with Fast Refresh
let _reactotronIsSetUp = false

/**
 * Configure reactotron based on the the config settings passed in, then connect if we need to.
 */
export function setupReactotron(customConfig: ReactotronConfig = {}) {
  // only run this in dev... metro bundler will ignore this block: 🎉
  if (__DEV__) {
    // only setup once.
    if (_reactotronIsSetUp) return

    // merge the passed in config with our default config
    Object.assign(config, customConfig)

    // configure reactotron
    Reactotron.configure({
      name: config.name || require("../../../package.json").name,
      host: config.host,
    })

    // hookup middleware
    if (Platform.OS !== "web") {
      if (config.useAsyncStorage) {
        Reactotron.setAsyncStorageHandler(AsyncStorage)
      }
      Reactotron.useReactNative({
        asyncStorage: config.useAsyncStorage ? undefined : false,
      })
    }

    // connect to the app
    Reactotron.connect()

    /**
     * Reactotron allows you to define custom commands that you can run
     * from Reactotron itself, and they will run in your app.
     *
     * Define them in the section below with `onCustomCommand`. Use your
     * creativity -- this is great for development to quickly and easily
     * get your app into the state you want.
     */

    Reactotron.onCustomCommand({
      command: "setCurrentDate",
      handler: (args) => {
        const { currentDate } = args
        ;(async () => {
          await saveString("currentDate", currentDate)
        })()
        if (currentDate) {
          console.log(`Setting current date: ${currentDate}`)
        } else {
          console.log("Could not set current date. No date provided.")
        }
      },
      title: "Set Current Date",
      description: "Use any valid Date() string to set the current date for the schedule view. For example: 'Fri May 19 2023 14:00:00 GMT-0800 (Pacific Standard Time)'",
      args: [
        {
          name: "currentDate",
          type: ArgType.String,
        },
      ],
    })

    Reactotron.onCustomCommand({
      title: "Log Current Navigation State",
      description: "Logs the current navigation state",
      command: "logNavigationState",
      handler: () => {
        Reactotron.display({
          name: "NAV STATE",
          value: navigationRef.current?.getRootState(),
          preview: "preview",
        })
      },
    })

    Reactotron.onCustomCommand({
      title: "Log Current Async Storage Values",
      description: "Logs the current async storage values",
      command: "logAsyncStorage",
      handler: async () => {
        const keys = await AsyncStorage.getAllKeys()
        const values = await AsyncStorage.multiGet(keys)
        Reactotron.display({
          name: "ASYNC STORAGE",
          value: values,
          important: true,
        })
      },
    })

    Reactotron.onCustomCommand({
      title: "Reset Navigation State",
      description: "Resets the navigation state",
      command: "resetNavigation",
      handler: () => {
        Reactotron.log("resetting navigation state")
        resetRoot({ index: 0, routes: [] })
      },
    })

    Reactotron.onCustomCommand({
      command: "navigateTo",
      handler: (args) => {
        const { route } = args
        if (route) {
          console.log(`Navigating to: ${route}`)
          navigate(route)
        } else {
          console.log("Could not navigate. No route provided.")
        }
      },
      title: "Navigate To Screen",
      description: "Navigates to a screen by name.",
      args: [
        {
          name: "route",
          type: ArgType.String,
        },
      ],
    })

    Reactotron.onCustomCommand({
      title: "Go Back",
      description: "Goes back",
      command: "goBack",
      handler: () => {
        Reactotron.log("Going back")
        goBack()
      },
    })

    Reactotron.onCustomCommand({
      title: "Log Query Cache",
      description: "Logs the react query cache",
      command: "logQueryCache",
      handler: () => {
        queryClient
          .getQueryCache()
          .findAll()
          .forEach((query) => {
            Reactotron.display({
              name: query.queryKey,
              value: query.state,
              preview: "preview",
            })
          })
      },
    })

    // clear if we should
    if (config.clearOnLoad) {
      Reactotron.clear()
    }

    _reactotronIsSetUp = true
  }
}
