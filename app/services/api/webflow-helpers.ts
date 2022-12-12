import { Schedule } from "../../screens"
import { ScheduleCardProps } from "../../screens/ScheduleScreen/ScheduleCard"
import { useSchedule, useWorkshops } from "./webflow-api"
import {
  CustomScheduleProps,
  CustomSpeakerProps,
  CustomWorkshopProps,
  ScheduleProps,
  SpeakerProps,
  WorkshopProps,
} from "./webflow-api.types"
import {
  SCHEDULE_DAY_MAP,
  SCHEDULE_TYPE_MAP,
  SPEAKERS_TALK_LEVEL_MAP,
  SPEAKERS_TYPE_MAP,
  WORKSHOP_LEVEL_MAP,
  WORKSHOP_TYPE_MAP,
} from "./webflow-conts"

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
      level: WORKSHOP_LEVEL_MAP[workshop.level],
      type: WORKSHOP_TYPE_MAP[workshop.type],
      "instructor-info": speakersData?.find(
        (speaker) => speaker._id === workshop["instructor-info"],
      ),
      "second-instructor-2": speakersData?.find(
        (speaker) => speaker._id === workshop["second-instructor-2"],
      ),
    }))
}

/*
 * Converting speakers data from "type ids" to "type names"
 */
export const cleanedSpeakers = (speakersData?: CustomSpeakerProps[]): SpeakerProps[] => {
  return speakersData?.map((speaker) => ({
    ...speaker,
    "speaker-type": SPEAKERS_TYPE_MAP[speaker["speaker-type"]],
    "talk-level": SPEAKERS_TALK_LEVEL_MAP[speaker["talk-level"]],
  }))
}

/*
 * Converting schedule data from "type ids" to "type names"
 */
export const cleanedSchedule = (
  scheduleData?: CustomScheduleProps[],
  speakersData?: SpeakerProps[],
): ScheduleProps[] => {
  return scheduleData
    ?.filter((schedule) => !schedule._archived && !schedule._draft)
    .map((schedule) => ({
      ...schedule,
      day: SCHEDULE_DAY_MAP[schedule.day] ?? SCHeDULE_DAY_MAP["2e399bc3"],
      type: SCHEDULE_TYPE_MAP[schedule.type],
      "speaker-2": speakersData?.find((speaker) => speaker._id === schedule["speaker-2"]),
    }))
}

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const createScheduleScreenData = (): Schedule[] => {
  const { data: workshopsData } = useWorkshops()
  const { data: scheduleData } = useSchedule()
  return [
    {
      date: "2023-05-17",
      title: "React Native Workshops",
      events: convertWorkshopToScheduleCard(workshopsData),
    },
    {
      date: "2023-05-18",
      title: "Conference Day 1",
      events: convertScheduleToScheduleCard(scheduleData, "2023-05-18"),
    },
    {
      date: "2023-05-19",
      title: "Conference Day 2",
      events: convertScheduleToScheduleCard(scheduleData, "2023-05-19"),
    },
  ]
}

export const convertWorkshopToScheduleCard = (
  workshopData?: WorkshopProps[],
): ScheduleCardProps[] => {
  return workshopData?.map((workshop) => {
    const sources = [workshop["instructor-info"]["speaker-photo"].url]
    if (workshop["second-instructor-2"]) {
      sources.push(workshop["second-instructor-2"]["speaker-photo"].url)
    }
    return {
      variant: "workshop",
      time: "00:00",
      eventTitle: "workshop",
      heading: workshop.name,
      subheading: workshop["instructor-info"].name,
      sources,
      level: workshop.level,
    }
  })
}

// [NOTE] util function that might be needed in the future
const convertScheduleToScheduleCard = (
  scheduleData: ScheduleProps[],
  key: string,
): ScheduleCardProps[] => {
  const groupScheduleData: ScheduleProps[] = groupBy("day-time")(scheduleData ?? [])?.[key] ?? []
  return groupScheduleData.map((schedule) => ({
    variant: schedule.type === "Talk" || schedule.type === "Lightning Talk" ? "talk" : "event",
    time: "00:00",
    eventTitle:
      schedule.type === "Talk"
        ? "talk"
        : schedule.type === "Lightning Talk"
        ? "speaker-panel"
        : undefined,
    heading: schedule.name,
    subheading: schedule["break-party-description"],
    sources: schedule["speaker-2"] ? [schedule["speaker-2"]["speaker-photo"].url] : [],
  }))
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
