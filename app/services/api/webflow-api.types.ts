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
  "is-a-talk"?: boolean
  "recurring-event"?: string
  "speaker-2"?: string
  day: string
  talk?: string
  type: string
  workshop?: string
}

export interface ScheduledEvent extends Item {
  "break-card-color"?: string
  "break-party-description"?: string
  "day-time": string
  "is-a-talk"?: boolean
  "recurring-event"?: RecurringEvents
  "speaker-2"?: Speaker | RawSpeakerName
  day: "Wednesday" | "Thursday" | "Friday"
  talk?: Talk
  type?: "Talk" | "Speaker Panel" | "Workshop" | "Party" | "Recurring"
  workshop?: Workshop
}

export interface RawWorkshop extends Item {
  "day-time": string
  "has-more-than-one-instructor"?: boolean
  "instructor-info"?: string
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
}

export interface Talk extends Item {
  "speaker-s": Speaker[]
  "talk-type"?: "Talk" | "Speaker Panel" | "Emcee"
  description?: string
}

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
  website?: string
}

export type Speaker = RawSpeaker & {
  "speaker-type"?: "Speaker" | "Panelist" | "Workshop" | "Emcee"
  "talk-level"?: "Beginner" | "Intermediate" | "Advanced"
}

export interface RawSponsor extends Item {
  "2020-sponsor"?: boolean
  logo: ImageRef
}

interface ImageRef {
  alt: string | null
  field: string
  url: string
}

export interface RawSpeakerName extends Item {
  "close-anchor"?: string
  "github-url": string
  "medium-url-2"?: string
  "next-url": string
  "previous-url": string
  "session-type"?: "Speaker Panel"
  "speaker-photo-png": SpeakerPhotoPNG
  "talk-abstract-3": string
  "talk-title": string
  "twitter-url": string
  bio: string
  title: string
}

interface SpeakerPhotoPNG {
  alt?: string | null
  fieldId: string
  url: string
}
