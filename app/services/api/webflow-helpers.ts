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
      level:
        workshop.level === "bcb33aac3cd85ef6f2e7a97cf23c9771"
          ? "Beginner"
          : workshop.level === "e9d1df0d23f4049bd9d1a6fe83c5db01"
          ? "Intermediate"
          : workshop.level === "860319fadc9cd03654561fba21490285"
          ? "Advanced"
          : undefined,
      type:
        workshop.type === "d9770c43cd59f01f2d60b288d65c1f90"
          ? "New"
          : workshop.type === "c8af4236d64f5c25c09e61e4633badb0"
          ? "Top Seller"
          : undefined,
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
    "speaker-type":
      speaker["speaker-type"] === "97dae28f90a767132ee88e80a8537af8"
        ? "Speaker"
        : speaker["speaker-type"] === "079e51435c82a91426f9c3acc7b0343a"
        ? "Panelist"
        : speaker["speaker-type"] === "f23ef92d0cef6be6fd60654d54770c96"
        ? "Workshop"
        : speaker["speaker-type"] === "07948ce9361d13f707fdb4e663cbe9a5"
        ? "Emcee"
        : undefined,
    "talk-level":
      speaker["talk-level"] === "2f3097a3529a99ed4d688e9ce05034d6"
        ? "Beginner"
        : speaker["talk-level"] === "33984dd1db455114d65e3bd9989f4fad"
        ? "Intermediate"
        : speaker["talk-level"] === "ce1ba34575f5a7e30ba9c4f3c33c8211"
        ? "Advanced"
        : undefined,
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
      day:
        schedule.day === "63ac4ade8b2d5a981780570e01bed34d"
          ? "Wednesday"
          : schedule.day === "ed2cfa99e27dce5d1a425a419f170eb3"
          ? "Thursday"
          : "Friday",
      type:
        schedule.type === "976a2eee2ab173440affe93d0a20bf4d"
          ? "Talk"
          : schedule.type === "c728019fbbce26cc72918695f31e7d4d"
          ? "Lightning Talk"
          : schedule.type === "2e399bc3e027ec007832e20e47c5b83b"
          ? "Break"
          : schedule.type === "b2f17244cf6bd0782c2a099568169219"
          ? "Party"
          : undefined,
      "speaker-2": speakersData?.find((speaker) => speaker._id === schedule["speaker-2"]),
    }))
}

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const createScheduleScreenData = (): Schedule[] => {
  const { data: workshopsData } = useWorkshops()
  const { data: scheduleData } = useSchedule()
  console.tron.log({ scheduleData })
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
