const plugins = [
  "react-native-reanimated/plugin", // NOTE: this must be last in the plugins
]

const expoConfig = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins,
}

module.exports = expoConfig
