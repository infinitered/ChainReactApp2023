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
    // mocking custom schedule data
    // if (response.config.url === `/collections/${SCHEDULE.collectionId}/items`) {
    //   const mockScheduleData: CustomScheduleProps[] = [
    //     // Thursday
    //     {
    //       "break-card-color": "hsla(244.28571428571433, 91.30%, 90.98%, 1.00)",
    //       "day-time": "2023-05-18",
    //       type: "976a2eee2ab173440affe93d0a20bf4d",
    //       day: "ed2cfa99e27dce5d1a425a419f170eb3",
    //       "break-party-description":
    //         "Check-in for attendees with a workshop ticket begins at 6:00 am.",
    //       name: "Check-in & Registration",
    //       slug: "registration-day-1",
    //       "speaker-2": "637823e1faa8742f7dd8686d",
    //       // random data
    //       _archived: false,
    //       _draft: false,
    //       "updated-on": "2020-02-22T00:58:34.300Z",
    //       "updated-by": "Person_5ca77d28397726353bf26f69",
    //       "created-on": "2020-02-22T00:58:34.300Z",
    //       "created-by": "Person_5ca77d28397726353bf26f69",
    //       "published-on": "2022-11-21T23:24:43.625Z",
    //       "published-by": "Person_57fc009927a6922a35903a0b",
    //       _cid: "6362b046e69e80096f361102",
    //       _id: "6362b046e69e805f34361176",
    //     },
    //     {
    //       "day-time": "2023-05-18",
    //       day: "ed2cfa99e27dce5d1a425a419f170eb3",
    //       name: "Leveling up on the new architecture",
    //       slug: "morning-break",
    //       "break-party-description": "Gant Laborde",
    //       "break-card-color": "hsla(244.28571428571433, 91.30%, 90.98%, 1.00)",
    //       type: "976a2eee2ab173440affe93d0a20bf4d",
    //       "speaker-2": "637823e1faa8742f7dd8686d",
    //       // random data
    //       _archived: false,
    //       _draft: false,
    //       "updated-on": "2020-02-22T00:58:42.476Z",
    //       "updated-by": "Person_5ca77d28397726353bf26f69",
    //       "created-on": "2020-01-17T23:01:40.706Z",
    //       "created-by": "Person_5ca77d28397726353bf26f69",
    //       "published-on": "2022-11-21T23:24:43.625Z",
    //       "published-by": "Person_57fc009927a6922a35903a0b",
    //       _cid: "6362b046e69e80096f361102",
    //       _id: "6362b046e69e80541f361139",
    //     },
    //     {
    //       "day-time": "2023-05-18",
    //       day: "ed2cfa99e27dce5d1a425a419f170eb3",
    //       name: "React Native case study: from an idea to market",
    //       slug: "morning-break",
    //       "break-party-description": "Ferran Negre Pizarro",
    //       "break-card-color": "hsla(244.28571428571433, 91.30%, 90.98%, 1.00)",
    //       type: "976a2eee2ab173440affe93d0a20bf4d",
    //       "speaker-2": "637823e1faa8742f7dd8686d",
    //       // random data
    //       _archived: false,
    //       _draft: false,
    //       "updated-on": "2020-02-22T00:58:42.476Z",
    //       "updated-by": "Person_5ca77d28397726353bf26f69",
    //       "created-on": "2020-01-17T23:01:40.706Z",
    //       "created-by": "Person_5ca77d28397726353bf26f69",
    //       "published-on": "2022-11-21T23:24:43.625Z",
    //       "published-by": "Person_57fc009927a6922a35903a0b",
    //       _cid: "6362b046e69e80096f361102",
    //       _id: "6362b046e69e80541f361139",
    //     },
    //     {
    //       "day-time": "2023-05-18",
    //       day: "ed2cfa99e27dce5d1a425a419f170eb3",
    //       name: "Sponsor AfterParty",
    //       slug: "sponsor-after-party",
    //       "break-party-description":
    //         "Join us after day 1 talks in the lobby for food and drinks provided by This Sponsor’s Name as an example here.",
    //       "break-card-color": "hsla(244.28571428571433, 91.30%, 90.98%, 1.00)",
    //       type: "b2f17244cf6bd0782c2a099568169219",
    //       // "speaker-2": "637823e1faa8742f7dd8686d",
    //       // random data
    //       _archived: false,
    //       _draft: false,
    //       "updated-on": "2020-02-22T00:58:42.476Z",
    //       "updated-by": "Person_5ca77d28397726353bf26f69",
    //       "created-on": "2020-01-17T23:01:40.706Z",
    //       "created-by": "Person_5ca77d28397726353bf26f69",
    //       "published-on": "2022-11-21T23:24:43.625Z",
    //       "published-by": "Person_57fc009927a6922a35903a0b",
    //       _cid: "6362b046e69e80096f361102",
    //       _id: "6362b046e69asdf1324asdf",
    //     },
    //     // Friday
    //     {
    //       "break-card-color": "hsla(244.28571428571433, 91.30%, 90.98%, 1.00)",
    //       "day-time": "2023-05-19",
    //       type: "976a2eee2ab173440affe93d0a20bf4d",
    //       day: "ed2cfa99e27dce5d1a425a419f170eb5",
    //       "break-party-description":
    //         "Check-in for attendees with a workshop ticket begins at 6:00 am.",
    //       name: "Check-in & Registration",
    //       slug: "morning-break-day-2",
    //       "speaker-2": "637c0437faeaa766e0b15eac",
    //       // random data
    //       _archived: false,
    //       _draft: false,
    //       "updated-on": "2020-02-26T18:54:55.439Z",
    //       "updated-by": "Person_5ca77d28397726353bf26f69",
    //       "created-on": "2020-02-22T01:00:03.417Z",
    //       "created-by": "Person_5ca77d28397726353bf26f69",
    //       "published-on": "2022-11-21T23:24:43.625Z",
    //       "published-by": "Person_57fc009927a6922a35903a0b",
    //       _cid: "6362b046e69e80096f361102",
    //       _id: "6362b046e69e808763361159",
    //     },
    //     {
    //       "break-card-color": "hsla(244.28571428571433, 91.30%, 90.98%, 1.00)",
    //       "day-time": "2023-05-19",
    //       type: "976a2eee2ab173440affe93d0a20bf4d",
    //       day: "ed2cfa99e27dce5d1a425a419f170eb5",
    //       name: "Leveling up on the new architecture",
    //       "break-party-description": "Gant Laborde",
    //       slug: "registration-day-2",
    //       "speaker-2": "637c0437faeaa766e0b15eac",
    //       // random data
    //       _archived: false,
    //       _draft: false,
    //       "updated-on": "2020-02-22T00:59:20.432Z",
    //       "updated-by": "Person_5ca77d28397726353bf26f69",
    //       "created-on": "2020-02-22T00:59:20.432Z",
    //       "created-by": "Person_5ca77d28397726353bf26f69",
    //       "published-on": "2022-11-21T23:24:43.625Z",
    //       "published-by": "Person_57fc009927a6922a35903a0b",
    //       _cid: "6362b046e69e80096f361102",
    //       _id: "6362b046e69e80dde2361178",
    //     },
    //     {
    //       "break-card-color": "hsla(244.28571428571433, 91.30%, 90.98%, 1.00)",
    //       "day-time": "2023-05-19",
    //       type: "976a2eee2ab173440affe93d0a20bf4d",
    //       day: "ed2cfa99e27dce5d1a425a419f170eb5",
    //       name: "React Native case study: from an idea to market",
    //       "break-party-description": "Ferran Negre Pizarro",
    //       slug: "registration-day-2",
    //       "speaker-2": "637c0437faeaa766e0b15eac",
    //       // random data
    //       _archived: false,
    //       _draft: false,
    //       "updated-on": "2020-02-22T00:59:20.432Z",
    //       "updated-by": "Person_5ca77d28397726353bf26f69",
    //       "created-on": "2020-02-22T00:59:20.432Z",
    //       "created-by": "Person_5ca77d28397726353bf26f69",
    //       "published-on": "2022-11-21T23:24:43.625Z",
    //       "published-by": "Person_57fc009927a6922a35903a0b",
    //       _cid: "6362b046e69e80096f361102",
    //       _id: "6362b046e69e80dde2361178",
    //     },
    //   ]
    //   response.data.items = mockScheduleData
    // }
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
