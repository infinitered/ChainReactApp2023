/**
 *
 * @param value: the value to check within a filter function
 * @returns: true if the value is not null or undefined
 *
 * This is a type guard function. It is used to narrow the type of a value within a filter function.
 *
 * @example
 * ```tsx
 * const numbers = [1, 2, 3, null, 4, undefined, 5]
 *
 * const filteredNumbers = numbers.filter(notEmpty) // type of filteredNumbers is number[]
 *
 * console.log(filteredNumbers) // [1, 2, 3, 4, 5]
 * ```
 *
 * @example
 * without notEmpty, we have the wrong type:
 * ```tsx
 * const numbers = [1, 2, 3, null, 4, undefined, 5]
 *
 * const filteredNumbers = numbers.filter(Boolean) // type of filteredNumbers is (number | null | undefined)[]
 *
 * console.log(filteredNumbers) // [1, 2, 3, 4, 5]
 * ```
 */
export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue =>
  value !== null && value !== undefined
