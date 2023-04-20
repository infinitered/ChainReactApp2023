interface SortableObject {
  [key: string]: any
}

/**
 *
 * @param arr—array of objects to sort
 * @param property—key of the object to sort by
 * @param order—array of keys to sort by
 * @returns sorted array
 *
 * @example
 * ```tsx
 * const sortedVenues = customSort(venues, "slug", [
 *   "the-armory",
 *   "after-party-expensify-office",
 *   "courtyard-portland-city-center",
 * ])
 * ```
 * output:
 * ```tsx
 * sortedVenues = [
 *  {}, // "the-armory"
 *  {}, // "after-party-expensify-office"
 *  {}, // "courtyard-portland-city-center"
 *  ... // other venues
 * ]
 */
export const customSort = <T extends SortableObject>(
  arr: T[],
  property: keyof T,
  order: T[keyof T][],
): T[] => {
  const orderMap: { [key: string]: number } = {}
  for (let i = 0; i < order.length; i++) {
    orderMap[order[i]] = i
  }
  return arr.sort((a, b) => {
    if (a[property] === undefined && b[property] === undefined) {
      return 0
    } else if (a[property] === undefined) {
      return 1
    } else if (b[property] === undefined) {
      return -1
    } else {
      const aOrder = orderMap[a[property]]
      const bOrder = orderMap[b[property]]
      return aOrder - bOrder
    }
  })
}
