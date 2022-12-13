import { ExpoConfig, ConfigContext } from '@expo/config';
import { version } from './package.json'

const BUILD_NUMBER = 2;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Chain React App 2023',
  slug: 'ChainReactApp2023',
  version,
  orientation: 'portrait',
  icon: './assets/images/app-icon-all.png',
  splash: {
    image: './assets/images/splash-logo-all.png',
    resizeMode: 'contain',
    backgroundColor: '#081828'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  jsEngine: 'hermes',
  assetBundlePatterns: ['**/*'],
  android: {
    icon: './assets/images/app-icon-android-legacy.png',
    package: 'com.chainreactapp',
    versionCode: BUILD_NUMBER,
    adaptiveIcon: {
      foregroundImage: './assets/images/app-icon-android-adaptive-foreground.png',
      backgroundImage: './assets/images/app-icon-android-adaptive-background.png'
    },
    splash: {
      image: './assets/images/splash-logo-android-universal.png',
      resizeMode: 'contain',
      backgroundColor: '#081828'
    },
    googleServicesFile: `./google-services.json`
  },
  ios: {
    icon: './assets/images/app-icon-ios.png',
    supportsTablet: true,
    bundleIdentifier: 'infinitered.stage.ChainReactConf',
    buildNumber: String(BUILD_NUMBER),
    splash: {
      image: './assets/images/splash-logo-ios-mobile.png',
      tabletImage: './assets/images/splash-logo-ios-tablet.png',
      resizeMode: 'contain',
      backgroundColor: '#081828'
    },
    googleServicesFile: `./GoogleService-Info.plist`
  },
  web: {
    favicon: './assets/images/app-icon-web-favicon.png',
    splash: {
      image: './assets/images/splash-logo-web.png',
      resizeMode: 'contain',
      backgroundColor: '#081828'
    }
  },
  owner: 'infinitered',
  extra: {
    eas: {
      projectId: 'b72c79d7-7c87-4aa7-b964-998dcff69e07'
    },
    webflowToken: "63eb6ae43b109a57f2f18438a50a2a91887f53dc238c700b332b0379e74cf616"
  },
  plugins: [
    '@react-native-firebase/app',
    '@react-native-firebase/crashlytics',
    '@react-native-firebase/messaging',
    ['expo-build-properties', { ios: { useFrameworks: 'static' } }]
  ]
});
