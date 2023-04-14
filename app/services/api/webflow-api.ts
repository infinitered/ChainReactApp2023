import { useQueries, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { z } from "zod"
import { fromZodError } from "zod-validation-error"
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
  CollectionConst,
  CollectionId,
  COLLECTIONS_MAP,
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

const getCollectionById = async <T>(collectionId: CollectionId) => {
  const { data } = await axiosInstance.get<PaginatedItems<T>>(`/collections/${collectionId}/items`)
  const schema = z.array(COLLECTIONS_MAP[collectionId].schema)
  try {
    return schema.parse(data.items) as T[]
  } catch (error) {
    const validationError = fromZodError(error)
    throw Error(
      `Whoops! Our API didn't come back in the expected shape. ${
        schema.description ?? "Unknown schema"
      } threw the following error: ${validationError.message}`,
    )
  }
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

const recurringEventsOptions = webflowOptions<RawRecurringEvents>(RECURRING_EVENTS)
export const useRecurringEvents = () => useQuery(recurringEventsOptions)

const speakersOptions = webflowOptions<RawSpeaker>(SPEAKERS)
export const useSpeakers = () => useQuery(speakersOptions)

const speakerNamesOptions = webflowOptions<RawSpeakerName>(SPEAKER_NAMES)
export const useSpeakerNames = () => useQuery(speakerNamesOptions)

const sponsorsOptions = webflowOptions<RawSponsor>(SPONSORS)
export const useSponsors = () => {
  const { data: sponsors, ...rest } = useQuery(sponsorsOptions)
  const data = cleanedSponsors(sponsors)

  return { data, ...rest }
}

const talksOptions = webflowOptions<RawTalk>(TALKS)
export const useTalks = () => useQuery(talksOptions)

const venuesOptions = webflowOptions<RawVenue>(VENUES)
export const useVenues = () => useQuery(venuesOptions)

const workshopsOptions = webflowOptions<RawWorkshop>(WORKSHOPS)
export const useWorkshops = () => useQuery(workshopsOptions)

const scheduledEventsOptions = webflowOptions<RawScheduledEvent>(SCHEDULE)
const scheduledEventsQueries = [
  speakersOptions,
  workshopsOptions,
  recurringEventsOptions,
  talksOptions,
  scheduledEventsOptions,
] as const
export const prefetchScheduledEvents = async () => {
  await Promise.all(
    scheduledEventsQueries.map(async (query) => {
      return queryClient.prefetchQuery(query)
    }),
  )
}
export const useScheduledEvents = () => {
  const queries = useQueries({
    queries: scheduledEventsQueries,
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
