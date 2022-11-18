import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SchedulesStoreModel } from "./SchedulesStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  schedulesStore: types.optional(SchedulesStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
