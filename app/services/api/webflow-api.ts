import { useQueries, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { Schedule } from "../../screens"
import { axiosInstance, PaginatedItems } from "./axios"
import type {
  RawRecommendations,
  RawRecurringEvents,
  RawScheduledEvent,
  RawSpeaker,
  RawSpeakerName,
  RawSponsor,
  RawTalk,
  RawVenue,
  RawWorkshop,
} from "./webflow-api.types"
import {
  RECOMMENDATIONS,
  RECURRING_EVENTS,
  SCHEDULE,
  SPEAKER_NAMES,
  SPEAKERS,
  SPONSORS,
  TALKS,
  VENUES,
  WORKSHOPS,
} from "./webflow-consts"
import {
  cleanedSchedule,
  cleanedSpeakers,
  cleanedSponsors,
  cleanedTalks,
  cleanedWorkshops,
  convertScheduleToScheduleCard,
} from "./webflow-helpers"
import { queryClient } from "./react-query"

const getCollectionById = async <T>(collectionId: string) => {
  const { data } = await axiosInstance.get<PaginatedItems<T>>(`/collections/${collectionId}/items`)
  return data.items
}

const useRecommendationsOptions = {
  queryKey: [RECOMMENDATIONS.key, RECOMMENDATIONS.collectionId],
  queryFn: async () => getCollectionById<RawRecommendations>(RECOMMENDATIONS.collectionId),
} satisfies UseQueryOptions

export const useRecommendations = () => {
  return useQuery(useRecommendationsOptions)
}

const useRecurringEventsOptions = {
  queryKey: [RECURRING_EVENTS.key, RECURRING_EVENTS.collectionId],
  queryFn: async () => getCollectionById<RawRecurringEvents>(RECURRING_EVENTS.collectionId),
} satisfies UseQueryOptions

export const useRecurringEvents = () => {
  return useQuery(useRecurringEventsOptions)
}

const useSpeakersOptions = {
  queryKey: [SPEAKERS.key, SPEAKERS.collectionId],
  queryFn: async () => getCollectionById<RawSpeaker>(SPEAKERS.collectionId),
} satisfies UseQueryOptions

export const useSpeakers = () => {
  return useQuery(useSpeakersOptions)
}

const useSpeakerNamesOptions = {
  queryKey: [SPEAKER_NAMES.key, SPEAKER_NAMES.collectionId],
  queryFn: async () => getCollectionById<RawSpeakerName>(SPEAKER_NAMES.collectionId),
} satisfies UseQueryOptions

export const useSpeakerNames = () => {
  return useQuery(useSpeakerNamesOptions)
}

const useSponsorsOptions = {
  queryKey: [SPONSORS.key, SPONSORS.collectionId],
  queryFn: async () => getCollectionById<RawSponsor>(SPONSORS.collectionId),
} satisfies UseQueryOptions

export const useSponsors = () => {
  const { data: sponsors, isLoading } = useQuery(useSponsorsOptions)
  const data = cleanedSponsors(sponsors)

  return { isLoading, data }
}

const useTalksOptions = {
  queryKey: [TALKS.key, TALKS.collectionId],
  queryFn: async () => getCollectionById<RawTalk>(TALKS.collectionId),
} satisfies UseQueryOptions

export const useTalks = () => {
  return useQuery(useTalksOptions)
}

const useVenuesOptions = {
  queryKey: [VENUES.key, VENUES.collectionId],
  queryFn: async () => getCollectionById<RawVenue>(VENUES.collectionId),
} satisfies UseQueryOptions

export const useVenues = () => {
  return useQuery(useVenuesOptions)
}

const useWorkshopsOptions = {
  queryKey: [WORKSHOPS.key, WORKSHOPS.collectionId],
  queryFn: async () => getCollectionById<RawWorkshop>(WORKSHOPS.collectionId),
} satisfies UseQueryOptions

export const useWorkshops = () => {
  return useQuery(useWorkshopsOptions)
}

const useScheduledEventsOptions = {
  queryKey: [SCHEDULE.key, SCHEDULE.collectionId],
  queryFn: async () => getCollectionById<RawScheduledEvent>(SCHEDULE.collectionId),
} satisfies UseQueryOptions

const useScheduledEventsQueries = [
  useSpeakersOptions,
  useWorkshopsOptions,
  useRecurringEventsOptions,
  useTalksOptions,
  useScheduledEventsOptions,
] as const

export const prefetchScheduledEvents = async () => {
  await Promise.all(
    useScheduledEventsQueries.map(async (query) => {
      return queryClient.prefetchQuery(query)
    }),
  )
}

export const useScheduledEvents = () => {
  const queries = useQueries({
    queries: useScheduledEventsQueries,
  })

  const [speakers, workshops, recurringEvents, talks, scheduledEvents] = queries

  return {
    data: cleanedSchedule({
      recurringEvents: recurringEvents.data,
      scheduledEvents: scheduledEvents.data,
      speakers: cleanedSpeakers(speakers.data),
      talks: cleanedTalks({ speakers: speakers.data, talks: talks.data }),
      workshops: cleanedWorkshops(workshops.data, cleanedSpeakers(speakers.data)),
    }),
    refetch: async () => Promise.all(queries.map((query) => query.refetch())),
    isLoading: queries.map((query) => query.isLoading).some((isLoading) => isLoading),
    isRefetching: queries.map((query) => query.isFetching).some((isFetching) => isFetching),
  }
}

export const useScheduleScreenData = () => {
  const { data: events, isLoading, isRefetching, refetch } = useScheduledEvents()

  return {
    isLoading,
    isRefetching,
    schedules: [
      {
        date: "2023-05-17",
        title: "React Native Workshops",
        events: convertScheduleToScheduleCard(events, "Wednesday"),
      },
      {
        date: "2023-05-18",
        title: "Conference Day 1",
        events: convertScheduleToScheduleCard(events, "Thursday"),
      },
      {
        date: "2023-05-19",
        title: "Conference Day 2",
        events: convertScheduleToScheduleCard(events, "Friday"),
      },
    ] satisfies Schedule[],
    refetch,
  }
}

// [NOTE] JUST FOR REFERENCE
// webflowAPI.site({ siteId: SITE_ID }).then((site) => {
//   console.tron.log({ site })
// })
// webflowAPI.collections({ siteId: SITE_ID }).then((collections) => {
//   console.tron.log({ collections })
// })
// webflowAPI.collection({ collectionId: SPEAKER_NAMES.collectionId }).then((speakerNames) => {
//   console.tron.log({ speakerNames })
// })
// webflowAPI.collection({ collectionId: PAST_TALKS.collectionId }).then((pastTalks) => {
//   console.tron.log({ pastTalks })
// })
