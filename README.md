# The official App for #ChainReact2023

Coming soon! This will be the home for the app for [Chain React 2023](https://cr.infinite.red/), the only React Native focused conference in the USA, hosted by [Infinite Red](https://infinite.red/). Stay tuned for updates ❤️ ⚛

# Building app

## Pre-reqs

1. `brew install fastlane`
2. `yarn global add eas-cli@2.1.0` or `npm install -g eas-cli@2.1.0`

Note: The steps below will have to be run when either of the following happen:

1. Fresh app checkout
2. After pulling `main`, and either `package.json`, `app.json`, or `eas.json` files have updates

## iOS Simulator

1. `yarn build:local:ios`
2. double click newly created `*.tar.gz` file in `build\` directory of project
3. you'll now see a `ChainReactApp2023.app` file in the root of your project > drag and drop this file to your simulator
4. `yarn start`
5. `i` > app should now open and build

## Android Emulator

1. `yarn build:local:android`
2. APK will be generated in the `build\` directory of the project
3. Drag and drop this file to your emulator or sideload to Android device of choice
4. `yarn start`
5. `a` > app will open on the emulator or connected device (use `adb devices` to see if properly connected)

## Running on devices

In order to run on an iOS device, you'll need to add your device to EAS.

1. Run `eas device:create` and follow the prompts.
2. Enter your UDID or use the web URL option
3. Make sure to give the device a descriptive name (e.g. Jamon's iPhone 12)

### Development mode

Great for developing on device for testing features like screenreader support

#### Android

1. Follow emulator directions above
2. Instead of dragging build to emulator, use `adb install` to install on connected device

#### iOS

1. Run `yarn build:dev:device`
2. Select iOS (you don't need to run the build through EAS server for Android, just follow the steps above)
3. Make sure your device is included in the provisioning profile when asked.
4. Wait for EAS build to complete. Find you build at https://expo.dev/accounts/infinitered/projects/ChainReactApp2023/builds
5. Install via QR Code
6. Run `yarn start` in your terminal.
7. Scan the QR code that comes up in the terminal output with your device. This should connect your phone app installation to the metro server running on your computer.
8. Good to go!

If you'd prefer to do local builds rather than waiting for EAS servers, you can use the local option:

1. Run `yarn build:dev:device:local`
2. Select platform
3. Make sure your device is included in the provisioning provile (you will be prompted for this)
4. Wait for the build to complete and locate it under `/build`.
5. Ensure your device is connected to your machine via USB cable
6. Open XCode (no need to have any particular project open, just the landing screen is fine). Go to 'Window' > 'Devices and Simulators' and select your device.
7. Drag the `.ipa` file from finder into the XCode window onto the "Installed Apps" section.

### Internal Distribution (Release Mode)

This is for distributing the app to internal testers to run on their devices. The app is in release mode, so this isn't ideal for active development

1. Run `yarn build:preview`
2. Choose "All" or a specific platform
3. If iOS or All is chosen, make sure your iOS device is included in the provisioning profile when asked.
4. Wait for EAS build to complete. Find you build at https://expo.dev/accounts/infinitered/projects/ChainReactApp2023/builds
5. Install via QR Code (make sure you don't have any development builds already installed)
6. You're good to go!

# E2E Tests

## Pre-reqs

1. `brew install applesimutils`
2. Make sure you have an iPhone simulator named `iPhone 14`, if not add one:
   a. Open Simulator
   b. File > New Simulator

_Note: we'll get this more automated with a script in the future_

## iOS Simulator

1. Skip to step 5 if you've already built the latest dev client and extracted `ChainReactApp2023.app` to `build/`
2. `rm build/build-*tar.gz; rm -rf build/ChainReactApp2023.app`
3. `yarn build:ios`
4. `tar zxvf build/build-*.tar.gz -C build/`
5. `yarn start`
6. Open iOS simulator if you want to watch tests in action
7. `yarn e2e:ios` (separate terminal, do not stop step 3)
