interface IItem {
  _archived: boolean
  _draft: boolean
  _id: string
  _cid: string
  name: string
  slug: string
  "updated-on": string
  "created-on": string
  "updated-by": string
  "created-by": string
  "published-on"?: string | null
  "published-by"?: string | null
}

export interface CustomScheduleProps extends IItem {
  "break-card-color"?: string
  "break-party-description"?: string
  day: string
  "day-time": string
  "is-a-talk"?: boolean
  "speaker-2"?: string
  type: string
  workshop?: string
  "recurring-event"?: string
}

export interface ScheduleProps extends IItem {
  day: "Wednesday" | "Thursday" | "Friday"
  type?: "Talk" | "Speaker Panel" | "Workshop" | "Party" | "Recurring"
  "speaker-2"?: SpeakerProps | CustomSpeakerNamesProps
  "break-card-color"?: string
  "break-party-description"?: string
  "day-time": string
  "is-a-talk"?: boolean
  workshop?: WorkshopProps
  "recurring-event"?: RecurringEventsProps
}

export interface CustomWorkshopProps extends IItem {
  level: string
  abstract: string
  prerequisites: string
  "instructor-info"?: string
  "has-more-than-one-instructor"?: boolean
  assistants?: string[]
  "ticket-link": string
  "day-time": string
}

export interface WorkshopProps extends IItem {
  "instructor-info": SpeakerProps
  assistants?: SpeakerProps[]
  level: "Beginner" | "Intermediate" | "Advanced"
  abstract: string
  prerequisites: string
  "has-more-than-one-instructor"?: boolean
  "ticket-link": string
  "day-time": string
}

export interface CustomRecurringEventsProps extends IItem {
  "day-time": string
  "event-description"?: string
  type: string
}

export interface RecurringEventsProps extends IItem {
  "day-time": string
  "event-description"?: string
  type: "Check-in & Registration" | "Morning Break" | "Lunch Break" | "Afternoon Break"
}

export interface CustomSpeakerProps extends IItem {
  "speaker-type": string
  "speaker-photo": IImageRef
  title?: string
  company?: string
  "second-title"?: string
  "second-company"?: string
  twitter?: string
  github?: string
  website?: string
  "speaker-first-name"?: string
  "speaker-bio"?: string
  "talk-title"?: string
  "talk-level"?: string
  "is-a-workshop"?: boolean
  "abstract-2"?: string
  "talk-details-url"?: string
  "speaker-name": string
}

export type SpeakerProps = CustomSpeakerProps & {
  "speaker-type"?: "Speaker" | "Panelist" | "Workshop" | "Emcee"
  "talk-level"?: "Beginner" | "Intermediate" | "Advanced"
}

export interface CustomSponsorProps extends IItem {
  logo: IImageRef
  "2020-sponsor"?: boolean
}

interface IImageRef {
  field: string
  url: string
  alt: string | null
}

export interface CustomSpeakerNamesProps extends IItem {
  "talk-title": string
  title: string
  "github-url": string
  "twitter-url": string
  "previous-url": string
  bio: string
  "next-url": string
  "talk-abstract-3": string
  "medium-url-2"?: string
  "close-anchor"?: string
  "session-type"?: "Speaker Panel"
  "speaker-photo-png": SpeakerPhotoPngProps
}

interface SpeakerPhotoPngProps {
  fieldId: string
  url: string
  alt?: string | null
}
