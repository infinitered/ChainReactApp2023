import { Webflow } from "../app/services/api/webflow-api.service"
import {
  PastTalksCollectionSchema,
  RecommendationsCollectionSchema,
  RecurringEventsCollectionSchema,
  ScheduledeventsCollectionSchema,
  SpeakerNamesCollectionSchema,
  SpeakersCollectionSchema,
  SponsorsCollectionSchema,
  TalksCollectionSchema,
  VenuesCollectionSchema,
  WorkshopsCollectionSchema,
} from "../app/services/api/webflow-api.generated"
import {
  PAST_TALKS,
  RECOMMENDATIONS,
  RECURRING_EVENTS,
  SCHEDULE,
  SPEAKERS,
  SPEAKER_NAMES,
  SPONSORS,
  TALKS,
  VENUES,
  WORKSHOPS,
} from "../app/services/api/webflow-consts"
import { axiosInstance } from "../app/services/api/axios"

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!WEBFLOW_API_TOKEN) {
  console.error("WEBFLOW_API_TOKEN is required to be passed as an environment variable.")
  process.exit(0)
}

axiosInstance.defaults.baseURL = `https://api.webflow.com`
axiosInstance.defaults.headers.common.Authorization = `Bearer ${WEBFLOW_API_TOKEN}`
const webflow = Webflow({ api: axiosInstance })

;(async () => {
  // SPONSORS Collection and SponsorsCollectionSchema
  console.log("Testing SPONSORS collection")
  await webflow.collection.items.get({
    collectionId: SPONSORS.collectionId,
    itemSchema: SponsorsCollectionSchema,
  })

  // SPEAKERS Collection and SpeakersCollectionSchema
  console.log("Testing SPEAKERS collection")
  await webflow.collection.items.get({
    collectionId: SPEAKERS.collectionId,
    itemSchema: SpeakersCollectionSchema,
  })

  // SPEAKER_NAMES Collection and SpeakersNamesCollectionSchema
  console.log("Testing SPEAKER_NAMES collection")
  await webflow.collection.items.get({
    collectionId: SPEAKER_NAMES.collectionId,
    itemSchema: SpeakerNamesCollectionSchema,
  })

  // WORKSHOPS Collection and WorkshopsCollectionSchema
  console.log("Testing WORKSHOPS collection")
  await webflow.collection.items.get({
    collectionId: WORKSHOPS.collectionId,
    itemSchema: WorkshopsCollectionSchema,
  })

  // SCHEDULE Collection and ScheduleCollectionSchema
  console.log("Testing SCHEDULE collection")
  await webflow.collection.items.get({
    collectionId: SCHEDULE.collectionId,
    itemSchema: ScheduledeventsCollectionSchema,
  })

  // PAST_TALKS Collection and PastTalksCollectionSchema
  console.log("Testing PAST_TALKS collection")
  await webflow.collection.items.get({
    collectionId: PAST_TALKS.collectionId,
    itemSchema: PastTalksCollectionSchema,
  })

  // RECURRING_EVENTS Collection and RecurringEventsCollectionSchema
  console.log("Testing RECURRING_EVENTS collection")
  await webflow.collection.items.get({
    collectionId: RECURRING_EVENTS.collectionId,
    itemSchema: RecurringEventsCollectionSchema,
  })

  // TALKS Collection and TalksCollectionSchema
  console.log("Testing TALKS collection")
  await webflow.collection.items.get({
    collectionId: TALKS.collectionId,
    itemSchema: TalksCollectionSchema,
  })

  // VENUES Collection and VenuesCollectionSchema
  await webflow.collection.items.get({
    collectionId: VENUES.collectionId,
    itemSchema: VenuesCollectionSchema,
  })

  // RECOMMENDATIONS Collection and RecommendationsCollectionSchema
  console.log("Testing RECOMMENDATIONS collection")
  await webflow.collection.items.get({
    collectionId: RECOMMENDATIONS.collectionId,
    itemSchema: RecommendationsCollectionSchema,
  })
})()
