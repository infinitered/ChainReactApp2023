import { Locale, format, parseISO } from "date-fns"
import I18n from "i18n-js"

import ar from "date-fns/locale/ar-SA"
import ko from "date-fns/locale/ko"
import en from "date-fns/locale/en-US"

import { DateString } from "../services/api/webflow-api.types"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "ar" ? ar : locale === "ko" ? ko : en
}

export const parseDate = (date: string | Date) => (date instanceof Date ? date : parseISO(date))

export const formatDate = (date: string | Date, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseDate(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}

interface Event {
  "day-time": DateString
}

export const sortByDayTime = <T extends Event>(a: T, b: T) =>
  sortByTime(a["day-time"], b["day-time"])

export const sortByTime = (a: DateString, b: DateString) =>
  parseDate(a).getTime() - parseDate(b).getTime()
