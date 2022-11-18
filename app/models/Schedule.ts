import { types, Instance } from "mobx-state-tree"
import { ScheduleCardProps } from "../screens/ScheduleScreen/ScheduleCard"

export interface Schedules {
  [key: string]: Schedule[]
}

export const ScheduleModel = types.model("Schedule").props({
  date: types.identifier,
  title: types.string,
  events: types.optional(types.frozen<ScheduleCardProps[]>(), []),
})

export interface Schedule extends Instance<typeof ScheduleModel> {}
