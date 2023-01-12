import { Schedule } from "../../screens"
import { ScheduleCardProps } from "../../screens/ScheduleScreen/ScheduleCard"
import { formatDate, sortByTime } from "../../utils/formatDate"
import { useScheduledEvents } from "./webflow-api"
import type {
  RawScheduledEvent,
  RawSpeaker,
  RawTalk,
  RawWorkshop,
  RecurringEvents,
  ScheduledEvent,
  Speaker,
  Talk,
  Workshop,
} from "./webflow-api.types"
import { WEBFLOW_MAP } from "./webflow-conts"

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
      assistants: workshop?.assistants?.map((id) =>
        speakersData?.find((speaker) => speaker._id === id),
      ),
    }))
}

/*
 * Converting speakers data from "type ids" to "type names"
 */
export const cleanedSpeakers = (speakersData?: RawSpeaker[]): Speaker[] => {
  return speakersData?.map(cleanedSpeaker)
}

export const cleanedSpeaker = (speaker?: RawSpeaker): Speaker => {
  return {
    ...speaker,
    "speaker-type": WEBFLOW_MAP.speakersType[speaker["speaker-type"]],
    "talk-level": WEBFLOW_MAP.speakersTalk[speaker["talk-level"]],
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
      cleanedSpeaker(speakers.find(({ _id }) => _id === speakerId)),
    ),
  }))
}

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
      "recurring-event": recurringEvents?.find(({ _id }) => _id === schedule["recurring-event"]),
      "speaker-2": speakers?.find(({ _id }) => _id === schedule["speaker-2"]),
      day: WEBFLOW_MAP.scheduleDay[schedule.day] ?? WEBFLOW_MAP.scheduleDay["2e399bc3"],
      talk: talks?.find((talk) => talk._id === schedule.talk),
      type: WEBFLOW_MAP.scheduleType[schedule["event-type"]],
      workshop: workshops?.find(({ _id }) => _id === schedule.workshop),
    }))
}

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const createScheduleScreenData = (): Schedule[] => {
  const { data: events } = useScheduledEvents()
  return [
    {
      date: "2023-05-17",
      title: "React Native Workshops",
      events: convertScheduleToScheduleCard(events, "Wednesday"),
    },
    {
      date: "2023-05-18",
      title: "Conference Day 1",
      events: convertScheduleToScheduleCard(events, "Thursday"),
    },
    {
      date: "2023-05-19",
      title: "Conference Day 2",
      events: convertScheduleToScheduleCard(events, "Friday"),
    },
  ]
}

// export const convertWorkshopToScheduleCard = (
//   workshopData?: WorkshopProps[],
// ): ScheduleCardProps[] => {
//   return workshopData?.map((workshop) => {
//     const sources = [workshop["instructor-info"]["speaker-photo"].url]
//     if (workshop["second-instructor-2"]) {
//       sources.push(workshop["second-instructor-2"]["speaker-photo"].url)
//     }
//     return {
//       variant: "workshop",
//       time: formatDate(workshop["day-time"], "MMM d, h:mm a"),
//       eventTitle: "workshop",
//       heading: workshop.name,
//       subheading: workshop["instructor-info"].name,
//       sources,
//       level: workshop.level,
//       id: workshop._id,
//     }
//   })
// }

const convertScheduleToCardProps = (schedule: ScheduledEvent): ScheduleCardProps => {
  switch (schedule.type) {
    case "Recurring":
      return {
        variant: "recurring",
        time: formatDate(schedule["day-time"], "h:mm a"),
        eventTitle: schedule["recurring-event"]?.name,
        heading: "",
        subheading: schedule["recurring-event"]?.["event-description"],
        sources: [],
        id: schedule._id,
      }
    case "Party":
      return {
        variant: "party",
        time: formatDate(schedule["day-time"], "h:mm a"),
        eventTitle: "party",
        heading: schedule.name,
        subheading: schedule["break-party-description"],
        sources: [],
        id: schedule._id,
      }
    case "Talk":
    case "Speaker Panel":
      return {
        variant: "talk",
        time: formatDate(schedule["day-time"], "h:mm a"),
        eventTitle: "talk",
        heading: schedule.talk.name,
        subheading: schedule.talk.description,
        // sources: schedule["speaker-2"] ? [schedule["speaker-2"]["speaker-photo"].url] : [],
        sources: schedule.talk["speaker-s"]?.["speaker-photo"].url,
        id: schedule._id,
      }
    case "Workshop":
      // eslint-disable-next-line no-case-declarations
      const workshop = schedule.workshop
      return {
        variant: "workshop",
        time: formatDate(schedule["day-time"], "h:mm a"),
        eventTitle: "workshop",
        heading: workshop?.name,
        subheading: workshop?.["instructor-info"]?.name,
        sources: [
          workshop?.["instructor-info"]?.["speaker-photo"].url,
          ...(workshop?.assistants?.map((a) => a["speaker-photo"].url) ?? []),
        ].filter(Boolean),
        level: workshop?.level,
        id: schedule._id,
      }
    default:
      console.tron.logImportant("Unknown schedule type", schedule)
  }
}

// [NOTE] util function that might be needed in the future
const convertScheduleToScheduleCard = (
  scheduleData: ScheduledEvent[],
  day: string,
): ScheduleCardProps[] => {
  const daySchedule: ScheduledEvent[] = groupBy("day")(scheduleData ?? [])?.[day] ?? []
  return daySchedule.sort(sortByTime).map(convertScheduleToCardProps)
}

// [NOTE] util function that might be needed in the future
const groupBy =
  (key: string) =>
  <T>(array: T[]) =>
    array.reduce(
      (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj),
      }),
      {},
    )
