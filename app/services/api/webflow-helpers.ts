import { translate } from "../../i18n"
import { ScheduleCardProps } from "../../screens/ScheduleScreen/ScheduleCard"
import { formatDate, sortByTime } from "../../utils/formatDate"
import { groupBy } from "../../utils/groupBy"
import { notEmpty } from "../../utils/notEmpty"
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

const breakBannerImage = require("../../../assets/images/testdouble-breaks.png")

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
}): ScheduledEvent[] =>
  (scheduledEvents ?? [])
    .filter((schedule) => !schedule._archived && !schedule._draft)
    .map((schedule) => {
      const isTriviaShow = schedule["event-title"] === WEBFLOW_MAP.triviaShow.title
      const recurringEvent: RecurringEvents | undefined = recurringEvents?.find(
        ({ _id }) => _id === schedule["recurring-event"],
      )
      return {
        ...schedule,
        location: WEBFLOW_MAP.location[schedule.location ?? "63b8a958a5f15f379953e0da"],
        "recurring-event": {
          ...recurringEvent,
          "secondary-callout-description": translate("breakDetailsScreen.description"),
          "secondary-callout-location":
            recurringEvent?.["secondary-callout-location"] ??
            translate("breakDetailsScreen.location"),
          "secondary-callout-banner":
            recurringEvent?.["secondary-callout-banner"] ?? breakBannerImage,
        },
        // "speaker-2": speakers?.find(({ _id }) => _id === schedule["speaker-2"]),
        "speaker-3": speakers?.find(({ _id }) => _id === schedule["speaker-3"]),
        "speaker-2-2": speakers?.find(({ _id }) => _id === schedule["speaker-2-2"]),
        "speaker-3-2": speakers?.find(({ _id }) => _id === schedule["speaker-3-2"]),
        day: WEBFLOW_MAP.scheduleDay[schedule.day],
        talk: talks?.find((talk) => talk._id === schedule["talk-2"]),
        type: isTriviaShow
          ? WEBFLOW_MAP.triviaShow.title
          : WEBFLOW_MAP.scheduleType[schedule["event-type"] ?? "4206976061fcd6327bd12ce6aac856eb"],
        workshop: workshops?.find(({ _id }) => _id === schedule.workshop),
      } as ScheduledEvent
    })

/*
 * Converting speakers data from "type ids" to "type names"
 */
export const cleanedSpeakers = (speakersData?: RawSpeaker[]): Speaker[] => {
  return speakersData?.map(cleanedSpeaker).filter((s) => s !== null) as Speaker[]
}

export const cleanedSpeaker = (speaker?: RawSpeaker): Speaker | null =>
  !speaker
    ? null
    : {
        ...speaker,
        "speaker-type": WEBFLOW_MAP.speakersType[speaker["speaker-type"]],
        externalURL: speaker["external-url"] ?? speaker.website,
      }

export const cleanedSponsors = (sponsorsData?: RawSponsor[]): Sponsor[] =>
  (sponsorsData ?? [])
    .filter((s) => s["is-a-current-sponsor"])
    .map(cleanedSponsor)
    .filter((s) => s !== null) as Sponsor[]

export const cleanedSponsor = (sponsor?: RawSponsor): Sponsor | null =>
  !sponsor
    ? null
    : {
        ...sponsor,
        "sponsor-tier": WEBFLOW_MAP.sponsorTier[sponsor["sponsor-tier"]],
      }

export const cleanedTalks = ({
  speakers,
  talks,
}: {
  speakers?: RawSpeaker[]
  talks?: RawTalk[]
}): Talk[] =>
  (talks ?? [])
    .filter((talk) => !talk._archived && !talk._draft)
    .map(
      (talk) =>
        ({
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
            .filter(notEmpty),
        } as Talk),
    )

/*
 * Converting workshop data from "type ids" to "type names"
 */
export const cleanedWorkshops = (
  workshopsData?: RawWorkshop[],
  speakersData?: Speaker[],
): Workshop[] =>
  (workshopsData ?? [])
    .filter((workshop) => !workshop._archived && !workshop._draft)
    .map(
      (workshop) =>
        ({
          ...workshop,
          level: WEBFLOW_MAP.workshopLevel[workshop.level],
          "instructor-info": speakersData?.find(
            (speaker) => speaker._id === workshop["instructor-info"],
          ),
          "instructor-s-2": workshop["instructor-s-2"]?.map((id) =>
            speakersData?.find((speaker) => speaker._id === id),
          ),
          assistants: workshop?.assistants?.map((id) =>
            speakersData?.find((speaker) => speaker._id === id),
          ),
        } as Workshop),
    )

/*
 * Converting workshop data from "type ids" to "type names"
 */
const convertScheduleToCardProps = (schedule: ScheduledEvent): ScheduleCardProps | undefined => {
  switch (schedule.type) {
    case "Sponsored":
      return {
        variant: "recurring",
        formattedStartTime: formatDate(schedule["day-time"], "h:mmaaa"),
        startTime: schedule["day-time"],
        sources: [],
        eventTitle: schedule.name,
        subheading: schedule["event-description"] ?? "",
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
          schedule["end-time"] && !isTheSameTime
            ? formatDate(schedule["end-time"], "h:mmaaa")
            : undefined,
        eventTitle: schedule["recurring-event"]?.name ?? schedule["event-title"] ?? schedule.name,
        heading: schedule["speaker-3"]?.name ?? "",
        subheading: schedule["recurring-event"]?.["event-description"] ?? "",
        sources: schedule["speaker-3"]
          ? ([(schedule["speaker-3"] as Speaker)?.["speaker-photo"]?.url].filter(
              Boolean,
            ) as string[])
          : [],
        id: schedule._id,
        isSecondaryCallout: schedule["sponsor-is-for-a-callout"],
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
        heading: schedule.talk?.["speaker-s"]?.map((s) => s.name).join(", ") ?? undefined,
        sources: schedule.talk?.["speaker-s"]?.map((s) => s["speaker-photo"]?.url) ?? [],
        id: schedule._id,
        talkUrl: schedule.talk?.["talk-url"],
        variant: "talk",
        eventTitle: schedule.type,
        subheading: schedule.talk?.name ?? schedule["event-title"],
      } as ScheduleCardProps
      if (isTriviaShow) {
        baseItems.variant = WEBFLOW_MAP.triviaShow.variant
        baseItems.eventTitle = WEBFLOW_MAP.triviaShow.title
        baseItems.subheading = schedule["event-description"] ?? ""
        baseItems.sources = [
          (schedule["speaker-2-2"] as Speaker)?.["speaker-photo"]?.url,
          (schedule["speaker-3"] as Speaker)?.["speaker-photo"]?.url,
          (schedule["speaker-3-2"] as Speaker)?.["speaker-photo"]?.url,
        ].filter(notEmpty)
        baseItems.heading = [
          schedule["speaker-2-2"]?.name,
          schedule["speaker-3"]?.name,
          schedule["speaker-3-2"]?.name,
        ]
          .filter(notEmpty)
          .join(", ")
      }
      return baseItems
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
          workshop?.["instructor-info"]?.name ??
          "",
        sources:
          workshop?.["instructor-s-2"]
            ?.map((instructor) => instructor["speaker-photo"]?.url)
            .filter(notEmpty) ?? [],
        level: workshop?.level,
        id: schedule._id,
      }
    default:
      return undefined
  }
}

export const convertScheduleToScheduleCard = (
  scheduleData: ScheduledEvent[],
  day: string,
): ScheduleCardProps[] => {
  const daySchedule: ScheduledEvent[] = groupBy("day")(scheduleData ?? [])?.[day] ?? []
  return daySchedule.sort(sortByTime).map(convertScheduleToCardProps).filter(notEmpty)
}
