import { Linking, Platform } from "react-native"

export const openMap = async (address: string) => {
  const destination = encodeURIComponent(address)
  const provider = Platform.OS === "ios" ? "apple" : "google"
  const link = `http://maps.${provider}.com/?daddr=${destination}`

  try {
    // TODO come back here for canOpenURL and properly implement AndroidManifest.xml
    // https://github.com/facebook/react-native/pull/31263
    // https://developer.android.com/training/package-visibility
    // https://github.com/facebook/react-native/issues/32311
    Linking.openURL(link)
  } catch (error) {
    console.error(error)
  }
}
