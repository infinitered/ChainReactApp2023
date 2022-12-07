const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    heading: "Welcome to Chain React 2023",
    topBlurb:
      "Yay! You're here! It's been a while, but glad you could join us. Get all the details for workshops, talks, and events right here.",
    bottomBlurb: "And if you're sticking around for a bit, we've added some places to explore.",
    scheduleButton: "See the schedule",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  tabNavigator: {
    scheduleTab: "Schedule",
    venueTab: "Venue",
    exploreTab: "Explore",
    infoTab: "Info",
  },
  venueScreen: {
    title: "Venue",
    conferenceAndWorkshopVenues: "Conference and workshop venues",
    thanksToThisYearsSponsors: "Thanks to this year's sponsors",
    platinumSponsor: "Platinum Sponsor",
    goldSponsor: "Gold Sponsor",
    silverSponsor: "Silver Sponsors",
    bronzeSponsor: "Bronze Sponsors",
  },
  infoScreen: {
    title: "Info",
    screenHeading: "Hosted by the Infinite Red team",
    aboutTitle: "About Chain React",
    about:
      "Sometimes called the “Fifth Quadrant,” North Portland encompasses a range of neighborhoods and commercial districts. Some places to visit or things to see include: St John’s Bridge, Cathedral Park, or shopping and dining on Mississippi",
    emailLink: "Email our team",
    conductWarning:
      "All attendees, speakers, sponsors and volunteers at our conference are required to agree with the following code of conduct. Organizers will enforce this code throughout the event. We expect cooperation from all participants to help ensure a safe environment for everybody.",
    codeOfConductTitle: "Our Code of Conduct Policy",
    codeOfConduct:
      "Our conference is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not appropriate for any conference venue, including talks, workshops, parties, Twitter and other online media. Conference participants violating these rules may be sanctioned or expelled from the conference without a refund at the discretion of the conference organizers.",
    extraDetailsTitle: "Extra Details",
    extraDetails:
      "Harassment includes offensive verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity religion, technology choices, sexual images in public spaces, deliberate intimidation, stalking following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention. Participants asked to stop any harassing behavior are expected to comply immediately. Sponsors are also subject to the anti-harassment policy. In particular, sponsors should not use sexualised images, activities, or other material. Booth staff (including volunteers) should not use sexualised clothing/uniforms/costumes, or otherwise create a sexualised environment. If a participant engages in harassing behavior, the conference organisers may take any action they deem appropriate, including warning the offender or expulsion from the conference with no refund. If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of conference staff immediately. Conference staff can be identified as they'll be wearing branded clothing and/or badges. Conference staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing harassment to feel safe for the duration of the conference. We value your attendance. We expect participants to follow these rules at conference and workshop venues and conference-related social events.",
    reportingIncidentTitle: "Reporting an Incident",
    reportingIncidentPart1:
      "If you have a question, or experience a situation that makes you feel unsafe, please don't hesitate to reach out to us at ",
    reportingIncidentPart2:
      ".\n\nWhen submitting a report, please include as much information as you feel comfortable sharing. We take all reports seriously.",
  },
}

export default en
export type Translations = typeof en
