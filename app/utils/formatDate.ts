import { Locale, format, parseISO } from "date-fns"
import I18n from "i18n-js"

import ar from "date-fns/locale/ar-SA"
import ko from "date-fns/locale/ko"
import en from "date-fns/locale/en-US"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "ar" ? ar : locale === "ko" ? ko : en
}

export const parseDate = (date: string | Date) => (date instanceof Date ? date : parseISO(date))

const parsedDateToPSTDate = (date: string | Date): Date => {
  const inputDate = parseDate(date)
  const timeZone = "America/Los_Angeles"

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const parts = formatter.formatToParts(inputDate)
  const year = parseInt(parts.find((part) => part.type === "year")?.value || "", 10)
  const month = parseInt(parts.find((part) => part.type === "month")?.value || "", 10) - 1 // Months are 0-indexed in JavaScript
  const day = parseInt(parts.find((part) => part.type === "day")?.value || "", 10)
  const hour = parseInt(parts.find((part) => part.type === "hour")?.value || "", 10)
  const minute = parseInt(parts.find((part) => part.type === "minute")?.value || "", 10)
  const second = parseInt(parts.find((part) => part.type === "second")?.value || "", 10)

  return new Date(year, month, day, hour, minute, second)
}

export const formatDate = (date: string | Date, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parsedDateToPSTDate(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}

interface Event {
  "day-time": string
}
export const sortByDayTime = (a: Event, b: Event) => sortByTime(a["day-time"], b["day-time"])

export const sortByTime = (a: Date | string, b: Date | string) =>
  parseDate(a).getTime() - parseDate(b).getTime()
