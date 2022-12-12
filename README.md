# The official App for #ChainReact2023

Coming soon! This will be the home for the app for [Chain React 2023](https://cr.infinite.red/), the only React Native focused conference in the USA, hosted by [Infinite Red](https://infinite.red/). Stay tuned for updates ❤️ ⚛

## Building app

### Pre-reqs

1. `brew install fastlane`
2. `yarn global add eas-cli@2.1.0` or `npm install -g eas-cli@2.1.0`

Note: The steps below will have to be run when either of the following happen:

1. Fresh app checkout
2. After pulling `main`, and either `package.json`, `app.json`, or `eas.json` files have updates

### iOS Simulator

1. `yarn build:local:ios`
2. double click newly created `*.tar.gz` file in `build\` directory of project
3. you'll now see a `ChainReactApp2023.app` file in the root of your project > drag and drop this file to your simulator
4. `yarn start`
5. `i` > app should now open and build

### Android Emulator

1. `yarn build:local:android`
2. APK will be generated in the `build\` directory of the project
3. Drag and drop this file to your emulator or sideload to Android device of choice
4. `yarn start`
5. `a` > app will open on the emulator or connected device (use `adb devices` to see if properly connected)

## E2E Tests

### Pre-reqs

1. `brew install applesimutils`
2. Make sure you have an iPhone simulator named `iPhone 14`, if not add one:
   a. Open Simulator
   b. File > New Simulator

_Note: we'll get this more automated with a script in the future_

### iOS Simulator

1. Skip to step 5 if you've already built the latest dev client and extracted `ChainReactApp2023.app` to `build/`
2. `rm build/build-*tar.gz; rm -rf build/ChainReactApp2023.app`
3. `yarn build:local:ios`
4. `tar zxvf build/build-*.tar.gz -C build/`
5. `yarn start`
6. Open iOS simulator if you want to watch tests in action
7. `yarn e2e:ios` (separate terminal, do not stop step 3)
