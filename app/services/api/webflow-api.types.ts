import { ImageRequireSource } from "react-native"
import { WEBFLOW_MAP } from "./webflow-consts"

interface Item {
  _archived: boolean
  _cid: string
  _draft: boolean
  _id: string
  "created-by"?: string
  "created-on"?: string
  "published-by"?: string | null
  "published-on"?: string | null
  "updated-by"?: string
  "updated-on"?: string
  name: string
  slug: string
}

export interface RawScheduledEvent extends Item {
  "event-description"?: string
  "sponsor-is-for-a-callout"?: boolean
  "day-time": string
  "end-time"?: string
  "event-type"?: keyof typeof WEBFLOW_MAP.scheduleType
  "recurring-event"?: string
  "speaker-3"?: string
  "speaker-3-2"?: string
  "speaker-2-2"?: string
  "speaker-4"?: string
  "speaker-5"?: string
  day: keyof typeof WEBFLOW_MAP.scheduleDay
  "talk-2"?: string
  workshop?: string
  location?: keyof typeof WEBFLOW_MAP.location
  "sponsor-for-event"?: string
  "event-title"?: string
}

export interface ScheduledEvent
  extends Omit<
    RawScheduledEvent,
    | "day"
    | "day-time"
    | "end-time"
    | "location"
    | "recurring-event"
    | "speaker-2-2"
    | "speaker-3"
    | "speaker-3-2"
    | "speaker-4"
    | "speaker-5"
    | "workshop"
  > {
  day: (typeof WEBFLOW_MAP.scheduleDay)[keyof typeof WEBFLOW_MAP.scheduleDay]
  "day-time": Date
  "end-time"?: Date
  location?: (typeof WEBFLOW_MAP.location)[keyof typeof WEBFLOW_MAP.location]
  "recurring-event"?: RecurringEvents
  "speaker-2-2"?: Speaker
  "speaker-3"?: Speaker
  "speaker-3-2"?: Speaker
  "speaker-4"?: Speaker
  "speaker-5"?: Speaker
  talk?: Talk
  type: (typeof WEBFLOW_MAP.scheduleType)[keyof typeof WEBFLOW_MAP.scheduleType]
  workshop?: Workshop
}

export interface RawWorkshop extends Item {
  "instructor-info": string
  "second-instructor-3"?: string
  "instructor-s-2": string[]
  abstract: string
  assistants?: string[]
  level: keyof typeof WEBFLOW_MAP.workshopLevel
  "pre-requites"?: string
  "is-sold-out"?: boolean
  "show-ticket-count"?: boolean
  "ticket-count"?: string
  "description-quote": string
  summary: string
  "instructors-are-from-the-same-company"?: boolean
  "card-list-item-1"?: string
  "card-list-item-2"?: string
  "card-list-item-3"?: string
  year?: keyof typeof WEBFLOW_MAP.workshopYear
}

export interface Workshop
  extends Omit<
    RawWorkshop,
    "second-instructor-3" | "instructor-s-2" | "assistants" | "level" | "year" | "instructor-info"
  > {
  "second-instructor-3"?: Speaker
  "instructor-info": Speaker
  "instructor-s-2": Speaker[]
  assistants?: Speaker[]
  level: (typeof WEBFLOW_MAP.workshopLevel)[keyof typeof WEBFLOW_MAP.workshopLevel]
  year?: (typeof WEBFLOW_MAP.workshopYear)[keyof typeof WEBFLOW_MAP.workshopYear]
}

export interface RawTalk extends Item {
  "speaker-s": string[]
  "talk-type": keyof typeof WEBFLOW_MAP.talkType
  description?: string
  descriptionPreview?: string
  year: string
  "talk-url"?: string
  speaker: string
}

export interface Talk extends Omit<RawTalk, "speaker-s" | "talk-type"> {
  "speaker-s": Speaker[]
  "talk-type": (typeof WEBFLOW_MAP.talkType)[keyof typeof WEBFLOW_MAP.talkType]
}

export interface RawVenue extends Item {
  "city-state-zip": string
  "directions-url"?: string
  "street-address": string
  "venue-image-s": ImageRef[]
  tag: keyof typeof WEBFLOW_MAP.venueTag
}

export interface Venue extends Omit<RawVenue, "tag"> {
  tag: (typeof WEBFLOW_MAP.venueTag)[keyof typeof WEBFLOW_MAP.venueTag]
}

export interface RawRecurringEvents extends Item {
  "event-description": string
  "secondary-callout"?: string
  "secondary-callout-description"?: string
  "secondary-callout-link"?: string
  "sponsor-for-secondary-callout-optional"?: string
  "secondary-callout-banner"?: ImageRequireSource | ImageRef
  "secondary-callout-location"?: string
}

export interface RecurringEvents extends RawRecurringEvents {}

export interface RawSpeaker extends Item {
  "speaker-bio"?: string
  "speaker-first-name"?: string
  "speaker-photo"?: ImageRef
  "speaker-type": keyof typeof WEBFLOW_MAP.speakersType
  company?: string
  github?: string
  title?: string
  twitter?: string
  "external-url"?: string
  website?: string
  "talks-s"?: string[]
  "workshop-s"?: string[]
  "is-a-current-speaker"?: boolean
  "talk-details-url"?: string
}

export interface Speaker extends Omit<RawSpeaker, "speaker-type"> {
  "speaker-type": (typeof WEBFLOW_MAP.speakersType)[keyof typeof WEBFLOW_MAP.speakersType]
  externalURL?: string
}

export interface RawSponsor extends Item {
  "conference-years-2": string
  "external-url"?: string
  "2020-sponsor"?: boolean
  "is-a-current-sponsor"?: boolean
  "promo-summary"?: string
  "sponsor-tier": keyof typeof WEBFLOW_MAP.sponsorTier
  "sponsorship-type"?: string
  logo: ImageRef
}

export interface Sponsor extends Omit<RawSponsor, "sponsor-tier"> {
  "sponsor-tier": (typeof WEBFLOW_MAP.sponsorTier)[keyof typeof WEBFLOW_MAP.sponsorTier]
}

export interface RawRecommendations extends Item {
  "city-state-zip"?: string
  "external-url"?: string
  "street-address"?: string
  description: string
  descriptor: string
  images: ImageRef[]
  type: keyof typeof WEBFLOW_MAP.recommendationType
}

export interface Recommendations extends Omit<RawRecommendations, "type"> {
  type: (typeof WEBFLOW_MAP.recommendationType)[keyof typeof WEBFLOW_MAP.recommendationType]
}

export interface RawSpeakerName extends Item {
  "close-anchor"?: string
  "github-url": string
  "medium-url-2"?: string
  "next-url": string
  "previous-url": string
  "speaker-photo-png": SpeakerPhotoPNG
  "talk-abstract-3": string
  "talk-title": string
  "twitter-url": string
  bio: string
  title: string
}

export interface ImageRef {
  alt: string | null
  field: string
  url: string
}

interface SpeakerPhotoPNG {
  alt?: string | null
  fieldId: string
  url: string
}
