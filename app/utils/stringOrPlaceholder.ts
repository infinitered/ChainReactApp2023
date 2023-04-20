import { translate, TxKeyPath } from "../i18n"

/**
 * Returns a string if it is not empty, otherwise returns a placeholder
 *
 * @param string—string—The string to check
 * @param placeholder-TxKeyPath-The placeholder to return if the string is empty. Uses our i18n key path format.
 * @returns string
 *
 * @example
 * stringOrPlaceholder("Hello World") // "Hello World"
 * stringOrPlaceholder("") // "Coming soon"
 * stringOrPlaceholder(undefined, "common.ok") // "OK!"
 * stringOrPlaceholder("Hello World", "common.ok") // "Hello World"
 * stringOrPlaceholder("", "common.ok") // "OK!"
 */
export const stringOrPlaceholder = (
  string?: string,
  placeholder: TxKeyPath = "common.comingSoon",
) => (string && string.length > 1 ? string : translate(placeholder))
