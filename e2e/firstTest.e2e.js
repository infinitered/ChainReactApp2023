const { getDeepLinkUrl, getDevLauncherPackagerUrl, sleepAsync } = require("./utils")

describe("Example", () => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
    })
    await sleepAsync(1000)
    const url = getDeepLinkUrl(getDevLauncherPackagerUrl("ios"))

    await device.openURL({
      // Local testing with packager
      url: getDeepLinkUrl(getDevLauncherPackagerUrl("ios")),
      // Testing latest published EAS update for the test_debug channel
      // url: getDeepLinkUrl(getLatestUpdateUrl()),
    })

    await sleepAsync(3000)
  })

  it("should have welcome screen", async () => {
    await expect(element(by.id("welcome-heading"))).toBeVisible()
  })
})
