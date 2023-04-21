interface Item {
  _archived: boolean
  _cid: string
  _draft: boolean
  _id: string
  "created-by": string
  "created-on": string
  "published-by"?: string | null
  "published-on"?: string | null
  "updated-by": string
  "updated-on": string
  name: string
  slug: string
}

export interface RawScheduledEvent extends Item {
  "break-card-color"?: string
  "break-party-description"?: string
  "day-time": string
  "end-time"?: string
  "is-a-talk"?: boolean
  "recurring-event"?: string
  "speaker-2"?: string
  day: string
  talk?: string
  type: string
  workshop?: string
  location?: string
}

export interface ScheduledEvent extends Item {
  "break-card-color"?: string
  "break-party-description"?: string
  "day-time": string
  "end-time"?: string
  "is-a-talk"?: boolean
  "recurring-event"?: RecurringEvents
  "speaker-2"?: Speaker | RawSpeakerName
  "speaker-3"?: Speaker | RawSpeakerName
  "speaker-2-2"?: Speaker | RawSpeakerName
  "speaker-3-2"?: Speaker | RawSpeakerName
  "event-title"?: string
  "event-description"?: string
  day: "Wednesday" | "Thursday" | "Friday"
  talk?: Talk
  type?:
    | "Talk"
    | "Workshop"
    | "Party"
    | "Recurring"
    | "Sponsored"
    | "Lightning Talk"
    | "Trivia Show"
  workshop?: Workshop
  location?: string
}

export interface RawWorkshop extends Item {
  "day-time": string
  "has-more-than-one-instructor"?: boolean
  "instructor-info"?: string
  "instructor-s-2": string[]
  "ticket-link": string
  abstract: string
  assistants?: string[]
  level: string
  prerequisites: string
  talk?: string
}

export interface Workshop extends Item {
  "day-time": string
  "has-more-than-one-instructor"?: boolean
  "instructor-info": Speaker
  "instructor-s-2": Speaker[]
  "ticket-link": string
  abstract: string
  assistants?: Speaker[]
  level: "Beginner" | "Intermediate" | "Advanced"
  prerequisites: string
}

export interface RawTalk extends Item {
  "speaker-s": string[]
  "talk-type": string
  description?: string
  year: string
  "talk-url"?: string
}

export interface Talk extends Item {
  "speaker-s": Speaker[]
  "talk-type"?: "Talk" | "Emcee"
  description?: string
  "talk-url"?: string
}

export interface RawVenue extends Item {
  "city-state-zip": string
  "dircetions-url"?: string
  "street-address": string
  "venue-image-s": ImageRef[]
  tag: string
}

export interface Venue extends RawVenue {}

export interface RawRecurringEvents extends Item {
  "event-description"?: string
}

export interface RecurringEvents extends RawRecurringEvents {}

export interface RawSpeaker extends Item {
  "abstract-2"?: string
  "is-a-workshop"?: boolean
  "second-company"?: string
  "second-title"?: string
  "speaker-bio"?: string
  "speaker-first-name"?: string
  "speaker-name": string
  "speaker-photo": ImageRef
  "speaker-type": string
  "talk-details-url"?: string
  "talk-level"?: string
  "talk-title"?: string
  company?: string
  github?: string
  title?: string
  twitter?: string
  externalURL?: string
  website?: string
}

export type Speaker = RawSpeaker & {
  "speaker-type"?: "Speaker" | "Panelist" | "Workshop" | "Emcee"
  "talk-level"?: "Beginner" | "Intermediate" | "Advanced"
}

export interface RawSponsor extends Item {
  "conference-years-2"?: string
  "external-url"?: string
  "feature-as-a-past-sponsor"?: boolean
  "is-a-current-sponsor"?: boolean
  "promo-summary"?: string
  "sponsor-tier": string
  "sponsorship-type"?: string
  logo: ImageRef
}

export type Sponsor = RawSponsor & {
  "sponsor-tier"?: "Platinum" | "Gold" | "Silver" | "Bronze" | "Other"
}

export interface RawRecommendations extends Item {
  "city-state-zip"?: string
  "external-url"?: string
  "street-address"?: string
  description: string
  descriptor: string
  images: ImageRef[]
  type: string
}

export interface Recommendations extends RawRecommendations {}

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

interface ImageRef {
  alt: string | null
  field: string
  url: string
}

interface SpeakerPhotoPNG {
  alt?: string | null
  fieldId: string
  url: string
}
