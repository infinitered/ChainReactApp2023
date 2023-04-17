import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import type { ZodError } from "zod"
import { Schedule } from "../../screens"
import { axiosInstance } from "./axios"
import {
  CollectionId,
  CollectionKey,
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
import { fromZodError } from "zod-validation-error"
import type {
  RecommendationsCollection,
  RecurringEventsCollection,
  SpeakersCollection,
  SpeakerNamesCollection,
  SponsorsCollection,
  TalksCollection,
  VenuesCollection,
  WorkshopsCollection,
  ScheduledeventsCollection,
} from "./webflow-api.generated"
import { Webflow } from "./webflow-api.service"

const webflow = Webflow({ api: axiosInstance })

const useWebflowAPI = <T>(key: CollectionKey, collectionId: CollectionId, enabled = true) =>
  useQuery<T[], ZodError | AxiosError, T[], CollectionKey[]>({
    queryKey: [key],
    queryFn: async () => {
      const schema = COLLECTIONS_MAP[key].schema
      try {
        const payload = await webflow.collection.items.get({ collectionId, itemSchema: schema })
        return payload.items as T[]
      } catch (error) {
        const validationError = fromZodError(error)
        throw Error(
          `Whoops! Our API didn't come back in the expected shape. ${
            schema.description ?? "Unknown schema"
          } threw the following error: ${validationError.message}`,
        )
      }
    },
    enabled,
  })

export const useRecommendations = () => {
  return useWebflowAPI<RecommendationsCollection>(RECOMMENDATIONS.key, RECOMMENDATIONS.collectionId)
}

type Hook = () => { data: unknown[] | undefined | null | undefined[] }
type InferHookData<Fn extends Hook> = NonNullable<ReturnType<Fn>["data"]>[number]

export type Recommendation = InferHookData<typeof useRecommendations>

export const useRecurringEvents = () => {
  return useWebflowAPI<RecurringEventsCollection>(
    RECURRING_EVENTS.key,
    RECURRING_EVENTS.collectionId,
  )
}

export type RecurringEvent = InferHookData<typeof useRecurringEvents>

export const useSpeakers = () => {
  return useWebflowAPI<SpeakersCollection>(SPEAKERS.key, SPEAKERS.collectionId)
}

export type Speaker = InferHookData<typeof useSpeakers>

export const useSpeakerNames = () => {
  return useWebflowAPI<SpeakerNamesCollection>(SPEAKER_NAMES.key, SPEAKER_NAMES.collectionId)
}

export type SpeakerName = InferHookData<typeof useSpeakerNames>

export const useSponsors = () => {
  const { data: sponsors, isLoading } = useWebflowAPI<SponsorsCollection>(
    SPONSORS.key,
    SPONSORS.collectionId,
  )
  const data = cleanedSponsors(sponsors)

  return { isLoading, data }
}

export type Sponsor = InferHookData<typeof useSponsors>

export const useTalks = () => {
  return useWebflowAPI<TalksCollection>(TALKS.key, TALKS.collectionId)
}

export type Talk = InferHookData<typeof useTalks>

export const useVenues = () => {
  return useWebflowAPI<VenuesCollection>(VENUES.key, VENUES.collectionId)
}

export type Venue = InferHookData<typeof useVenues>

export const useWorkshops = () => {
  return useWebflowAPI<WorkshopsCollection>(WORKSHOPS.key, WORKSHOPS.collectionId)
}

export type Workshop = InferHookData<typeof useWorkshops>

export const useScheduledEvents = () => {
  const { data: speakers, isLoading } = useSpeakers()
  const { data: workshops } = useWorkshops()
  const { data: recurringEvents } = useRecurringEvents()
  const { data: talks } = useTalks()
  const { data: scheduledEvents, ...rest } = useWebflowAPI<ScheduledeventsCollection>(
    SCHEDULE.key,
    SCHEDULE.collectionId,
    !isLoading && !!speakers && !!workshops && !!recurringEvents && !!talks,
  )
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

export type ScheduledEvent = InferHookData<typeof useScheduledEvents>

export const useScheduleScreenData = () => {
  const { data: events, isLoading, refetch } = useScheduledEvents()

  return {
    isLoading,
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
    ] as Schedule[],
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
