import { Linking, Platform } from "react-native"

export const openMap = async (address: string) => {
  const destination = encodeURIComponent(address)
  const provider = Platform.OS === "ios" ? "apple" : "google"
  const link = `http://maps.${provider}.com/?daddr=${destination}`

  try {
    const supported = await Linking.canOpenURL(link)

    if (supported) Linking.openURL(link)
  } catch (error) {
    console.error(error)
  }
}
