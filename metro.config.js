const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// ⚠️ Correção: Adiciona 'mjs' e 'cjs' nas extensões reconhecidas
config.resolver.sourceExts.push("mjs", "cjs");

const nativeWindConfig = withNativeWind(config, {
  input: "./global.css",
});

module.exports = {
  ...nativeWindConfig,
  transformer: {
    ...nativeWindConfig.transformer,
  },
  resolver: {
    ...nativeWindConfig.resolver,
    sourceExts: [...nativeWindConfig.resolver.sourceExts, "mjs", "cjs"],
  },
};
