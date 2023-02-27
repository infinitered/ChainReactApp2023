import { ScheduleCardProps } from "../../screens/ScheduleScreen/ScheduleCard"
import { formatDate, sortByTime } from "../../utils/formatDate"
import type {
  RawScheduledEvent,
  RawSpeaker,
  RawSponsor,
  RawTalk,
  RawWorkshop,
  RecurringEvents,
  ScheduledEvent,
  Speaker,
  Sponsor,
  Talk,
  Workshop,
} from "./webflow-api.types"
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
  scheduledEvents?: RawScheduledEvent[]
  speakers?: Speaker[]
  workshops?: Workshop[]
  talks?: Talk[]
  recurringEvents?: RecurringEvents[]
}): ScheduledEvent[] => {
  return scheduledEvents
    ?.filter((schedule) => !schedule._archived && !schedule._draft)
    .map((schedule) => ({
      ...schedule,
      location: WEBFLOW_MAP.location[schedule.location],
      "recurring-event": recurringEvents?.find(({ _id }) => _id === schedule["recurring-event"]),
      "speaker-2": speakers?.find(({ _id }) => _id === schedule["speaker-2"]),
      day: WEBFLOW_MAP.scheduleDay[schedule.day] ?? WEBFLOW_MAP.scheduleDay["2e399bc3"],
      talk: talks?.find((talk) => talk._id === schedule["talk-2"]),
      type: WEBFLOW_MAP.scheduleType[schedule["event-type"]],
      workshop: workshops?.find(({ _id }) => _id === schedule.workshop),
    }))
}

/*
 * Converting speakers data from "type ids" to "type names"
 */
export const cleanedSpeakers = (speakersData?: RawSpeaker[]): Speaker[] => {
  return speakersData?.map(cleanedSpeaker)
}

export const cleanedSpeaker = (speaker?: RawSpeaker): Speaker | null => {
  if (!speaker) return null
  return {
    ...speaker,
    "speaker-type": WEBFLOW_MAP.speakersType[speaker["speaker-type"]],
    "talk-level": WEBFLOW_MAP.speakersTalk[speaker["talk-level"]],
  }
}

export const cleanedSponsors = (sponsorsData?: RawSponsor[]): Sponsor[] => {
  return sponsorsData?.filter((s) => s["is-a-current-sponsor"]).map(cleanedSponsor)
}

export const cleanedSponsor = (sponsor?: RawSponsor): Sponsor | null => {
  if (!sponsor) return null
  return {
    ...sponsor,
    "sponsor-tier": WEBFLOW_MAP.sponsorTier[sponsor["sponsor-tier"]],
  }
}

export const cleanedTalks = ({
  speakers,
  talks,
}: {
  speakers?: RawSpeaker[]
  talks?: RawTalk[]
}): Talk[] => {
  return talks?.map((talk) => ({
    ...talk,
    "talk-type": WEBFLOW_MAP.talkType[talk["talk-type"]],
    "speaker-s": talk["speaker-s"].map((speakerId) =>
      cleanedSpeaker(speakers?.find(({ _id }) => _id === speakerId)),
    ),
  }))
}

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const cleanedWorkshops = (
  workshopsData?: RawWorkshop[],
  speakersData?: Speaker[],
): Workshop[] => {
  return workshopsData
    ?.filter((workshop) => !workshop._archived && !workshop._draft)
    .map((workshop) => ({
      ...workshop,
      level: WEBFLOW_MAP.workshopLevel[workshop.level],
      "instructor-info": speakersData?.find(
        (speaker) => speaker._id === workshop["instructor-info"],
      ),
      "instructor-s-2": workshop?.["instructor-s-2"]?.map((id) =>
        speakersData?.find((speaker) => speaker._id === id),
      ),
      assistants: workshop?.assistants?.map((id) =>
        speakersData?.find((speaker) => speaker._id === id),
      ),
    }))
}

/*
 * Converting workshop data from "type ids" to "type names"
 */
const convertScheduleToCardProps = (schedule: ScheduledEvent): ScheduleCardProps => {
  switch (schedule.type) {
    case "Recurring":
      return {
        variant: "recurring",
        formattedStartTime: formatDate(
          schedule["day-time"],
          schedule["end-time"] ? "h:mm" : "h:mm aaa",
        ),
        startTime: schedule["day-time"],
        formattedEndTime: schedule["end-time"] && formatDate(schedule["end-time"], "h:mm aaa"),
        eventTitle: schedule["recurring-event"]?.name,
        heading: "",
        subheading: schedule["recurring-event"]?.["event-description"],
        sources: [],
        id: schedule._id,
      }
    case "Party":
      return {
        variant: "party",
        formattedStartTime: formatDate(schedule["day-time"], "h:mm aaa"),
        startTime: schedule["day-time"],
        eventTitle: "party",
        heading: schedule.name,
        subheading: schedule["break-party-description"],
        sources: [],
        id: schedule._id,
      }
    case "Talk":
      return {
        variant: "talk",
        formattedStartTime: formatDate(schedule["day-time"], "h:mm aaa"),
        startTime: schedule["day-time"],
        eventTitle: schedule.type,
        heading: schedule.talk?.["speaker-s"]?.map((s) => s.name).join(", ") ?? "",
        subheading: schedule.talk?.name,
        sources: schedule.talk?.["speaker-s"]?.map((s) => s["speaker-photo"].url) ?? [],
        id: schedule._id,
        talkUrl: schedule.talk["talk-url"],
      }
    case "Speaker Panel":
      return {
        variant: "speaker-panel",
        formattedStartTime: formatDate(schedule["day-time"], "h:mm aaa"),
        startTime: schedule["day-time"],
        eventTitle: schedule.type,
        heading: schedule.talk?.["speaker-s"]?.map((s) => s.name).join(", ") ?? "",
        subheading: "",
        sources: schedule.talk?.["speaker-s"]?.map((s) => s["speaker-photo"].url) ?? [],
        id: schedule._id,
        talkUrl: schedule.talk?.["talk-url"],
      }
    case "Workshop":
      // eslint-disable-next-line no-case-declarations
      const workshop = schedule.workshop
      return {
        variant: "workshop",
        formattedStartTime: formatDate(schedule["day-time"], "h:mm aaa"),
        startTime: schedule["day-time"],
        eventTitle: "workshop",
        heading: workshop?.name,
        subheading: workshop?.["instructor-info"]?.name,
        sources: [workshop?.["instructor-info"]?.["speaker-photo"].url],
        level: workshop?.level,
        id: schedule._id,
      }
  }
}

// [NOTE] util function that might be needed in the future
export const convertScheduleToScheduleCard = (
  scheduleData: ScheduledEvent[],
  day: string,
): ScheduleCardProps[] => {
  const daySchedule: ScheduledEvent[] = groupBy("day")(scheduleData ?? [])?.[day] ?? []
  return daySchedule.sort(sortByTime).map(convertScheduleToCardProps)
}

// [NOTE] util function that might be needed in the future
export const groupBy =
  (key: string) =>
  <T>(array: T[]) =>
    array.reduce(
      (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj),
      }),
      {},
    )
