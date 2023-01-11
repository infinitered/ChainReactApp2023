export const SITE_ID = "5ca38f35db5d2ea94aea469d"

export const SPONSORS = {
  collectionId: "6362b046e69e80645c361104",
  key: "sponsors",
}

export const SPEAKERS = {
  collectionId: "6362b046e69e802c58361103",
  key: "speakers",
}

export const SPEAKER_NAMES = {
  collectionId: "6362b046e69e8079f9361101",
  key: "speakerNames",
}

export const WORKSHOPS = {
  collectionId: "6362b046e69e800c2c361100",
  key: "workshops",
}

export const SCHEDULE = {
  collectionId: "6362b046e69e80096f361102",
  key: "schedule",
}

export const PAST_TALKS = {
  collectionId: "6362b046e69e8009ce361105",
  key: "pastTalks",
}

// [NOTE] these keys probably have to change when webflow is updated
// `/collections/${collectionId}` api will the keys
export const WEBFLOW_MAP = {
  workshopLevel: {
    bcb33aac3cd85ef6f2e7a97cf23c9771: "Beginner",
    e9d1df0d23f4049bd9d1a6fe83c5db01: "Intermediate",
    "860319fadc9cd03654561fba21490285": "Advanced",
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
    "976a2eee2ab173440affe93d0a20bf4d": "Talk",
    c728019fbbce26cc72918695f31e7d4d: "Speaker Panel",
    dd977a70188a93af399ad496d6cf2785: "Recurring",
    b2f17244cf6bd0782c2a099568169219: "Party",
    "7ccbd551ac994b4489c4fe31ad985120": "Workshop",
    // add sponsored here
  },
}
