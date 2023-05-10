import { useQueries, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { Schedule } from "../../screens"
import { axiosInstance, PaginatedItems } from "./axios"
import type {
  RawRecommendations,
  RawRecurringEvents,
  RawScheduledEvent,
  RawSpeaker,
  RawSponsor,
  RawTalk,
  RawVenue,
  RawWorkshop,
} from "./webflow-api.types"
import {
  CollectionConst,
  RECOMMENDATIONS,
  RECURRING_EVENTS,
  SCHEDULE,
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

const webflowOptions = <Payload, Collection extends CollectionConst = CollectionConst>(
  collection: Collection,
) =>
  ({
    queryKey: [collection.key, collection.collectionId] as const,
    queryFn: async () => getCollectionById<Payload>(collection.collectionId),
  } satisfies UseQueryOptions)

const recommendationsOptions = webflowOptions<RawRecommendations>(RECOMMENDATIONS)
export const useRecommendations = () => useQuery(recommendationsOptions)

const sponsorsOptions = webflowOptions<RawSponsor>(SPONSORS)
export const useSponsors = () => {
  const { data: sponsors, ...rest } = useQuery(sponsorsOptions)
  const data = cleanedSponsors(sponsors)

  return { data, ...rest }
}

const venuesOptions = webflowOptions<RawVenue>(VENUES)
export const useVenues = () => useQuery(venuesOptions)

const speakersOptions = webflowOptions<RawSpeaker>(SPEAKERS)
const workshopsOptions = webflowOptions<RawWorkshop>(WORKSHOPS)
const recurringEventsOptions = webflowOptions<RawRecurringEvents>(RECURRING_EVENTS)
const talksOptions = webflowOptions<RawTalk>(TALKS)
const scheduledEventsOptions = webflowOptions<RawScheduledEvent>(SCHEDULE)

const scheduledEventQueries = [
  speakersOptions,
  workshopsOptions,
  recurringEventsOptions,
  talksOptions,
  scheduledEventsOptions,
] as const

export const prefetchScheduledEvents = async () => {
  scheduledEventQueries.forEach(async (query) => {
    await queryClient.prefetchQuery(query as UseQueryOptions)
  })
}

export const useScheduledEventsData = () => {
  const queries = useQueries({
    queries: scheduledEventQueries,
  })

  const isLoading = queries.map((query) => query.isLoading).some((isLoading) => isLoading)
  const isRefetching = queries
    .map((query) => query.isRefetching)
    .some((isRefetching) => isRefetching)
  const refetch = async () => Promise.all(queries.map((query) => query.refetch()))

  const [
    { data: speakers },
    { data: workshops },
    { data: recurringEvents },
    { data: talks },
    { data: scheduledEvents },
  ] = queries

  return {
    data: isLoading
      ? []
      : cleanedSchedule({
          recurringEvents,
          scheduledEvents,
          speakers: cleanedSpeakers(speakers),
          talks: cleanedTalks({ speakers, talks }),
          workshops: cleanedWorkshops(workshops, cleanedSpeakers(speakers)),
        }),
    isLoading,
    isRefetching,
    refetch,
  }
}

export const useScheduleScreenData = () => {
  const { data: events, isLoading, isRefetching, refetch } = useScheduledEventsData()

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
