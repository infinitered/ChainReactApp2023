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
  "day-time": Date | string
  "is-a-talk"?: boolean
  "speaker-2"?: string
  type: string
}

export interface ScheduleProps extends IItem {
  day: "Wednesday" | "Thursday" | "Friday"
  type?: "Talk" | "Lightning Talk" | "Break" | "Party"
  "speaker-2"?: SpeakerProps | CustomSpeakerNamesProps
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
  "session-type"?: "Lightning Talk"
  "speaker-photo-png": SpeakerPhotoPngProps
}

interface SpeakerPhotoPngProps {
  fieldId: string
  url: string
  alt?: string | null
}
