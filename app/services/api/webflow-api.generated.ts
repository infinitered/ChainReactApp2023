import { z } from "zod"
import {
  CollectionBaseSchema,
  SetSchema,
  PlainTextSchema,
  LinkSchema,
  OptionSchema,
  BoolSchema,
  DateSchema,
  UserSchema,
  ImageRefSchema,
  ItemRefSetSchema,
  ItemRefSchema,
  RichTextSchema,
} from "./webflow-api.schema"

export const RecommendationsCollectionSchema = CollectionBaseSchema.extend({
  images: SetSchema,
  description: PlainTextSchema,
  "street-address": PlainTextSchema.optional(),
  "city-state-zip": PlainTextSchema.optional(),
  "external-url": LinkSchema.optional(),
  descriptor: PlainTextSchema,
  type: OptionSchema,
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type RecommendationsCollection = z.infer<typeof RecommendationsCollectionSchema>

export const ConferenceYearsCollectionSchema = CollectionBaseSchema.extend({
  "card-image": ImageRefSchema,
  "overview-about-conference-year": PlainTextSchema,
  "overview-cta": LinkSchema.optional(),
  "link-to-public-event-photo-album": LinkSchema,
  "talk-image": ImageRefSchema,
  "talk-image-2": ImageRefSchema,
  "talk-image-3": ImageRefSchema,
  "link-to-youtube-playlist-of-talks": LinkSchema,
  "panel-image-1": ImageRefSchema,
  "panel-image-2": ImageRefSchema,
  "panel-image-3": ImageRefSchema.optional(),
  "link-to-video-of-speaker-panel": LinkSchema,
  "workshop-image-1": ImageRefSchema.optional(),
  "workshop-image-2": ImageRefSchema.optional(),
  "workshop-image-3": ImageRefSchema.optional(),
  "speakers-3": ItemRefSetSchema,
  "panelists-2": ItemRefSetSchema.optional(),
  "workshop-instructors": ItemRefSetSchema.optional(),
  emcees: ItemRefSetSchema,
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type ConferenceYearsCollection = z.infer<typeof ConferenceYearsCollectionSchema>

export const TalksCollectionSchema = CollectionBaseSchema.extend({
  description: PlainTextSchema.optional(),
  "description-preview": PlainTextSchema.optional(),
  year: OptionSchema,
  "talk-type": OptionSchema,
  "talk-url": LinkSchema.optional(),
  speaker: ItemRefSchema,
  "speaker-s": ItemRefSetSchema,
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type TalksCollection = z.infer<typeof TalksCollectionSchema>

export const VenuesCollectionSchema = CollectionBaseSchema.extend({
  "venue-image-s": SetSchema,
  "street-address": PlainTextSchema,
  "city-state-zip": PlainTextSchema,
  "directions-url": LinkSchema.optional(),
  tag: OptionSchema,
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type VenuesCollection = z.infer<typeof VenuesCollectionSchema>

export const ScheduledeventsCollectionSchema = CollectionBaseSchema.extend({
  day: OptionSchema,
  "day-time": DateSchema,
  "end-time": DateSchema.optional(),
  "event-type": OptionSchema.optional(),
  "talk-2": ItemRefSchema.optional(),
  workshop: ItemRefSchema.optional(),
  "recurring-event": ItemRefSchema.optional(),
  location: ItemRefSchema.optional(),
  "speaker-3": ItemRefSchema.optional(),
  "speaker-2-2": ItemRefSchema.optional(),
  "speaker-3-2": ItemRefSchema.optional(),
  "speaker-4": ItemRefSchema.optional(),
  "speaker-5": ItemRefSchema.optional(),
  "event-title": PlainTextSchema.optional(),
  "event-description": PlainTextSchema.optional(),
  "sponsor-for-event": ItemRefSchema.optional(),
  "sponsor-is-for-a-callout": BoolSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type ScheduledeventsCollection = z.infer<typeof ScheduledeventsCollectionSchema>

export const SponsorsCollectionSchema = CollectionBaseSchema.extend({
  logo: ImageRefSchema,
  "sponsor-tier": OptionSchema,
  "sponsorship-type": PlainTextSchema.optional(),
  "promo-summary": PlainTextSchema.optional(),
  "is-a-current-sponsor": BoolSchema.optional(),
  "2020-sponsor": BoolSchema.optional(),
  "conference-years-2": ItemRefSetSchema,
  "external-url": LinkSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type SponsorsCollection = z.infer<typeof SponsorsCollectionSchema>

export const SpeakerNamesCollectionSchema = CollectionBaseSchema.extend({
  title: PlainTextSchema.optional(),
  bio: PlainTextSchema.optional(),
  "speaker-photo-png": ImageRefSchema.optional(),
  "talk-title": PlainTextSchema.optional(),
  "talk-abstract-3": RichTextSchema.optional(),
  "session-type": PlainTextSchema.optional(),
  "twitter-url": LinkSchema.optional(),
  "github-url": LinkSchema.optional(),
  "medium-url-2": LinkSchema.optional(),
  "close-anchor": LinkSchema.optional(),
  "next-url": LinkSchema.optional(),
  "previous-url": LinkSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type SpeakerNamesCollection = z.infer<typeof SpeakerNamesCollectionSchema>

export const PastTalksCollectionSchema = CollectionBaseSchema.extend({
  "speaker-photo": ImageRefSchema,
  "speaker-full-name": PlainTextSchema,
  "speaker-type-2": OptionSchema,
  "conference-year": OptionSchema,
  "company-name": PlainTextSchema,
  github: LinkSchema.optional(),
  twitter: LinkSchema.optional(),
  website: LinkSchema.optional(),
  "talk-title": PlainTextSchema,
  "abstract-3": RichTextSchema.optional(),
  "link-to-talk-recording": LinkSchema.optional(),
  "link-to-talk-slides": LinkSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type PastTalksCollection = z.infer<typeof PastTalksCollectionSchema>

export const WorkshopsCollectionSchema = CollectionBaseSchema.extend({
  level: OptionSchema,
  abstract: PlainTextSchema,
  "description-quote": PlainTextSchema,
  summary: PlainTextSchema,
  "pre-requites": PlainTextSchema.optional(),
  "instructor-info": ItemRefSchema,
  "second-instructor-3": ItemRefSchema.optional(),
  "instructor-s-2": ItemRefSetSchema,
  assistants: ItemRefSetSchema.optional(),
  year: OptionSchema.optional(),
  "instructors-are-from-the-same-company": BoolSchema.optional(),
  "card-list-item-1": PlainTextSchema.optional(),
  "card-list-item-2": PlainTextSchema.optional(),
  "card-list-item-3": PlainTextSchema.optional(),
  "ticket-count": PlainTextSchema.optional(),
  "show-ticket-count": BoolSchema.optional(),
  "is-sold-out": BoolSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type WorkshopsCollection = z.infer<typeof WorkshopsCollectionSchema>

export const RecurringEventsCollectionSchema = CollectionBaseSchema.extend({
  "event-description": PlainTextSchema,
  "secondary-callout": PlainTextSchema.optional(),
  "secondary-callout-description": PlainTextSchema.optional(),
  "sponsor-for-secondary-callout-optional": ItemRefSchema.optional(),
  "secondary-callout-link": LinkSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type RecurringEventsCollection = z.infer<typeof RecurringEventsCollectionSchema>

export const SpeakersCollectionSchema = CollectionBaseSchema.extend({
  "speaker-first-name": PlainTextSchema.optional(),
  "speaker-type": OptionSchema,
  "speaker-photo": ImageRefSchema.optional(),
  title: PlainTextSchema.optional(),
  company: PlainTextSchema.optional(),
  twitter: LinkSchema.optional(),
  github: LinkSchema.optional(),
  website: LinkSchema.optional(),
  "speaker-bio": PlainTextSchema.optional(),
  "is-a-current-speaker": BoolSchema.optional(),
  "talk-s": ItemRefSetSchema.optional(),
  "workshop-s": ItemRefSetSchema.optional(),
  "talk-details-url": LinkSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type SpeakersCollection = z.infer<typeof SpeakersCollectionSchema>

export const TicketsCollectionSchema = CollectionBaseSchema.extend({
  "eventbrite-id": PlainTextSchema.optional(),
  name: PlainTextSchema,
  slug: PlainTextSchema,
  _archived: BoolSchema,
  _draft: BoolSchema,
  "created-on": DateSchema.optional(),
  "updated-on": DateSchema.optional(),
  "published-on": DateSchema.optional(),
  "created-by": UserSchema.optional(),
  "updated-by": UserSchema.optional(),
  "published-by": UserSchema.optional(),
})

export type TicketsCollection = z.infer<typeof TicketsCollectionSchema>

export const COLLECTIONS_ID = {
  RECOMMENDATIONS: "640a728fc24f8e083b5fe18f",
  CONFERENCE_YEARS: "640a728fc24f8e0bd35fe18b",
  TALKS: "640a728fc24f8e31ee5fe18e",
  VENUES: "640a728fc24f8e553c5fe18d",
  SCHEDULED_EVENTS: "640a728fc24f8e63325fe185",
  SPONSORS: "640a728fc24f8e73575fe189",
  SPEAKER_NAMES: "640a728fc24f8e74d05fe18a",
  PAST_TALKS: "640a728fc24f8e76ef5fe186",
  WORKSHOPS: "640a728fc24f8e7f635fe187",
  RECURRING_EVENTS: "640a728fc24f8e85a75fe18c",
  SPEAKERS: "640a728fc24f8e94385fe188",
  TICKETS: "6425d6371c4264a637450c40",
}
