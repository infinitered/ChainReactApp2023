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
  /** Images added will be used in the carousels on the mobile app. (Cropped dimensions are: 358x274) */
  images: SetSchema,
  /** add a description for the recommendation. This is a plain text paragraph below the title. */
  description: PlainTextSchema,
  /** Used to generate directions for the mobile app but is not displayed. Ex: 123 Street Name */
  "street-address": PlainTextSchema.optional(),
  /** Used to generate directions in the mobile app, but is not displayed. Ex: Portland, OR, 97006 */
  "city-state-zip": PlainTextSchema.optional(),
  /** add a url for a website, yelp list, etc  */
  "external-url": LinkSchema.optional(),
  /** label to describe the recommendation. Use the format "Good for ____" (ex: Good for groups) */
  descriptor: PlainTextSchema,
  /** select the type of recommendation to add to a category. This will organize into different sections.  */
  type: OptionSchema,
  /** Enter the name of restaurant, location, neighborhood, etc. This will be used for the titles for each recommendation. */
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
  /** Cover image for card on the All Events page */
  "card-image": ImageRefSchema,
  /** Brief description (2-3 sentences) to summarize the conference year. */
  "overview-about-conference-year": PlainTextSchema,
  /** Link to blog post, highlight, etc. Leave blank if not needed. */
  "overview-cta": LinkSchema.optional(),
  /** Add link to Google Drive public album of photos from the conference.  */
  "link-to-public-event-photo-album": LinkSchema,
  /** Top image in talks section.  */
  "talk-image": ImageRefSchema,
  /** Bottom left image */
  "talk-image-2": ImageRefSchema,
  /** Bottom right image */
  "talk-image-3": ImageRefSchema,
  /** Link to the full playlist of talks on YouTube */
  "link-to-youtube-playlist-of-talks": LinkSchema,
  /** Large, top image */
  "panel-image-1": ImageRefSchema,
  /** Bottom left image */
  "panel-image-2": ImageRefSchema,
  /** Bottom right image */
  "panel-image-3": ImageRefSchema.optional(),
  /** This should link directly to the youtube video of the panel. */
  "link-to-video-of-speaker-panel": LinkSchema,
  /** Large top image */
  "workshop-image-1": ImageRefSchema.optional(),
  /** Bottom left image */
  "workshop-image-2": ImageRefSchema.optional(),
  /** Bottom right image */
  "workshop-image-3": ImageRefSchema.optional(),
  /** Select all of the speakers that gave a talk (full and lightening) */
  "speakers-3": ItemRefSetSchema,
  /** Select all of the speakers that participated in the panel. */
  "panelists-2": ItemRefSetSchema.optional(),
  /** Select all of the instructors for workshops */
  "workshop-instructors": ItemRefSetSchema.optional(),
  /** Add all emcees for current year */
  emcees: ItemRefSetSchema,
  /** ex. 2019  */
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
  /** talk or workshop description */
  description: PlainTextSchema.optional(),
  /** shortened version of description that is shown on the schedule page. Keep to 2 sentences max. */
  "description-preview": PlainTextSchema.optional(),
  /** select the year the talk or workshop was given. This is used to filter talks for archived conference years. */
  year: OptionSchema,
  /** select the type of talk type for the speaker. Select the "emcee" for hosts to be able to filter from regular talks/workshops. */
  "talk-type": OptionSchema,
  /** external link to the recording of the talk. Only use the official video from the Infinite Red YouTube account for this link. */
  "talk-url": LinkSchema.optional(),
  /** Select speaker giving this talk */
  speaker: ItemRefSchema,
  /** If a panel, add all speakers that were included. Otherwise, only add one speaker. */
  "speaker-s": ItemRefSetSchema,
  /** use the title of the talk or workshop to show on website and app */
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
  /** Add at least one image */
  "venue-image-s": SetSchema,
  /** 1234 Example St */
  "street-address": PlainTextSchema,
  /** Portland, OR 97006 */
  "city-state-zip": PlainTextSchema,
  /** add link to maps, etc if applies */
  "directions-url": LinkSchema.optional(),
  /** select a tag to note the use for the venu. (ex: conference for The Armory) */
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
  /** select the day of the event to sort into tabs for the schedule */
  day: OptionSchema,
  /** select the date and time to sort the order of events. Choose the start time for the event. */
  "day-time": DateSchema,
  /** select the ending time for the event. This is used for breaks/recurring events to show a time window. It's not required or displayed for talks */
  "end-time": DateSchema.optional(),
  /** select the type of event to assign a label  */
  "event-type": OptionSchema.optional(),
  /** select the talk to add details to the schedule unless it's a recurring or sponsored event.  */
  "talk-2": ItemRefSchema.optional(),
  /** select the workshop to add details to the schedule */
  workshop: ItemRefSchema.optional(),
  /** select the recurrent event type to add details */
  "recurring-event": ItemRefSchema.optional(),
  /** select the location for the event to display addresses and details on detail pages/screens */
  location: ItemRefSchema.optional(),
  /** Select speaker for talk, workshop, or panel */
  "speaker-3": ItemRefSchema.optional(),
  /** Select a second speaker for a talk, workshop, or panel */
  "speaker-2-2": ItemRefSchema.optional(),
  /** Select a third speaker for a talk, workshop, or panel */
  "speaker-3-2": ItemRefSchema.optional(),
  /** Select a fourth speaker for a talk, workshop, or panel */
  "speaker-4": ItemRefSchema.optional(),
  /** Select a fifth speaker for a talk, workshop, or panel */
  "speaker-5": ItemRefSchema.optional(),
  /** Title of singular event that is not recurring, a talk, or a workshop */
  "event-title": PlainTextSchema.optional(),
  /** Short description of a single event that is not recurring */
  "event-description": PlainTextSchema.optional(),
  /** select a sponsor to add the logo to the event on the schedule. */
  "sponsor-for-event": ItemRefSchema.optional(),
  /** Select this option if the sponsor logo is for a callout that is part of a recurring event.  */
  "sponsor-is-for-a-callout": BoolSchema.optional(),
  /** [for internal CMS use] add a title for the event */
  name: PlainTextSchema,
  /** Can use auto generated URL from entered title */
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
  /** Image of logo after resized and compressed for web (under 1 mb) */
  logo: ImageRefSchema,
  /** select the sponsorship tier. If it's a repeat sponsorship (more than one year) select the tier from the most recent year. This will not affect page for archived years */
  "sponsor-tier": OptionSchema,
  /** Add the type of sponsorship if the "other" tier option was selected. Ex: coffee, wifi, etc */
  "sponsorship-type": PlainTextSchema.optional(),
  /** Add a short summary or description, typically an overview of the product, service, or company. This is only displayed for Platinum and Gold tier sponsors on both the website and app */
  "promo-summary": PlainTextSchema.optional(),
  /** select this option if the sponsor is part of the current conference year. This is used to filter and omit any past sponsors from the list. */
  "is-a-current-sponsor": BoolSchema.optional(),
  /** Select this option to feature the sponsor logo in a list of past sponsors on the homepage */
  "2020-sponsor": BoolSchema.optional(),
  /** select all years that the company was a sponsor. This includes all tiers and types of sponsorships.  */
  "conference-years-2": ItemRefSetSchema,
  /** Link to sponsor's official website */
  "external-url": LinkSchema.optional(),
  /** Not visible on site, but used to label the entry in the CMS and for the image alt text (accessibility) */
  name: PlainTextSchema,
  /** Can use auto generated url from name entered above. */
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
  /** i.e. Developer at Expo */
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
  /** Enter speakers full name. This is how the speaker's name will appear on the site. */
  "speaker-full-name": PlainTextSchema,
  /** The speaker type selected is displayed as a title on the speaker details page. */
  "speaker-type-2": OptionSchema,
  /** The conference year selected is shown on the speaker details page. */
  "conference-year": OptionSchema,
  /** Add the name of the speaker's current company. If more than one, separate by a semicolon. ex: Company One; Company Two */
  "company-name": PlainTextSchema,
  /** Link to GitHub profile. */
  github: LinkSchema.optional(),
  /** Link to Twitter profile. */
  twitter: LinkSchema.optional(),
  /** Link to a personal site (Medium, portfolio, etc) */
  website: LinkSchema.optional(),
  /** Name of talk title in sentence case (only proper nouns capitalized.) Ex: Getting started with React Native. */
  "talk-title": PlainTextSchema,
  /** Full abstract for talk. Can include bullet points, but no bold, italic, or heading text. Make sure to paste text without formatting (Command + Shift + V) */
  "abstract-3": RichTextSchema.optional(),
  /** Add YouTube link to link out to recording. */
  "link-to-talk-recording": LinkSchema.optional(),
  /** Optional link to speaker's slides. This will be visible on the speaker details page. */
  "link-to-talk-slides": LinkSchema.optional(),
  /** This is not visible on the site. Info entered is used to find the entry within the CMS. */
  name: PlainTextSchema,
  /** Can use url generated from the name & year entered above. */
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
  /** Select the level for the workshop. This appears on the cards and the workshop details page. */
  level: OptionSchema,
  /** Add the description for the workshop to show on the details pages/screen on the website and app */
  abstract: PlainTextSchema,
  /** 1 sentence callout quote shown on the workshop details page */
  "description-quote": PlainTextSchema,
  /** 2-3 sentences. shortened summary of description in the workshop footer section of the details page.  */
  summary: PlainTextSchema,
  /** list any notable pre-reqs for the workshop, separated by a comma. Leave blank if none.  */
  "pre-requites": PlainTextSchema.optional(),
  /** select the workshop instructor to add images and details  */
  "instructor-info": ItemRefSchema,
  /** (optional) add another instructor leading the workshop */
  "second-instructor-3": ItemRefSchema.optional(),
  /** Add instructors that will be primarily leading the workshop and not just assisting. This will be used to display instructor details on cards and schedules. */
  "instructor-s-2": ItemRefSetSchema,
  /** (optional) add the names of people that will be assisting the primary instructor(s) but not leading a workshop. This will be used on the workshop details page. */
  assistants: ItemRefSetSchema.optional(),
  /** select the current year or the year workshop was given */
  year: OptionSchema.optional(),
  /** select this option to simplify the info displayed so that the company name is only shown once  */
  "instructors-are-from-the-same-company": BoolSchema.optional(),
  "card-list-item-1": PlainTextSchema.optional(),
  "card-list-item-2": PlainTextSchema.optional(),
  "card-list-item-3": PlainTextSchema.optional(),
  /** When sales reach 8 or fewer left, add number of tickes remaining for the workshop */
  "ticket-count": PlainTextSchema.optional(),
  /** When ticket sales reach 8 or fewer, enable to show the remaining count on website */
  "show-ticket-count": BoolSchema.optional(),
  /** toggle on to show "sold out" status on the workshop card */
  "is-sold-out": BoolSchema.optional(),
  /** Add the full title for the workshop to display across the website and app */
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
  /** summary of event shown in the calendar view. This will be the same for each recurring event type. Add another event if the description should be different. (ex: lunch vs coffee break) */
  "event-description": PlainTextSchema,
  /** Title for a callout during a break for a sponsored event */
  "secondary-callout": PlainTextSchema.optional(),
  "secondary-callout-description": PlainTextSchema.optional(),
  /** select the sponsor to add their logo */
  "sponsor-for-secondary-callout-optional": ItemRefSchema.optional(),
  /** Link to a sponsor website, or additional info for a secondary callout */
  "secondary-callout-link": LinkSchema.optional(),
  /** use a short, descriptive label for the title. This will be used as the card label on the schedule. */
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
  /** This is used for label of bio section, ex: About [First Name] */
  "speaker-first-name": PlainTextSchema.optional(),
  "speaker-type": OptionSchema,
  /** Edited photo of speaker after compressed for web (small file size under 1 mb) */
  "speaker-photo": ImageRefSchema.optional(),
  /** ex. Software Developer */
  title: PlainTextSchema.optional(),
  /** Name of current company */
  company: PlainTextSchema.optional(),
  /** Link to twitter profile */
  twitter: LinkSchema.optional(),
  /** Link to GitHub profile. */
  github: LinkSchema.optional(),
  /** Link to a personal website (Medium, portfolio, etc) */
  website: LinkSchema.optional(),
  /** Paragraph format for speaker bio. This will not include any formatting or line breaks (single paragraph only).  */
  "speaker-bio": PlainTextSchema.optional(),
  /** select this option to add the speaker to the current year's conference. This will add them to the homepage and/or talks pages. */
  "is-a-current-speaker": BoolSchema.optional(),
  /** select the talk(s) given. Talks for previous years will be shown on past conference pages. */
  "talk-s": ItemRefSetSchema.optional(),
  /** select workshops led by the speaker. Previous workshops will be shown on past conference pages. */
  "workshop-s": ItemRefSetSchema.optional(),
  /** Leave this field blank. This is used to connect to other CMSs */
  "talk-details-url": LinkSchema.optional(),
  /** This will be used to display the speaker's name on the website. */
  name: PlainTextSchema,
  /** Can use auto generated slug (url name) from speaker's name */
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
  /** copy ID from embed code  */
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
