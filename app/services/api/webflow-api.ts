import { useQuery } from "@tanstack/react-query"
import { axiosInstance, PaginatedItems } from "./axios"
import type {
  RawRecurringEvents,
  RawScheduledEvent,
  RawSpeakerName,
  RawSpeaker,
  RawSponsor,
  RawTalk,
  RawWorkshop,
} from "./webflow-api.types"
import {
  RECURRING_EVENTS,
  SCHEDULE,
  SPEAKERS,
  SPEAKER_NAMES,
  SPONSORS,
  TALKS,
  WORKSHOPS,
} from "./webflow-consts"
import { cleanedSchedule, cleanedSpeakers, cleanedTalks, cleanedWorkshops } from "./webflow-helpers"

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

export const useSponsors = () => {
  return useWebflowAPI<RawSponsor>(SPONSORS.key, SPONSORS.collectionId)
}

export const useSpeakers = () => {
  return useWebflowAPI<RawSpeaker>(SPEAKERS.key, SPEAKERS.collectionId)
}

export const useSpeakerNames = () => {
  return useWebflowAPI<RawSpeakerName>(SPEAKER_NAMES.key, SPEAKER_NAMES.collectionId)
}

export const useWorkshops = () => {
  return useWebflowAPI<RawWorkshop>(WORKSHOPS.key, WORKSHOPS.collectionId)
}

export const useRecurringEvents = () => {
  return useWebflowAPI<RawRecurringEvents>(RECURRING_EVENTS.key, RECURRING_EVENTS.collectionId)
}

export const useTalks = () => {
  return useWebflowAPI<RawTalk>(TALKS.key, TALKS.collectionId)
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
