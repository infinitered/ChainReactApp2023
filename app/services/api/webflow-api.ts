import { useQuery, UseQueryOptions } from "@tanstack/react-query"
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

export const prefetchScheduledEvents = async () => {
  const prefetchQueryOptions = [
    speakersOptions,
    workshopsOptions,
    recurringEventsOptions,
    talksOptions,
  ] as const

  prefetchQueryOptions.forEach(async (query) => {
    await queryClient.prefetchQuery(query)
  })
}

export const useScheduledEvents = () => {
  const { data: speakers } = useSpeakers()
  const { data: workshops } = useWorkshops()
  const { data: recurringEvents } = useRecurringEvents()
  const { data: talks } = useTalks()

  const { data: scheduledEvents, ...rest } = useQuery({
    ...scheduledEventsOptions,
    enabled: !!speakers && !!workshops && !!recurringEvents && !!talks,
  })

  return {
    data: cleanedSchedule({
      recurringEvents,
      scheduledEvents,
      speakers: cleanedSpeakers(speakers),
      talks: cleanedTalks({ speakers, talks }),
      workshops: cleanedWorkshops(workshops, cleanedSpeakers(speakers)),
    }),
    ...rest,
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
