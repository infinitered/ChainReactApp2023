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
  VenueScreen: {
    title: "Venue",
    conferenceAndWorkshopVenues: "Conference and workshop venues",
    thanksToThisYearsSponsors: "Thanks to this year's sponsors",
  },
}

export default en
export type Translations = typeof en
