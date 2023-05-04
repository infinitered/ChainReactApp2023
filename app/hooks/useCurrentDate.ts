import { useEffect, useState } from "react"
import { loadString } from "../utils/storage"

const isValidDateString = (date: string) => {
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

/**
 * Check async storage the `currentDate` key on mount for a valid date value.
 * If it's not there, or it's not a valid date, then we'll set it to the current date.
 */
export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  useEffect(() => {
    async function checkCurrentDate() {
      const date = await loadString("currentDate")
      if (date && isValidDateString(date)) {
        setCurrentDate(new Date(date))
      }
    }
    checkCurrentDate()
  }, [])

  return currentDate
}
