const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Configuração do NativeWind com suporte ao input global.css
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

module.exports = {
  ...nativeWindConfig,
  transformer: {
    ...nativeWindConfig.transformer,
    // A configuração do React Native Reanimated é feita automaticamente
  },
  resolver: {
    ...nativeWindConfig.resolver,
  },
};
