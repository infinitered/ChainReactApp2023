const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true,
    },
  ],
  ["@babel/plugin-proposal-optional-catch-binding"],
  // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
  require.resolve("expo-router/babel"),
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
