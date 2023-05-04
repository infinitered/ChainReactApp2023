import React, { useState } from "react"
import * as Updates from "expo-updates"
import { reportCrash } from "../utils/crashReporting"
import { useAppState } from "../hooks"
import { Modal } from "./"

// Setting up our OTA Updates component
export const OTAUpdates = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  async function fetchAndRestartApp() {
    const fetchUpdate = await Updates.fetchUpdateAsync()
    if (fetchUpdate.isNew) {
      await Updates.reloadAsync()
    } else {
      setIsModalVisible(false)
      setIsUpdating(false)
      reportCrash("Fetch Update failed")
    }
  }

  async function onFetchUpdateAsync() {
    if (__DEV__ || process.env.NODE_ENV === "development") return
    try {
      const update = await Updates.checkForUpdateAsync()
      setIsModalVisible(update.isAvailable)
    } catch (error) {
      reportCrash(error)
    }
  }

  useAppState({
    match: /background/,
    nextAppState: "active",
    callback: onFetchUpdateAsync,
  })

  return (
    <Modal
      title="ota.title"
      subtitle="ota.subtitle"
      confirmOnPress={{
        cta: async () => {
          setIsUpdating(true)
          await fetchAndRestartApp()
        },
        label: isUpdating ? "ota.confirmLabelUpdating" : "ota.confirmLabel",
        disabled: isUpdating,
      }}
      cancelOnPress={{
        cta: () => {
          setIsModalVisible(false)
        },
        label: "ota.cancelLabel",
      }}
      isVisible={isModalVisible}
    />
  )
}
