import {
  RawRecommendationsSchema,
  RawRecurringEventsSchema,
  RawScheduledEventSchema,
  RawSpeakerNameSchema,
  RawSpeakerSchema,
  RawSponsorSchema,
  RawTalkSchema,
  RawVenueSchema,
  RawWorkshopSchema,
} from "./webflow-api.types"

export const SITE_ID = "5ca38f35db5d2ea94aea469d"

export const SPONSORS = {
  collectionId: "640a728fc24f8e73575fe189",
  key: "sponsors",
  schema: RawSponsorSchema,
} as const

export const SPEAKERS = {
  collectionId: "640a728fc24f8e94385fe188",
  key: "speakers",
  schema: RawSpeakerSchema,
} as const

export const SPEAKER_NAMES = {
  collectionId: "640a728fc24f8e74d05fe18a",
  key: "speakerNames",
  schema: RawSpeakerNameSchema,
} as const

export const WORKSHOPS = {
  collectionId: "640a728fc24f8e7f635fe187",
  key: "workshops",
  schema: RawWorkshopSchema,
} as const

export const SCHEDULE = {
  collectionId: "640a728fc24f8e63325fe185",
  key: "schedule",
  schema: RawScheduledEventSchema,
} as const

export const PAST_TALKS = {
  collectionId: "640a728fc24f8e76ef5fe186",
  key: "pastTalks",
  schema: RawTalkSchema,
} as const

export const RECURRING_EVENTS = {
  collectionId: "640a728fc24f8e85a75fe18c",
  key: "recurringEvents",
  schema: RawRecurringEventsSchema,
} as const

export const TALKS = {
  collectionId: "640a728fc24f8e31ee5fe18e",
  key: "talks",
  schema: RawTalkSchema,
} as const

export const VENUES = {
  collectionId: "640a728fc24f8e553c5fe18d",
  key: "venues",
  schema: RawVenueSchema,
} as const

export const RECOMMENDATIONS = {
  collectionId: "640a728fc24f8e083b5fe18f",
  key: "recommendations",
  schema: RawRecommendationsSchema,
} as const

export const COLLECTIONS_MAP = {
  [SPONSORS.key]: SPONSORS,
  [SPEAKERS.key]: SPEAKERS,
  [SPEAKER_NAMES.key]: SPEAKER_NAMES,
  [WORKSHOPS.key]: WORKSHOPS,
  [SCHEDULE.key]: SCHEDULE,
  [PAST_TALKS.key]: PAST_TALKS,
  [RECURRING_EVENTS.key]: RECURRING_EVENTS,
  [TALKS.key]: TALKS,
  [VENUES.key]: VENUES,
  [RECOMMENDATIONS.key]: RECOMMENDATIONS,
} as const

export type CollectionKey = keyof typeof COLLECTIONS_MAP
export type CollectionId = (typeof COLLECTIONS_MAP)[CollectionKey]["collectionId"]

// [NOTE] these keys probably have to change when webflow is updated
// `/collections/${collectionId}` api will the keys
export const WEBFLOW_MAP = {
  workshopLevel: {
    bcb33aac3cd85ef6f2e7a97cf23c9771: "Beginner",
    e9d1df0d23f4049bd9d1a6fe83c5db01: "Intermediate",
    "860319fadc9cd03654561fba21490285": "Advanced",
    "9ec823420253bd29f312b005681510ac": "Beginner-Intermediate",
  },
  workshopType: {
    d9770c43cd59f01f2d60b288d65c1f90: "New",
    c8af4236d64f5c25c09e61e4633badb0: "Top Seller",
  },
  speakersType: {
    "97dae28f90a767132ee88e80a8537af8": "Speaker",
    "079e51435c82a91426f9c3acc7b0343a": "Panelist",
    f23ef92d0cef6be6fd60654d54770c96: "Workshop",
    "07948ce9361d13f707fdb4e663cbe9a5": "Emcee",
  },
  speakersTalk: {
    "2f3097a3529a99ed4d688e9ce05034d6": "Beginner",
    "33984dd1db455114d65e3bd9989f4fad": "Intermediate",
    ce1ba34575f5a7e30ba9c4f3c33c8211: "Advanced",
  },
  scheduleDay: {
    "63ac4ade8b2d5a981780570e01bed34d": "Wednesday",
    ed2cfa99e27dce5d1a425a419f170eb3: "Thursday",
    "2e399bc3": "Friday",
  },
  scheduleType: {
    "4206976061fcd6327bd12ce6aac856eb": "Talk",
    "8fc8810c6c61b7e3939280149fc5f84e": "Speaker Panel",
    dd977a70188a93af399ad496d6cf2785: "Recurring",
    b2f17244cf6bd0782c2a099568169219: "Party",
    "7ccbd551ac994b4489c4fe31ad985120": "Workshop",
    a46728e5ac2795216173113b4cd6d91a: "Sponsored",
    "67acc937d6af3a65b7b349a2bec4f701": "Lightning Talk",
  },
  recurringEventType: {
    "63b8a530a5f15f0d26539f07": "Check-in & Registration",
    "63b8a5a76623c60c4e72db89": "Morning Break",
    "63b8a5e54f99644c1c457253": "Lunch Break",
    "63b8a62fcfc084793e4d5b60": "Afternoon Break",
  },
  talkType: {
    "38ba1361ae664a13e4a03f20ae153dc8": "Talk",
    e66d50161e7027f9c8646ac4ec9c02a9: "Speaker Panel",
    "3aa9ece8012afed5d4e548180b2713e0": "Emcee",
  },
  location: {
    "63b8a958a5f15f379953e0da": "Courtyard Portland City Center",
    "63b8a865e6b85e71b453fd3d": "The Armory",
  },
  venueTag: {
    cf3d319cdaa0e6787b03ab94e74e3b8e: "Workshop",
    d098b6fc74f6c55c6084ea42c385e7f6: "Conference",
    "6157eba78b067d800ea4cfd5188e782f": "After Party",
  },
  sponsorTier: {
    fe9c5b4d9fc3b0cf366607646cebcb95: "Platinum",
    "47d258ed5e5d2fe69d35dc685bd37fb9": "Gold",
    c1857a23dee35cbfbb7b694b89d16296: "Silver",
    "44bcdc97a36f741fe7e70aec6a33e936": "Bronze",
    "73853c318edcbdaebc8d603c9bc1b968": "Other",
  },
  recommendationType: {
    "3541dc4db3502b41c75043518060800d": "Food/Drink",
    a5028d71ed9c315a6e9fa67778f2579d: "SightSee",
    f42e3ac1a464004c28d91ddf3945b654: "Unique/to/Portland",
  },
} as const
