import { Schedule } from "../../screens"
import { ScheduleCardProps } from "../../screens/ScheduleScreen/ScheduleCard"
import { formatDate, sortByTime } from "../../utils/formatDate"
import { useSchedule } from "./webflow-api"
import {
  CustomScheduleProps,
  CustomSpeakerProps,
  CustomWorkshopProps,
  RecurringEventsProps,
  ScheduleProps,
  SpeakerProps,
  WorkshopProps,
} from "./webflow-api.types"
import { WEBFLOW_MAP } from "./webflow-conts"

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const cleanedWorkshops = (
  workshopsData?: CustomWorkshopProps[],
  speakersData?: SpeakerProps[],
): WorkshopProps[] => {
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
export const cleanedSpeakers = (speakersData?: CustomSpeakerProps[]): SpeakerProps[] => {
  return speakersData?.map((speaker) => ({
    ...speaker,
    "speaker-type": WEBFLOW_MAP.speakersType[speaker["speaker-type"]],
    "talk-level": WEBFLOW_MAP.speakersTalk[speaker["talk-level"]],
  }))
}

/*
 * Converting schedule data from "type ids" to "type names"
 */
export const cleanedSchedule = (
  scheduleData?: CustomScheduleProps[],
  speakersData?: SpeakerProps[],
  workshopData?: WorkshopProps[],
  recurringEventsData?: RecurringEventsProps[],
): ScheduleProps[] => {
  return scheduleData
    ?.filter((schedule) => !schedule._archived && !schedule._draft)
    .map((schedule) => ({
      ...schedule,
      day: WEBFLOW_MAP.scheduleDay[schedule.day] ?? WEBFLOW_MAP.scheduleDay["2e399bc3"],
      type: WEBFLOW_MAP.scheduleType[schedule["event-type"]],
      "speaker-2": speakersData?.find((speaker) => speaker._id === schedule["speaker-2"]),
      workshop: workshopData?.find((workshop) => workshop._id === schedule.workshop),
      "recurring-event": recurringEventsData.find(
        (recurring) => recurring._id === schedule["recurring-event"],
      ),
    })) as ScheduleProps[]
}

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const createScheduleScreenData = (): Schedule[] => {
  const { data: scheduleData } = useSchedule()

  return [
    {
      date: "2023-05-17",
      title: "React Native Workshops",
      events: convertScheduleToScheduleCard(scheduleData, "Wednesday"),
    },
    {
      date: "2023-05-18",
      title: "Conference Day 1",
      events: convertScheduleToScheduleCard(scheduleData, "Thursday"),
    },
    {
      date: "2023-05-19",
      title: "Conference Day 2",
      events: convertScheduleToScheduleCard(scheduleData, "Friday"),
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

const convertScheduleToCardProps = (schedule: ScheduleProps): ScheduleCardProps => {
  switch (schedule.type) {
    case "Recurring":
      console.tron.log({ schedule })
      return {
        variant: "recurring",
        time: formatDate(schedule["day-time"], "h:mm a"),
        eventTitle: schedule["recurring-event"].name,
        heading: "",
        subheading: schedule["recurring-event"]["event-description"],
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
        heading: schedule.name,
        subheading: schedule["break-party-description"],
        sources: schedule["speaker-2"] ? [schedule["speaker-2"]["speaker-photo"].url] : [],
        id: schedule._id,
      }
    case "Workshop":
      return {
        variant: "workshop",
        time: formatDate(schedule["day-time"], "h:mm a"),
        eventTitle: "workshop",
        heading: schedule.workshop.name,
        subheading: schedule.workshop["instructor-info"]?.name,
        sources: [
          schedule.workshop["instructor-info"]?.["speaker-photo"].url,
          ...(schedule.workshop.assistants?.map((a) => a["speaker-photo"].url) ?? []),
        ].filter(Boolean),
        level: schedule.workshop.level,
        id: schedule._id,
      }
  }
}

// [NOTE] util function that might be needed in the future
const convertScheduleToScheduleCard = (
  scheduleData: ScheduleProps[],
  day: string,
): ScheduleCardProps[] => {
  const daySchedule: ScheduleProps[] = groupBy("day")(scheduleData ?? [])?.[day] ?? []
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
