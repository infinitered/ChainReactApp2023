import { types, Instance } from "mobx-state-tree"

export interface Schedules {
  [key: string]: Schedule
}

export const ScheduleModel = types.model("Schedule").props({
  id: types.optional(types.identifier, ""),
  name: types.optional(types.string, ""),
  description: types.optional(types.string, ""),
  date: types.optional(types.Date, new Date()),
})

export interface Schedule extends Instance<typeof ScheduleModel> {}
