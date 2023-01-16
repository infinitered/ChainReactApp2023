import Constants from "expo-constants"
import axios from "axios"

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
  baseURL: "https://api.webflow.com/",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Webflow Javascript SDK / 1.0",
    Authorization: `Bearer ${Constants.expoConfig.extra.webflowToken}`,
  },
})

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
