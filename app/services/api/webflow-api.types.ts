import z from "zod"

export const CollectionId = z.string()

export const DateStringSchema = z.string().refine((s) => {
  const date = new Date(s)
  return !isNaN(date.getTime())
}, "DateString")

export const NumberString = z.string().refine((s) => {
  const num = Number(s)
  return !isNaN(num)
}, "NumberString")

export const ImageRefSchema = z.object({
  alt: z.string().nullable(),
  fileId: z.string(),
  url: z.string(),
})

export type ImageRef = z.infer<typeof ImageRefSchema>

export const SpeakerPhotoPNGSchema = z.object({
  alt: z.string().nullable(),
  fileId: z.string(),
  url: z.string(),
})

export type SpeakerPhotoPNG = z.infer<typeof SpeakerPhotoPNGSchema>

export const ItemSchema = z.object({
  _archived: z.boolean(),
  _cid: z.string(),
  _draft: z.boolean(),
  _id: z.string(),
  "created-by": z.string(),
  "created-on": DateStringSchema,
  "published-by": z.string().optional().nullable(),
  "published-on": DateStringSchema.optional().nullable(),
  "updated-by": z.string(),
  "updated-on": DateStringSchema,
  name: z.string(),
  slug: z.string(),
})

export type Item = z.infer<typeof ItemSchema>

export const RawRecurringEventsSchema = ItemSchema.extend({
  "event-description": z.string().optional(),
}).describe("RawRecurringEvents")

export type RawRecurringEvents = z.infer<typeof RawRecurringEventsSchema>

export const ReoccurringEventSchema = RawRecurringEventsSchema

export type RecurringEvents = z.infer<typeof ReoccurringEventSchema>

const TalkLevelSchema = z.union([
  z.literal("Beginner"),
  z.literal("Intermediate"),
  z.literal("Advanced"),
])

const SpeakerTypeSchema = z.union([
  z.literal("Speaker"),
  z.literal("Panelist"),
  z.literal("Workshop"),
  z.literal("Emcee"),
])

/** 
 * @example  {
      "_archived": false,
      "_cid": "640a728fc24f8e94385fe188",
      "_draft": false,
      "_id": "64386ab07e8da6d99724202c"
      "company": "AWS Amplify",
      "created-by": "Person_5ca77d28397726353bf26f69",
      "created-on": "2023-04-13T20:48:48.801Z",
      "is-a-current-speaker": false,
      "name": "Ashish Nanda",
      "published-by": "Person_5ca77d28397726353bf26f69",
      "published-on": "2023-04-13T22:45:19.333Z",
      "slug": "ashish-nanda-2",
      "speaker-bio": "Ashish Nanda is a Senior Software Engineer and Tech Lead at AWS Amplify. He leads design and engineering on the JavaScript and Flutter open source SDK teams with the goal of helping developers build full-stack web and mobile applications quickly & seamlessly using cloud services.",
      "speaker-first-name": "Ashish",
      "speaker-photo": {
        "alt": null,
        "fileId": "64386a542ff0975d11654413",
        "url": "https://uploads-ssl.webflow.com/5ca51dc2a4d83f4711f94715/64386a542ff0975d11654413_AshishNanda_SpeakerPhoto%20(1).jpg",
      },
      "speaker-type": "97dae28f90a767132ee88e80a8537af8",
      "title": "Senior Software Engineer and Tech Lead",
      "updated-by": "Person_5ca77d28397726353bf26f69",
      "updated-on": "2023-04-13T20:48:48.801Z"
    },
 */
export const RawSpeakerSchema = ItemSchema.extend({
  company: z.string().optional(),
  github: z.string().optional(),
  "is-a-current-speaker": z.boolean(),
  "is-a-workshop": z.boolean().optional(),
  "second-company": z.string().optional(),
  "second-title": z.string().optional(),
  "speaker-bio": z.string().optional(),
  "speaker-first-name": z.string().optional(),
  "speaker-photo": SpeakerPhotoPNGSchema.optional(),
  "speaker-type": CollectionId,
  "talk-details-url": z.string().optional(),
  "talk-title": z.string().optional(),
  title: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
}).describe("RawSpeaker")

export type RawSpeaker = z.infer<typeof RawSpeakerSchema>

export const SpeakerSchema = RawSpeakerSchema.extend({
  "speaker-type": SpeakerTypeSchema.optional(),
})

export type Speaker = z.infer<typeof SpeakerSchema>

export const RawSpeakerNameSchema = ItemSchema.extend({
  "close-anchor": z.string().optional(),
  "github-url": z.string(),
  "medium-url-2": z.string().optional(),
  "next-url": z.string(),
  "previous-url": z.string(),
  "session-type": z.string().optional(),
  "speaker-photo-png": ImageRefSchema,
  "talk-abstract-3": z.string(),
  "talk-title": z.string(),
  "twitter-url": z.string(),
  bio: z.string(),
  title: z.string(),
}).describe("RawSpeakerName")

export type RawSpeakerName = z.infer<typeof RawSpeakerNameSchema>

export const RawTalkSchema = ItemSchema.extend({
  "speaker-s": z.array(z.string()).optional(),
  "talk-type": z.string().optional(),
  description: z.string().optional(),
  year: z.string().optional(),
  "talk-url": z.string().optional(),
}).describe("RawTalk")

export type RawTalk = z.infer<typeof RawTalkSchema>

export const TalkSchema = ItemSchema.extend({
  "speaker-s": z.array(SpeakerSchema),
  "talk-type": SpeakerTypeSchema,
  description: z.string().optional(),
  "talk-url": z.string().optional(),
})

export type Talk = z.infer<typeof TalkSchema>

const SharedWorkshopSchema = ItemSchema.extend({
  "card-list-item-1": z.string(),
  "card-list-item-2": z.string(),
  "card-list-item-3": z.string(),
  "description-quote": z.string().optional(),
  "has-more-than-one-instructor": z.boolean().optional(),
  "instructors-are-from-the-same-company": z.boolean().optional(),
  "is-sold-out": z.boolean().optional(),
  "show-ticket-count": z.boolean().optional(),
  "ticket-count": NumberString.optional(),
  abstract: z.string(),
  prerequisites: z.string().optional(),
  summary: z.string().optional(),
  talk: z.string().optional(),
})

export const RawWorkshopSchema = SharedWorkshopSchema.extend({
  "instructor-info": CollectionId,
  "instructor-s-2": z.array(CollectionId),
  "second-instructor-3": CollectionId.optional(),
  assistants: z.array(CollectionId).optional(),
  level: CollectionId,
}).describe("RawWorkshop")

export type RawWorkshop = z.infer<typeof RawWorkshopSchema>

export const WorkshopSchema = SharedWorkshopSchema.extend({
  "instructor-info": SpeakerSchema,
  "instructor-s-2": z.array(SpeakerSchema),
  "second-instructor-3": SpeakerSchema.optional(),
  assistants: z.array(SpeakerSchema).optional(),
  level: TalkLevelSchema,
})

export type Workshop = z.infer<typeof WorkshopSchema>

export const DaySchema = z.union([
  z.literal("Wednesday"),
  z.literal("Thursday"),
  z.literal("Friday"),
])

export type Day = z.infer<typeof DaySchema>

export const EventTypeSchema = z.union([
  z.literal("Talk"),
  z.literal("Lightning Talk"),
  z.literal("Speaker Panel"),
  z.literal("Workshop"),
  z.literal("Party"),
  z.literal("Recurring"),
  z.literal("Sponsored"),
  z.literal("Trivia Show"),
])

const LocationSchema = z.string()

const BaseScheduledEventSchema = ItemSchema.extend({
  "break-card-color": z.string().optional().nullable(),
  "break-party-description": z.string().optional().nullable(),
  "day-time": z.string(),
  "end-time": z.string().optional().nullable(),
  "is-a-talk": z.boolean().optional().nullable(),
})

export const RawScheduledEventSchema = BaseScheduledEventSchema.extend({
  "event-type": CollectionId.optional(),
  "recurring-event": CollectionId.optional(),
  "speaker-2": CollectionId.optional(),
  "speaker-2-2": CollectionId.optional(),
  "speaker-3": CollectionId.optional(),
  day: CollectionId,
  location: CollectionId.optional(),
  workshop: CollectionId.optional(),
}).describe("RawScheduledEvent")

export type RawScheduledEvent = z.infer<typeof RawScheduledEventSchema>

export const ScheduledEventSchema = ItemSchema.extend({
  "event-type": CollectionId.optional(),
  "recurring-event": RawRecurringEventsSchema,
  "speaker-2": SpeakerSchema.optional(),
  "speaker-2-2": SpeakerSchema.optional(),
  "speaker-3": SpeakerSchema.optional(),
  day: DaySchema,
  type: EventTypeSchema,
  location: LocationSchema.optional(),
  workshop: WorkshopSchema.optional(),
  talk: TalkSchema.optional(),
})

export type ScheduledEvent = z.infer<typeof ScheduledEventSchema>

export const RawVenueSchema = ItemSchema.extend({
  "city-state-zip": z.string(),
  "dircetions-url": z.string().optional(),
  "street-address": z.string(),
  "venue-image-s": z.array(ImageRefSchema),
  tag: z.string(),
}).describe("RawVenue")

export type RawVenue = z.infer<typeof RawVenueSchema>

export type Venue = RawVenue

export const RawSponsorSchema = ItemSchema.extend({
  "conference-years-2": z.string(),
  "external-url": z.string(),
  "feature-as-a-past-sponsor": z.boolean().optional(),
  "is-a-current-sponsor": z.boolean().optional(),
  "promo-summary": z.string().optional(),
  "sponsor-tier": z.string(),
  "sponsorship-type": z.string().optional(),
  logo: ImageRefSchema,
}).describe("RawSponsor")

export type RawSponsor = z.infer<typeof RawSponsorSchema>

export const SponsorSchema = RawSponsorSchema.extend({
  "sponsor-tier": z
    .union([
      z.literal("Platinum"),
      z.literal("Gold"),
      z.literal("Silver"),
      z.literal("Bronze"),
      z.literal("Other"),
    ])
    .optional(),
})

export type Sponsor = z.infer<typeof SponsorSchema>

export const RawRecommendationsSchema = ItemSchema.extend({
  "city-state-zip": z.string().optional(),
  "external-url": z.string().optional(),
  "street-address": z.string().optional(),
  description: z.string(),
  descriptor: z.string(),
  images: z.array(ImageRefSchema),
  type: z.string(),
}).describe("RawRecommendations")

export type RawRecommendations = z.infer<typeof RawRecommendationsSchema>

export type Recommendations = RawRecommendations
