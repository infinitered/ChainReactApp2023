import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ScheduleModel, Schedules } from "./Schedule"

export const SchedulesStoreModel = types
  .model("SchedulesStore")
  .props({
    viewingDay: "",
    schedules: types.optional(ScheduleModel, {} as Schedules),
  })
  .actions((self) => ({
    setViewingDay(day: string) {
      self.viewingDay = day
    },
  }))

export interface SchedulesStore extends Instance<typeof SchedulesStoreModel> {}
export interface SchedulesStoreSnapshot extends SnapshotOut<typeof SchedulesStoreModel> {}
