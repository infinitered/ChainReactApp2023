import { Linking } from "react-native"

/**
 * Helper for opening a give URL in an external browser.
 */
export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => {
    console.tron.log({ canOpen })
    if (canOpen) Linking.openURL(url)
  })
}
