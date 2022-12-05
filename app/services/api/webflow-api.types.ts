import { IItem } from "webflow-api/dist/api"

export interface CustomScheduleProps extends IItem {
  "break-card-color"?: string
  "break-party-description"?: string
  day: string
  "day-time": Date
  "is-a-talk"?: boolean
  "speaker-2"?: string
  type: string
}

export interface ScheduleProps extends IItem {
  day: "Wednesday" | "Thursday" | "Friday"
  type?: "Talk" | "Lightning Talk" | "Break" | "Party"
  "speaker-2"?: SpeakerProps
  "break-card-color"?: string
  "break-party-description"?: string
  "day-time": Date
  "is-a-talk"?: boolean
}

export interface CustomWorkshopProps extends IItem {
  level: string
  type: string
  abstract: string
  prerequisites: string
  "instructor-info"?: string
  "has-more-than-one-instructor"?: boolean
  "second-instructor-2"?: string
  "ticket-link": string
}

export interface WorkshopProps extends IItem {
  "instructor-info": SpeakerProps
  "second-instructor-2": SpeakerProps
  level?: "Beginner" | "Intermediate" | "Advanced"
  type?: "New" | "Top Seller"
  abstract: string
  prerequisites: string
  "has-more-than-one-instructor"?: boolean
  "ticket-link": string
}

export interface CustomSpeakerProps extends IItem {
  "speaker-type": string
  "speaker-photo": string
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
