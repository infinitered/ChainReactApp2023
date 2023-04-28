const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    comingSoon: "Coming soon",
  },
  welcomeScreen: {
    heading: "Welcome to Chain React!",
    topBlurb:
      "Welcome to the 4th annual React Native Conference! This app is your official companion for all things Chain React.\n\nYou can do it all in the app: View the schedule, find directions to the afterparty, or even recommendations to grab food. It's all here in the app!",
    bottomBlurb: "Let's Get Started",
    scheduleButton: "See the schedule",
  },
  errorScreen: {
    title: "Oh, bother!",
    friendlySubtitle:
      "Bugs happen to the best of us! Try resetting or restarting the app and see if that helps. If not, feel free to file an issue on GitHub and our team of highly-trained llamas will look into it. Bonus points: Find the bug and open a PR!",
    reset: "Reset",
    githubButton: "Go to GitHub",
  },
  debugScreen: {
    title: "Debug Info",
    pushToken: "FCM Token",
    resetState: "Reset App State",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  exploreScreen: {
    title: "Explore",
    nearbyFoodAndDrink: "Nearby food and drink",
    sightSee: "Things to see",
    uniqueToPortland: "Unique to Portland",
    openInMaps: "Open in maps",
    website: "Website",
    wantToSeeMore: "Want to see more places? Open this map!",
  },
  tabNavigator: {
    scheduleTab: "Schedule",
    venuesTab: "Venues",
    exploreTab: "Explore",
    infoTab: "Info",
    chatTab: "AI Chat",
  },
  chatScreen: {
    title: "AI Chat (experimental)",
    reset: "Clear",
  },
  venuesScreen: {
    title: "Venues",
    openInMaps: "Open in maps",
  },
  infoScreen: {
    title: "Info",
    contactUsTitle: "Contact Us",
    screenHeading: "Chain React - Hosted by Infinite Red",
    moreAboutIR: "More about Infinite Red",
    aboutTitle: "About Chain React",
    about:
      "Since 2017, people have attended Chain React to learn from the biggest names and companies in React Native.\n\nChain React is hosted by the team at Infinite Red.\n\nReact Native is central to everything Infinite Red creates, shares, and contributes to the community. As one of the most popular React Native consultancies, their team helps companies like GasBuddy, Zoom, and Microsoft on their most important projects.\n\nInfinite Red also hosts the React Native Radio podcast, maintains Ignite (the most popular boilerplate for Expo and React Native), and writes the React Native Newsletter.",
    emailLink: "Email our team",
    conductWarning:
      "All attendees, speakers, sponsors and volunteers at our conference are required to agree with the following code of conduct. Organizers will enforce this code throughout the event. We expect cooperation from all participants to help ensure a safe environment for everybody.",
    codeOfConductHeaderTitle: "Code of Conduct",
    codeOfConductTitle: "Our Code of Conduct Policy",
    codeOfConduct:
      "Our conference is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not appropriate for any conference venue, including talks, workshops, parties, Twitter and other online media. Conference participants violating these rules may be sanctioned or expelled from the conference without a refund at the discretion of the conference organizers.",
    extraDetailsTitle: "Extra Details",
    extraDetails:
      "Harassment includes offensive verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity religion, technology choices, sexual images in public spaces, deliberate intimidation, stalking following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention. Participants asked to stop any harassing behavior are expected to comply immediately. Sponsors are also subject to the anti-harassment policy. In particular, sponsors should not use sexualised images, activities, or other material. Booth staff (including volunteers) should not use sexualised clothing/uniforms/costumes, or otherwise create a sexualised environment. If a participant engages in harassing behavior, the conference organisers may take any action they deem appropriate, including warning the offender or expulsion from the conference with no refund. If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of conference staff immediately. Conference staff can be identified as they'll be wearing branded clothing and/or badges. Conference staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing harassment to feel safe for the duration of the conference. We value your attendance. We expect participants to follow these rules at conference and workshop venues and conference-related social events.",
    reportingIncidentTitle: "Report an Incident",
    reportingIncidentPart1:
      "If you have a question, or experience a situation that makes you feel unsafe, please don't hesitate to reach out to us at ",
    reportingIncidentPart2:
      ".\n\nWhen submitting a report, please include as much information as you feel comfortable sharing. We take all reports seriously.",
    emailUs: "Email us",
    haveQuestions: "Have Questions? Send Us a Message",
    reachOut: "Reach out to our team at ",
    ourSponsorsTitle: "Our Sponsors",
    thanksToThisYearsSponsors: "Thanks to this year's sponsors",
    platinumSponsor: "Platinum Sponsor",
    goldSponsor: "Gold Sponsor",
    silverSponsor: "Silver Sponsors",
    bronzeSponsor: "Bronze Sponsors",
    creditsTitle: "Credits",
    creditsHeading: "Special Thanks To",
  },
  talkDetailsScreen: {
    watchTalk: "Watch talk",
    assistingTheWorkshop: "Assisting the workshop",
  },
  workshopDetailsScreen: {
    instructor: {
      one: "Instructor",
      other: "Instructors",
    },
  },
  scheduleScreen: {
    talkRecordingPosted: "Talk recording posted",
    videoComingSoon: "Video coming soon",
    workshopBanner: "Events for workshop ticket-holders",
  },
  breakDetailsScreen: {
    description:
      "Hosted upstairs in the mezzanine, TestDouble will be providing coffee and pair programming in a friendly cafe experience. Bring your toughest code problems, grab a coffee, and visit us for Coffee & Code!",
    location: "Upstairs mezzanine",
    hostedBy: "Hosted by",
    locationLabel: "Location",
    moreInfo: "More info",
  },
  ota: {
    title: "Update Available",
    subtitle:
      "Good things come to those who update! Check out the newest version of our app! Blame Jamon for any bugs!",
    cancelLabel: "Maybe Later",
    confirmLabel: "Update",
    confirmLabelUpdating: "Updating...",
  },
}

export default en
export type Translations = typeof en
