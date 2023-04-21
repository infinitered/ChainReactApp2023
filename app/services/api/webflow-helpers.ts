import type { ScheduleCardProps } from "../../screens/ScheduleScreen/ScheduleCard"
import { formatDate, sortByTime } from "../../utils/formatDate"
import { groupBy } from "../../utils/groupBy"
import type { ScheduledEvent, Workshops } from "./webflow-api"
import type {
  RecurringEventsCollection,
  ScheduledeventsCollection,
  SpeakersCollection,
  SponsorsCollection,
  TalksCollection,
} from "./webflow-api.generated"
import { WEBFLOW_MAP } from "./webflow-consts"

/*
 * Converting schedule data from "type ids" to "type names"
 */
export const cleanedSchedule = ({
  scheduledEvents,
  speakers,
  workshops,
  talks,
  recurringEvents,
}: {
  scheduledEvents?: ScheduledeventsCollection[]
  speakers?: CleanedSpeakers
  workshops?: CleanedWorkshops
  talks?: CleanedTalks
  recurringEvents?: RecurringEventsCollection[]
}) => {
  return scheduledEvents
    ?.filter((schedule) => !schedule._archived && !schedule._draft)
    .map((schedule) => {
      const isTriviaShow = schedule["event-title"] === WEBFLOW_MAP.triviaShow.title
      return {
        ...schedule,
        location: WEBFLOW_MAP.location[schedule.location ?? ""],
        "recurring-event": recurringEvents?.find((s) => s?._id === schedule["recurring-event"]),
        "speaker-2": speakers?.find((s) => s?._id === schedule["speaker-2"]),
        "speaker-3": speakers?.find((s) => s?._id === schedule["speaker-3"]),
        "speaker-2-2": speakers?.find((s) => s?._id === schedule["speaker-2-2"]),
        "speaker-3-2": speakers?.find((s) => s?._id === schedule["speaker-3-2"]),
        day: WEBFLOW_MAP.scheduleDay[schedule.day] ?? WEBFLOW_MAP.scheduleDay["2e399bc3"],
        talk: talks?.find((talk) => talk._id === schedule["talk-2"]),
        type: isTriviaShow
          ? WEBFLOW_MAP.triviaShow.title
          : WEBFLOW_MAP.scheduleType[schedule["event-type"] ?? ""],
        workshop: workshops?.find(({ _id }) => _id === schedule.workshop),
      }
    })
}

export type CleanedSchedule = ReturnType<typeof cleanedSchedule>

/*
 * Converting speakers data from "type ids" to "type names"
 */
export const cleanedSpeakers = (speakersData?: SpeakersCollection[]) => {
  return speakersData?.map(cleanedSpeaker)
}

export type CleanedSpeakers = ReturnType<typeof cleanedSpeakers>

export const cleanedSpeaker = (speaker?: SpeakersCollection) => {
  if (!speaker) return null

  const speakerType: string | undefined = WEBFLOW_MAP.speakersType[speaker["speaker-type"]]
  if (typeof speakerType === "undefined") {
    return null
  }

  return {
    ...speaker,
    "speaker-type": speakerType,
  }
}

export type CleanedSpeaker = ReturnType<typeof cleanedSpeaker>

export const cleanedSponsors = (sponsorsData?: SponsorsCollection[]) => {
  return sponsorsData?.filter((s) => s["is-a-current-sponsor"]).map(cleanedSponsor)
}

export const cleanedSponsor = (sponsor?: SponsorsCollection) => {
  if (!sponsor) return null
  return {
    ...sponsor,
    "sponsor-tier": WEBFLOW_MAP.sponsorTier[sponsor["sponsor-tier"]],
  }
}

export type CleanedSponsor = ReturnType<typeof cleanedSponsor>

export const cleanedTalks = ({
  speakers,
  talks,
}: {
  speakers?: SpeakersCollection[]
  talks?: TalksCollection[]
}) => {
  return talks
    ?.filter((talk) => !talk._archived && !talk._draft)
    .map((talk) => ({
      ...talk,
      "talk-type": WEBFLOW_MAP.talkType[talk["talk-type"]],
      "speaker-s": talk["speaker-s"]
        .map((speakerId) =>
          cleanedSpeaker(
            speakers
              ?.filter((speaker) => !speaker._archived && !speaker._draft)
              .find(({ _id }) => _id === speakerId),
          ),
        )
        .filter(Boolean),
    }))
}

export type CleanedTalks = ReturnType<typeof cleanedTalks>

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const cleanedWorkshops = (workshopsData?: Workshops, speakersData?: CleanedSpeakers) => {
  return workshopsData
    ?.filter((workshop) => !workshop._archived && !workshop._draft)
    .map((workshop) => ({
      ...workshop,
      level: WEBFLOW_MAP.workshopLevel[workshop.level],
      "instructor-info": speakersData?.find(
        (speaker) => speaker?._id === workshop["instructor-info"],
      ),
      "second-instructor-3": speakersData?.find(
        (speaker) => speaker?._id === workshop["second-instructor-3"],
      ),
      "instructor-s-2": workshop?.["instructor-s-2"]?.map((id) =>
        speakersData?.find((speaker) => speaker?._id === id),
      ),
      assistants: workshop?.assistants?.map((id) =>
        speakersData?.find((speaker) => speaker?._id === id),
      ),
    }))
}

export type CleanedWorkshops = ReturnType<typeof cleanedWorkshops>

/*
 * Converting workshop data from "type ids" to "type names"
 */
const convertScheduleToCardProps = (schedule: ScheduledEvent): ScheduleCardProps => {
  switch (schedule.type) {
    case "Sponsored":
      return {
        variant: "recurring",
        formattedStartTime: formatDate(schedule["day-time"], "h:mmaaa"),
        startTime: schedule["day-time"],
        sources: [],
        eventTitle: schedule.name,
        subheading: schedule["event-description"],
        id: schedule._id,
      }
    case "Recurring":
      // eslint-disable-next-line no-case-declarations
      const isTheSameTime = schedule["day-time"] === schedule["end-time"]
      return {
        variant: "recurring",
        formattedStartTime: formatDate(
          schedule["day-time"],
          schedule["end-time"] && !isTheSameTime ? "h:mm" : "h:mmaaa",
        ),
        startTime: schedule["day-time"],
        formattedEndTime:
          schedule["end-time"] && !isTheSameTime && formatDate(schedule["end-time"], "h:mmaaa"),
        eventTitle: schedule["recurring-event"]?.name ?? schedule["event-title"] ?? schedule.name,
        heading:
          schedule["recurring-event"]?.["speaker-s"]?.map((s) => s.name).join(", ") ??
          schedule["speaker-3"]?.name ??
          "",
        subheading: schedule["recurring-event"]?.["event-description"],
        sources: schedule["speaker-3"] ? [schedule["speaker-3"]["speaker-photo"].url] : [],
        id: schedule._id,
      }
    case "Party":
      return {
        variant: "party",
        formattedStartTime: formatDate(schedule["day-time"], "h:mmaaa"),
        startTime: schedule["day-time"],
        eventTitle: "party",
        heading: schedule.name,
        subheading: schedule["break-party-description"],
        sources: [],
        id: schedule._id,
      }
    case "Trivia Show":
    case "Lightning Talk":
    case "Talk":
      // eslint-disable-next-line no-case-declarations
      const isTriviaShow = schedule.type === WEBFLOW_MAP.triviaShow.title
      // eslint-disable-next-line no-case-declarations
      const baseItems = {
        formattedStartTime: formatDate(schedule["day-time"], "h:mmaaa"),
        startTime: schedule["day-time"],
        heading: schedule.talk?.["speaker-s"]?.map((s) => s.name).join(", ") ?? "",
        sources: schedule.talk?.["speaker-s"]?.map((s) => s["speaker-photo"]?.url) ?? [],
        id: schedule._id,
        talkUrl: schedule.talk?.["talk-url"],
        variant: "talk",
        eventTitle: schedule.type,
        subheading: schedule.talk?.name,
      } as ScheduleCardProps
      if (isTriviaShow) {
        baseItems.variant = WEBFLOW_MAP.triviaShow.variant
        baseItems.eventTitle = WEBFLOW_MAP.triviaShow.title
        baseItems.subheading = schedule["event-description"]
        baseItems.sources = [
          schedule["speaker-2-2"]?.["speaker-photo"].url,
          schedule["speaker-3"]?.["speaker-photo"].url,
          schedule["speaker-3-2"]?.["speaker-photo"].url,
        ].filter(Boolean)
        baseItems.heading = [
          schedule["speaker-2-2"]?.name,
          schedule["speaker-3"]?.name,
          schedule["speaker-3-2"]?.name,
        ]
          .filter(Boolean)
          .join(", ")
      }
      return baseItems
    case "Speaker Panel":
      return {
        variant: "speaker-panel",
        formattedStartTime: formatDate(schedule["day-time"], "h:mmaaa"),
        startTime: schedule["day-time"],
        eventTitle: schedule.type,
        heading: schedule.talk?.["speaker-s"]?.map((s) => s.name).join(", ") ?? "",
        subheading: "",
        sources: schedule.talk?.["speaker-s"]?.map((s) => s["speaker-photo"]?.url) ?? [],
        id: schedule._id,
        talkUrl: schedule.talk?.["talk-url"],
      }
    case "Workshop":
      // eslint-disable-next-line no-case-declarations
      const workshop = schedule.workshop
      return {
        variant: "workshop",
        formattedStartTime: formatDate(
          schedule["day-time"],
          schedule["end-time"] ? "h:mm" : "h:mmaaa",
        ),
        formattedEndTime: schedule["end-time"] && formatDate(schedule["end-time"], "h:mmaaa"),
        startTime: schedule["day-time"],
        eventTitle: "workshop",
        heading: workshop?.name,
        subheading:
          workshop?.["instructor-s-2"]?.map((instructor) => instructor.name).join(", ") ??
          workshop?.["instructor-info"]?.name,
        sources:
          workshop?.["instructor-s-2"]?.map((instructor) => instructor["speaker-photo"].url) ?? [],
        level: workshop?.level,
        id: schedule._id,
      }
    default:
      throw new Error(`Unknown schedule type '${schedule.type}' for event '${schedule.name}'`)
  }
}

// [NOTE] util function that might be needed in the future
export const convertScheduleToScheduleCard = (
  scheduleData: ScheduledEvent[],
  day: string,
): ScheduleCardProps[] => {
  // 1. Get the schedule for the current day
  const groupByDay = groupBy("day")
  const schedules = groupByDay(scheduleData ?? [])
  const daySchedule: ScheduledEvent[] = schedules[day] ?? []
  // 2. Sort the schedule by time
  const sortedSchedule: ScheduledEvent[] = daySchedule.sort((a, b) =>
    // weird issue with Zod where array properties are set to optional when strict: true is not set in tsconfig.json
    // https://stackoverflow.com/questions/71185664/why-does-zod-make-all-my-schema-fields-optional
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sortByTime(a["day-time"]!, b["day-time"]!),
  )

  // 3. Convert the schedule to card props
  return sortedSchedule.map(convertScheduleToCardProps).filter(Boolean)
}
