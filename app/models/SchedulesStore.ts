import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Schedule, ScheduleModel } from "./Schedule"

import data from "./mock-data.json"

export const SchedulesStoreModel = types
  .model("SchedulesStore")
  .props({
    selectedSchedule: types.safeReference(ScheduleModel),
    schedules: types.array(ScheduleModel),
  })
  .actions((self) => ({
    setSelectedSchedule(schedule: Schedule) {
      self.selectedSchedule = schedule
    },
  }))
  .actions((self) => ({
    fetchData() {
      self.schedules.replace(data as any)
      if (!self.selectedSchedule) {
        self.setSelectedSchedule(self.schedules[0])
      }
    },
  }))

export interface SchedulesStore extends Instance<typeof SchedulesStoreModel> {}
export interface SchedulesStoreSnapshot extends SnapshotOut<typeof SchedulesStoreModel> {}
