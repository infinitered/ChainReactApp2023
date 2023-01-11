import { useQuery } from "@tanstack/react-query"
import { axiosInstance, PaginatedItems } from "./axios"
import {
  CustomScheduleProps,
  CustomSpeakerNamesProps,
  CustomSpeakerProps,
  CustomSponsorProps,
  CustomWorkshopProps,
} from "./webflow-api.types"
import { SCHEDULE, SPEAKERS, SPEAKER_NAMES, SPONSORS, WORKSHOPS } from "./webflow-conts"
import { cleanedSchedule, cleanedSpeakers, cleanedWorkshops } from "./webflow-helpers"

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
  return useWebflowAPI<CustomSponsorProps>(SPONSORS.key, SPONSORS.collectionId)
}

export const useSpeakers = () => {
  const { data, ...rest } = useWebflowAPI<CustomSpeakerProps>(SPEAKERS.key, SPEAKERS.collectionId)
  return { data: cleanedSpeakers(data), ...rest }
}

export const useSpeakerNames = () => {
  const { data, ...rest } = useWebflowAPI<CustomSpeakerNamesProps>(
    SPEAKER_NAMES.key,
    SPEAKER_NAMES.collectionId,
  )
  return { data, ...rest }
}

export const useWorkshops = () => {
  const { data: speakersData, isLoading } = useSpeakers()
  const { data: workshopsData, ...rest } = useWebflowAPI<CustomWorkshopProps>(
    WORKSHOPS.key,
    WORKSHOPS.collectionId,
    !isLoading && !!speakersData,
  )
  console.tron.log({ apiWorkshop: workshopsData })
  return { data: cleanedWorkshops(workshopsData, cleanedSpeakers(speakersData)), ...rest }
}

export const useSchedule = () => {
  const { data: speakersData, isLoading } = useSpeakers()
  const { data: workshopData } = useWorkshops()
  const { data: schedulesData, ...rest } = useWebflowAPI<CustomScheduleProps>(
    SCHEDULE.key,
    SCHEDULE.collectionId,
    !isLoading && !!speakersData,
  )
  console.tron.log({ api: schedulesData, workshopData })
  return {
    data: cleanedSchedule(schedulesData, cleanedSpeakers(speakersData), workshopData),
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
