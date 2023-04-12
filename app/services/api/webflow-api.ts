import { useQuery } from "@tanstack/react-query"
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

const useWebflowAPI = <T>(key: string, collectionId: string, enabled = true) =>
  useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PaginatedItems<T>>(
        `/collections/${collectionId}/items`,
      )
      return data.items
    },
    enabled,
  })

export const useRecommendations = () => {
  return useWebflowAPI<RawRecommendations>(RECOMMENDATIONS.key, RECOMMENDATIONS.collectionId)
}

export const useRecurringEvents = () => {
  return useWebflowAPI<RawRecurringEvents>(RECURRING_EVENTS.key, RECURRING_EVENTS.collectionId)
}

export const useSpeakers = () => {
  return useWebflowAPI<RawSpeaker>(SPEAKERS.key, SPEAKERS.collectionId)
}

export const useSpeakerNames = () => {
  return useWebflowAPI<RawSpeakerName>(SPEAKER_NAMES.key, SPEAKER_NAMES.collectionId)
}

export const useSponsors = (): { data: RawSponsor[] } => {
  const { data: sponsors } = useWebflowAPI<RawSponsor>(SPONSORS.key, SPONSORS.collectionId)
  const data = cleanedSponsors(sponsors)

  return { data }
}
export const useTalks = () => {
  return useWebflowAPI<RawTalk>(TALKS.key, TALKS.collectionId)
}

export const useVenues = () => {
  return useWebflowAPI<RawVenue>(VENUES.key, VENUES.collectionId)
}

export const useWorkshops = () => {
  return useWebflowAPI<RawWorkshop>(WORKSHOPS.key, WORKSHOPS.collectionId)
}

export const useScheduledEvents = () => {
  const { data: speakers, isLoading } = useSpeakers()
  const { data: workshops } = useWorkshops()
  const { data: recurringEvents } = useRecurringEvents()
  const { data: talks } = useTalks()
  const { data: scheduledEvents, ...rest } = useWebflowAPI<RawScheduledEvent>(
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
