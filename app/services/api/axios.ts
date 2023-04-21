import axios from "axios"
import { WEBFLOW_API_URL } from "./webflow-consts"

interface PaginatedData {
  count: number
  limit: number
  offset: number
  total: number
}

export type PaginatedItems<T> = PaginatedData & {
  items: T[]
}

export const axiosInstance = axios.create({
  baseURL: WEBFLOW_API_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Webflow Javascript SDK / 1.0",
  },
})

if (typeof __DEV__ !== "undefined" && __DEV__ === true) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.tron.log({ error })
      return Promise.reject(error)
    },
  )

  axiosInstance.interceptors.request.use(
    (request) => request,
    (error) => {
      console.tron.log({ error })
      return Promise.reject(error)
    },
  )
}
