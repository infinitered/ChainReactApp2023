/**
 *
 * @param key string—the key to group by
 * @returns an object with the grouped values, keyed by the value of the key
 *
 * @example
 * ```tsx
 * const grouped = groupBy('type')([
 *  { type: "Food/Drink", name: 'Starbucks Reserve' },
 *  { type: "Unique/to/Portland", name: 'Ground Kontrol Arcade' },
 *  { type: "Food/Drink", name: 'Hotel Restaurant - The Original Dinerant' },
 * ])
 * ```
 * output:
 * ```tsx
 * grouped = {
 *  "Food/Drink": [
 *    { type: "Food/Drink", name: 'Starbucks Reserve' },
 *    { type: "Food/Drink", name: 'Hotel Restaurant - The Original Dinerant' },
 *  ],
 *  "Unique/to/Portland": [
 *    { type: "Unique/to/Portland", name: 'Ground Kontrol Arcade' },
 *  ]
 * }
 * ```
 */
export const groupBy =
  (key: string) =>
  <T>(array: T[]) =>
    array.reduce<Record<string, T[]>>(
      (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key as keyof T] as string]: (objectsByKeyValue[obj[key as keyof T] as string] || []).concat(obj),
      }),
      {},
    )
