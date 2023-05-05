import { Linking } from "react-native"

/**
 * Helper to get the social username from a given URL. Mainly Twitter and GitHub.
 *
 * @param url The URL to extract the username from.
 * @returns The username: string
 *
 * @example
 * ```tsx
 * getSocialUsername("https://twitter.com/mazenchami") // mazenchami
 * ```
 */
const getSocialUsername = (url: string) => {
  const n = url.lastIndexOf("/")
  return url.substring(n + 1)
}

/**
 * Helper to clean a given URL to be used to open the app as a fallback if the app is installed (Android bug).
 *
 * @param url The URL to clean.
 * @returns The cleaned URL: string
 *
 * @example
 * ```tsx
 * cleanUrl("https://twitter.com/mazenchami") // twitter://user?screen_name=mazenchami
 * ```
 */
const cleanUrl = (url: string) => {
  if (url.includes("twitter.com")) {
    return `twitter://user?screen_name=${getSocialUsername(url)}`
  }
  if (url.includes("github.com")) {
    return `github://user/${getSocialUsername(url)}`
  }
  return url
}

/**
 * Helper for opening a give URL in an external browser.
 */
export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) =>
    canOpen ? Linking.openURL(url) : Linking.openURL(cleanUrl(url)),
  )
}
