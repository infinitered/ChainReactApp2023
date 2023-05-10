import axios from "axios"
import { reportCrash } from "../../utils/crashReporting"

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
  baseURL: "https://chain-react-ai-chat.vercel.app/api/schedule/",
  // baseURL: "http://localhost:3000/api/schedule/",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Webflow Javascript SDK / 1.0",
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    reportCrash(error)
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.request.use(
  (request) => request,
  (error) => {
    reportCrash(error)
    return Promise.reject(error)
  },
)
