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
  /**
   * Images added will be used in the carousels on the mobile app. (Cropped dimensions are: 358x274)
   */
  images: SetSchema,
  /**
   * add a description for the recommendation. This is a plain text paragraph below the title.
   * {"singleLine":false}
   */
  description: PlainTextSchema,
  /**
   * Used to generate directions for the mobile app but is not displayed. Ex: 123 Street Name
   * {"singleLine":true}
   */
  "street-address": PlainTextSchema.optional(),
  /**
   * Used to generate directions in the mobile app, but is not displayed. Ex: Portland, OR, 97006
   * {"singleLine":true}
   */
  "city-state-zip": PlainTextSchema.optional(),
  /**
   * add a url for a website, yelp list, etc
   */
  "external-url": LinkSchema.optional(),
  /**
   * label to describe the recommendation. Use the format "Good for ____" (ex: Good for groups)
   * {"singleLine":true,"maxLength":30}
   */
  descriptor: PlainTextSchema,
  /**
   * select the type of recommendation to add to a category. This will organize into different sections.
   * {"options":[{"name":"food/drink","id":"3541dc4db3502b41c75043518060800d"},{"name":"sightsee","id":"a5028d71ed9c315a6e9fa67778f2579d"},{"name":"unique to portland","id":"f42e3ac1a464004c28d91ddf3945b654"},{"name":"neighborhood","id":"0e40a1811b85d1f596d891182dffba1a"}]}
   */
  type: OptionSchema,
  /**
   * Enter the name of restaurant, location, neighborhood, etc. This will be used for the titles for each recommendation.
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * Cover image for card on the All Events page
   */
  "card-image": ImageRefSchema,
  /**
   * Brief description (2-3 sentences) to summarize the conference year.
   * {"singleLine":false}
   */
  "overview-about-conference-year": PlainTextSchema,
  /**
   * Link to blog post, highlight, etc. Leave blank if not needed.
   */
  "overview-cta": LinkSchema.optional(),
  /**
   * Add link to Google Drive public album of photos from the conference.
   */
  "link-to-public-event-photo-album": LinkSchema,
  /**
   * Top image in talks section.
   */
  "talk-image": ImageRefSchema,
  /**
   * Bottom left image
   */
  "talk-image-2": ImageRefSchema,
  /**
   * Bottom right image
   */
  "talk-image-3": ImageRefSchema,
  /**
   * Link to the full playlist of talks on YouTube
   */
  "link-to-youtube-playlist-of-talks": LinkSchema,
  /**
   * Large, top image
   */
  "panel-image-1": ImageRefSchema,
  /**
   * Bottom left image
   */
  "panel-image-2": ImageRefSchema,
  /**
   * Bottom right image
   */
  "panel-image-3": ImageRefSchema.optional(),
  /**
   * This should link directly to the youtube video of the panel.
   */
  "link-to-video-of-speaker-panel": LinkSchema,
  /**
   * Large top image
   */
  "workshop-image-1": ImageRefSchema.optional(),
  /**
   * Bottom left image
   */
  "workshop-image-2": ImageRefSchema.optional(),
  /**
   * Bottom right image
   */
  "workshop-image-3": ImageRefSchema.optional(),
  /**
   * Select all of the speakers that gave a talk (full and lightening)
   * {"collectionId":"640a728fc24f8e76ef5fe186"}
   */
  "speakers-3": ItemRefSetSchema,
  /**
   * Select all of the speakers that participated in the panel.
   * {"collectionId":"640a728fc24f8e76ef5fe186"}
   */
  "panelists-2": ItemRefSetSchema.optional(),
  /**
   * Select all of the instructors for workshops
   * {"collectionId":"640a728fc24f8e76ef5fe186"}
   */
  "workshop-instructors": ItemRefSetSchema.optional(),
  /**
   * Add all emcees for current year
   * {"collectionId":"640a728fc24f8e76ef5fe186"}
   */
  emcees: ItemRefSetSchema,
  /**
   * ex. 2019
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * talk or workshop description
   * {"singleLine":false}
   */
  description: PlainTextSchema.optional(),
  /**
   * shortened version of description that is shown on the schedule page. Keep to 2 sentences max.
   * {"singleLine":false}
   */
  "description-preview": PlainTextSchema.optional(),
  /**
   * select the year the talk or workshop was given. This is used to filter talks for archived conference years.
   * {"options":[{"name":"2023","id":"711334c20c7b6236921b68ff62042887"},{"name":"2019","id":"cc265e5d153be3230eeb1f2c6a0f9d29"},{"name":"2018","id":"f9833cc38e35a342480cc482e7c091e2"},{"name":"2017","id":"e1af4624d0ba549cd1bcb510a2e73b44"}]}
   */
  year: OptionSchema,
  /**
   * select the type of talk type for the speaker. Select the "emcee" for hosts to be able to filter from regular talks/workshops.
   * {"options":[{"name":"talk","id":"38ba1361ae664a13e4a03f20ae153dc8"},{"name":"speaker panel","id":"e66d50161e7027f9c8646ac4ec9c02a9"},{"name":"emcee","id":"3aa9ece8012afed5d4e548180b2713e0"}]}
   */
  "talk-type": OptionSchema,
  /**
   * external link to the recording of the talk. Only use the official video from the Infinite Red YouTube account for this link.
   */
  "talk-url": LinkSchema.optional(),
  /**
   * Select speaker giving this talk
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  speaker: ItemRefSchema,
  /**
   * If a panel, add all speakers that were included. Otherwise, only add one speaker.
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "speaker-s": ItemRefSetSchema,
  /**
   * use the title of the talk or workshop to show on website and app
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * Add at least one image
   */
  "venue-image-s": SetSchema,
  /**
   * 1234 Example St
   * {"singleLine":true}
   */
  "street-address": PlainTextSchema,
  /**
   * Portland, OR 97006
   * {"singleLine":true}
   */
  "city-state-zip": PlainTextSchema,
  /**
   * add link to maps, etc if applies
   */
  "directions-url": LinkSchema.optional(),
  /**
   * select a tag to note the use for the venu. (ex: conference for The Armory)
   * {"options":[{"name":"conference","id":"d098b6fc74f6c55c6084ea42c385e7f6"},{"name":"workshop","id":"cf3d319cdaa0e6787b03ab94e74e3b8e"},{"name":"afterparty","id":"6157eba78b067d800ea4cfd5188e782f"}]}
   */
  tag: OptionSchema,
  /**
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * select the day of the event to sort into tabs for the schedule
   * {"options":[{"name":"one","id":"63ac4ade8b2d5a981780570e01bed34d"},{"name":"two","id":"ed2cfa99e27dce5d1a425a419f170eb3"},{"name":"three","id":"93f921892f42ef212e824c80e0db4da0"}]}
   */
  day: OptionSchema,
  /**
   * select the date and time to sort the order of events. Choose the start time for the event.
   * {"format":"date-time"}
   */
  "day-time": DateSchema,
  /**
   * select the ending time for the event. This is used for breaks/recurring events to show a time window. It's not required or displayed for talks
   * {"format":"date-time"}
   */
  "end-time": DateSchema.optional(),
  /**
   * select the type of event to assign a label
   * {"options":[{"name":"talk","id":"4206976061fcd6327bd12ce6aac856eb"},{"name":"speaker panel","id":"8fc8810c6c61b7e3939280149fc5f84e"},{"name":"workshop","id":"7ccbd551ac994b4489c4fe31ad985120"},{"name":"sponsored","id":"a46728e5ac2795216173113b4cd6d91a"},{"name":"recurring","id":"dd977a70188a93af399ad496d6cf2785"},{"name":"lightning talk","id":"67acc937d6af3a65b7b349a2bec4f701"}]}
   */
  "event-type": OptionSchema.optional(),
  /**
   * select the talk to add details to the schedule unless it's a recurring or sponsored event.
   * {"collectionId":"640a728fc24f8e31ee5fe18e"}
   */
  "talk-2": ItemRefSchema.optional(),
  /**
   * select the workshop to add details to the schedule
   * {"collectionId":"640a728fc24f8e7f635fe187"}
   */
  workshop: ItemRefSchema.optional(),
  /**
   * select the recurrent event type to add details
   * {"collectionId":"640a728fc24f8e85a75fe18c"}
   */
  "recurring-event": ItemRefSchema.optional(),
  /**
   * select the location for the event to display addresses and details on detail pages/screens
   * {"collectionId":"640a728fc24f8e553c5fe18d"}
   */
  location: ItemRefSchema.optional(),
  /**
   * Select speaker for talk, workshop, or panel
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "speaker-3": ItemRefSchema.optional(),
  /**
   * Select a second speaker for a talk, workshop, or panel
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "speaker-2-2": ItemRefSchema.optional(),
  /**
   * Select a third speaker for a talk, workshop, or panel
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "speaker-3-2": ItemRefSchema.optional(),
  /**
   * Select a fourth speaker for a talk, workshop, or panel
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "speaker-4": ItemRefSchema.optional(),
  /**
   * Select a fifth speaker for a talk, workshop, or panel
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "speaker-5": ItemRefSchema.optional(),
  /**
   * Title of singular event that is not recurring, a talk, or a workshop
   * {"singleLine":true}
   */
  "event-title": PlainTextSchema.optional(),
  /**
   * Short description of a single event that is not recurring
   * {"singleLine":false}
   */
  "event-description": PlainTextSchema.optional(),
  /**
   * select a sponsor to add the logo to the event on the schedule.
   * {"collectionId":"640a728fc24f8e73575fe189"}
   */
  "sponsor-for-event": ItemRefSchema.optional(),
  /**
   * Select this option if the sponsor logo is for a callout that is part of a recurring event.
   */
  "sponsor-is-for-a-callout": BoolSchema.optional(),
  /**
   * [for internal CMS use] add a title for the event
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * Can use auto generated URL from entered title
   * {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * Image of logo after resized and compressed for web (under 1 mb)
   */
  logo: ImageRefSchema,
  /**
   * select the sponsorship tier. If it's a repeat sponsorship (more than one year) select the tier from the most recent year. This will not affect page for archived years
   * {"options":[{"name":"Platinum","id":"fe9c5b4d9fc3b0cf366607646cebcb95"},{"name":"Gold","id":"47d258ed5e5d2fe69d35dc685bd37fb9"},{"name":"Silver","id":"c1857a23dee35cbfbb7b694b89d16296"},{"name":"Bronze","id":"44bcdc97a36f741fe7e70aec6a33e936"},{"name":"Other","id":"73853c318edcbdaebc8d603c9bc1b968"}]}
   */
  "sponsor-tier": OptionSchema,
  /**
   * Add the type of sponsorship if the "other" tier option was selected. Ex: coffee, wifi, etc
   * {"singleLine":true,"maxLength":20}
   */
  "sponsorship-type": PlainTextSchema.optional(),
  /**
   * Add a short summary or description, typically an overview of the product, service, or company. This is only displayed for Platinum and Gold tier sponsors on both the website and app
   * {"singleLine":false,"maxLength":220}
   */
  "promo-summary": PlainTextSchema.optional(),
  /**
   * select this option if the sponsor is part of the current conference year. This is used to filter and omit any past sponsors from the list.
   */
  "is-a-current-sponsor": BoolSchema.optional(),
  /**
   * Select this option to feature the sponsor logo in a list of past sponsors on the homepage
   */
  "2020-sponsor": BoolSchema.optional(),
  /**
   * select all years that the company was a sponsor. This includes all tiers and types of sponsorships.
   * {"collectionId":"640a728fc24f8e0bd35fe18b"}
   */
  "conference-years-2": ItemRefSetSchema,
  /**
   * Link to sponsor's official website
   */
  "external-url": LinkSchema.optional(),
  /**
   * Not visible on site, but used to label the entry in the CMS and for the image alt text (accessibility)
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * Can use auto generated url from name entered above.
   * {"maxLength":256,"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * i.e. Developer at Expo
   * {"singleLine":true}
   */
  title: PlainTextSchema.optional(),
  /**
   * {"singleLine":true}
   */
  bio: PlainTextSchema.optional(),
  "speaker-photo-png": ImageRefSchema.optional(),
  /**
   * {"singleLine":true}
   */
  "talk-title": PlainTextSchema.optional(),
  "talk-abstract-3": RichTextSchema.optional(),
  /**
   * {"singleLine":true}
   */
  "session-type": PlainTextSchema.optional(),
  "twitter-url": LinkSchema.optional(),
  "github-url": LinkSchema.optional(),
  "medium-url-2": LinkSchema.optional(),
  "close-anchor": LinkSchema.optional(),
  "next-url": LinkSchema.optional(),
  "previous-url": LinkSchema.optional(),
  /**
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * Enter speakers full name. This is how the speaker's name will appear on the site.
   * {"singleLine":true}
   */
  "speaker-full-name": PlainTextSchema,
  /**
   * The speaker type selected is displayed as a title on the speaker details page.
   * {"options":[{"name":"Speaker","id":"376b3e651a2add845c89ac55f24fbb42"},{"name":"Panelist","id":"59a2964d16a4368df6b8185665784693"},{"name":"Workshop","id":"7e29fb17b938a34aaf42748fd827c80d"},{"name":"Emcee","id":"a2028b30c2bfbc2ceedc536eb668efdd"}]}
   */
  "speaker-type-2": OptionSchema,
  /**
   * The conference year selected is shown on the speaker details page.
   * {"options":[{"name":"2017","id":"4dbc7ad13b451a3f8b233e8cb177f8c5"},{"name":"2018","id":"b086cab784e81ff0d2196148dca77a65"},{"name":"2019","id":"836421e7db03d17931a2334da05bb2ec"},{"name":"2020","id":"ae2695dbb2860a7ff52811b8088fd3c5"}]}
   */
  "conference-year": OptionSchema,
  /**
   * Add the name of the speaker's current company. If more than one, separate by a semicolon. ex: Company One; Company Two
   * {"singleLine":true}
   */
  "company-name": PlainTextSchema,
  /**
   * Link to GitHub profile.
   */
  github: LinkSchema.optional(),
  /**
   * Link to Twitter profile.
   */
  twitter: LinkSchema.optional(),
  /**
   * Link to a personal site (Medium, portfolio, etc)
   */
  website: LinkSchema.optional(),
  /**
   * Name of talk title in sentence case (only proper nouns capitalized.) Ex: Getting started with React Native.
   * {"singleLine":false}
   */
  "talk-title": PlainTextSchema,
  /**
   * Full abstract for talk. Can include bullet points, but no bold, italic, or heading text. Make sure to paste text without formatting (Command + Shift + V)
   */
  "abstract-3": RichTextSchema.optional(),
  /**
   * Add YouTube link to link out to recording.
   */
  "link-to-talk-recording": LinkSchema.optional(),
  /**
   * Optional link to speaker's slides. This will be visible on the speaker details page.
   */
  "link-to-talk-slides": LinkSchema.optional(),
  /**
   * This is not visible on the site. Info entered is used to find the entry within the CMS.
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * Can use url generated from the name & year entered above.
   * {"maxLength":256,"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * Select the level for the workshop. This appears on the cards and the workshop details page.
   * {"options":[{"name":"Beginner","id":"bcb33aac3cd85ef6f2e7a97cf23c9771"},{"name":"Intermediate","id":"e9d1df0d23f4049bd9d1a6fe83c5db01"},{"name":"Advanced","id":"860319fadc9cd03654561fba21490285"},{"name":"Beginner-Intermediate","id":"9ec823420253bd29f312b005681510ac"}]}
   */
  level: OptionSchema,
  /**
   * Add the description for the workshop to show on the details pages/screen on the website and app
   * {"singleLine":false}
   */
  abstract: PlainTextSchema,
  /**
   * 1 sentence callout quote shown on the workshop details page
   * {"singleLine":false}
   */
  "description-quote": PlainTextSchema,
  /**
   * 2-3 sentences. shortened summary of description in the workshop footer section of the details page.
   * {"singleLine":false}
   */
  summary: PlainTextSchema,
  /**
   * list any notable pre-reqs for the workshop, separated by a comma. Leave blank if none.
   * {"singleLine":true}
   */
  "pre-requites": PlainTextSchema.optional(),
  /**
   * select the workshop instructor to add images and details
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "instructor-info": ItemRefSchema,
  /**
   * (optional) add another instructor leading the workshop
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "second-instructor-3": ItemRefSchema.optional(),
  /**
   * Add instructors that will be primarily leading the workshop and not just assisting. This will be used to display instructor details on cards and schedules.
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  "instructor-s-2": ItemRefSetSchema,
  /**
   * (optional) add the names of people that will be assisting the primary instructor(s) but not leading a workshop. This will be used on the workshop details page.
   * {"collectionId":"640a728fc24f8e94385fe188"}
   */
  assistants: ItemRefSetSchema.optional(),
  /**
   * select the current year or the year workshop was given
   * {"options":[{"name":"2023","id":"4f94582394abff4ed4dec0f1a27abf32"},{"name":"2019","id":"96a6b94b94afb3a981dddbfab1e32a31"},{"name":"2018","id":"0b3b05a9f43de273fc88d5b74aa4596e"},{"name":"2017","id":"64ee2179ea49572e201495acdcd77453"}]}
   */
  year: OptionSchema.optional(),
  /**
   * select this option to simplify the info displayed so that the company name is only shown once
   */
  "instructors-are-from-the-same-company": BoolSchema.optional(),
  /**
   * {"singleLine":false}
   */
  "card-list-item-1": PlainTextSchema.optional(),
  /**
   * {"singleLine":false}
   */
  "card-list-item-2": PlainTextSchema.optional(),
  /**
   * {"singleLine":false}
   */
  "card-list-item-3": PlainTextSchema.optional(),
  /**
   * When sales reach 8 or fewer left, add number of tickes remaining for the workshop
   * {"singleLine":true,"maxLength":1}
   */
  "ticket-count": PlainTextSchema.optional(),
  /**
   * When ticket sales reach 8 or fewer, enable to show the remaining count on website
   */
  "show-ticket-count": BoolSchema.optional(),
  /**
   * toggle on to show "sold out" status on the workshop card
   */
  "is-sold-out": BoolSchema.optional(),
  /**
   * Add the full title for the workshop to display across the website and app
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * summary of event shown in the calendar view. This will be the same for each recurring event type. Add another event if the description should be different. (ex: lunch vs coffee break)
   * {"singleLine":false,"maxLength":140}
   */
  "event-description": PlainTextSchema,
  /**
   * Title for a callout during a break for a sponsored event
   * {"singleLine":true}
   */
  "secondary-callout": PlainTextSchema.optional(),
  /**
   * {"singleLine":true}
   */
  "secondary-callout-description": PlainTextSchema.optional(),
  /**
   * select the sponsor to add their logo
   * {"collectionId":"640a728fc24f8e73575fe189"}
   */
  "sponsor-for-secondary-callout-optional": ItemRefSchema.optional(),
  /**
   * Link to a sponsor website, or additional info for a secondary callout
   */
  "secondary-callout-link": LinkSchema.optional(),
  /**
   * use a short, descriptive label for the title. This will be used as the card label on the schedule.
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * This is used for label of bio section, ex: About [First Name]
   * {"singleLine":true}
   */
  "speaker-first-name": PlainTextSchema.optional(),
  /**
   * {"options":[{"name":"Speaker","id":"97dae28f90a767132ee88e80a8537af8"},{"name":"Panelist","id":"079e51435c82a91426f9c3acc7b0343a"},{"name":"Workshop","id":"f23ef92d0cef6be6fd60654d54770c96"},{"name":"Emcee","id":"07948ce9361d13f707fdb4e663cbe9a5"}]}
   */
  "speaker-type": OptionSchema,
  /**
   * Edited photo of speaker after compressed for web (small file size under 1 mb)
   */
  "speaker-photo": ImageRefSchema.optional(),
  /**
   * ex. Software Developer
   * {"singleLine":true}
   */
  title: PlainTextSchema.optional(),
  /**
   * Name of current company
   * {"singleLine":true}
   */
  company: PlainTextSchema.optional(),
  /**
   * Link to twitter profile
   */
  twitter: LinkSchema.optional(),
  /**
   * Link to GitHub profile.
   */
  github: LinkSchema.optional(),
  /**
   * Link to a personal website (Medium, portfolio, etc)
   */
  website: LinkSchema.optional(),
  /**
   * Paragraph format for speaker bio. This will not include any formatting or line breaks (single paragraph only).
   * {"singleLine":false}
   */
  "speaker-bio": PlainTextSchema.optional(),
  /**
   * select this option to add the speaker to the current year's conference. This will add them to the homepage and/or talks pages.
   */
  "is-a-current-speaker": BoolSchema.optional(),
  /**
   * select the talk(s) given. Talks for previous years will be shown on past conference pages.
   * {"collectionId":"640a728fc24f8e31ee5fe18e"}
   */
  "talk-s": ItemRefSetSchema.optional(),
  /**
   * select workshops led by the speaker. Previous workshops will be shown on past conference pages.
   * {"collectionId":"640a728fc24f8e7f635fe187"}
   */
  "workshop-s": ItemRefSetSchema.optional(),
  /**
   * Leave this field blank. This is used to connect to other CMSs
   */
  "talk-details-url": LinkSchema.optional(),
  /**
   * This will be used to display the speaker's name on the website.
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * Can use auto generated slug (url name) from speaker's name
   * {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
  /**
   * copy ID from embed code
   * {"singleLine":true}
   */
  "eventbrite-id": PlainTextSchema.optional(),
  /**
   * {"maxLength":256}
   */
  name: PlainTextSchema,
  /**
   * {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}}
   */
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
