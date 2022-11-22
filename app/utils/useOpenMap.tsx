import { useCallback } from "react"
import { Linking, Platform } from "react-native"

export const useOpenMap = () => {
  const openMap = useCallback(
    async (address: string, zipCode: string, city: string) => {
      const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`)
      const provider = Platform.OS === "ios" ? "apple" : "google"
      const link = `http://maps.${provider}.com/?daddr=${destination}`

      try {
        const supported = await Linking.canOpenURL(link)

        if (supported) Linking.openURL(link)
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  return openMap
}
