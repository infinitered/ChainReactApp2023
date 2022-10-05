# The official App for #ChainReact2023

Coming soon! This will be the home for the app for [Chain React 2023](https://cr.infinite.red/), the only React Native focused conference in the USA, hosted by [Infinite Red](https://infinite.red/). Stay tuned for updates ❤️ ⚛

## Building app

### Pre-reqs

1. `brew install fastlane`
2. `yarn global add eas-cli@2.1.0` or `npm install -g eas-cli@2.1.0`

### iOS Simulator

1. `yarn ios`

### iOS Simulator—Manual

1. `yarn build:ios`
2. double click newly created `*.tar.gz` file in `build\` directory of project
3. you'll now see a `ChainReactApp2023.app` file in the root of your project > drag and drop this file to your simulator
4. `yarn start`
5. `i` > app should now open and build

### Android Emulator

1. `yarn android`

### Android Emulator—Manual

1. `yarn build:android`
2. APK will be generated in the `build\` directory of the project
3. Drag and drop this file to your emulator or sideload to Android device of choice
4. `yarn start`
5. `a` > app will open on the emulator or connected device (use `adb devices` to see if properly connected)
