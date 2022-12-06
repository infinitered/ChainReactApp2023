import { useQuery } from "@tanstack/react-query"
import Webflow from "webflow-api"
import {
  CustomScheduleProps,
  CustomSpeakerProps,
  CustomSponsorProps,
  CustomWorkshopProps,
} from "./webflow-api.types"
import { cleanedSchedule, cleanedSpeakers, cleanedWorkshops } from "./webflow-helpers"

const webflowAPI = new Webflow({
  token: "63eb6ae43b109a57f2f18438a50a2a91887f53dc238c700b332b0379e74cf616",
})

const useWebflowAPI = <T>(key: string, collectionId: string, enabled = true) =>
  useQuery({
    queryKey: [key],
    queryFn: async () => {
      const data = await webflowAPI.items({ collectionId })
      return data as T[]
    },
    enabled,
  })

export const useSponsors = () => {
  return useWebflowAPI<CustomSponsorProps>("sponsors", "6362b046e69e80645c361104")
}

export const useSpeakers = () => {
  const { data, ...rest } = useWebflowAPI<CustomSpeakerProps>(
    "speakers",
    "6362b046e69e802c58361103",
  )
  return { data: cleanedSpeakers(data), ...rest }
}

export const useWorkshops = () => {
  const { data: speakersData, isLoading } = useSpeakers()
  const { data: workshopsData, ...rest } = useWebflowAPI<CustomWorkshopProps>(
    "workshops",
    "6362b046e69e800c2c361100",
    !isLoading && !!speakersData,
  )
  return { data: cleanedWorkshops(workshopsData, cleanedSpeakers(speakersData)), ...rest }
}

export const useSchedule = () => {
  const { data: speakersData, isLoading } = useSpeakers()
  const { data: schedulesData, ...rest } = useWebflowAPI<CustomScheduleProps>(
    "schedule",
    "6362b046e69e80096f361102",
    !isLoading && !!speakersData,
  )
  return { data: cleanedSchedule(schedulesData, cleanedSpeakers(speakersData)), ...rest }
}

// [NOTE] JUST FOR REFERENCE
// webflowAPI.site({ siteId: "5ca38f35db5d2ea94aea469d" }).then((site) => {
//   console.tron.log({ site })
// })
// webflowAPI.collections({ siteId: "5ca38f35db5d2ea94aea469d" }).then((collections) => {
//   console.tron.log({ collections })
// })
// webflowAPI.collection({ collectionId: "6362b046e69e8079f9361101" }).then((speakerNames) => {
//   console.tron.log({ speakerNames })
// })
