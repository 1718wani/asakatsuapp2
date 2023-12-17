// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Remove all console logs in production...
config.transformer.minifierConfig.compress.drop_console = true;
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs", "cjs"];

// New settings to be added
module.exports = (() => {
  const { transformer, resolver } = config;

  // Modify the transformer configuration
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    // Keep existing transformer configurations
    ...config.transformer,
  };

  // Modify the resolver configuration
  config.resolver = {
    ...resolver,
    // Filter out 'svg' from assetExts and add it to sourceExts
    assetExts: resolver.assetExts.filter((ext: any) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    // Keep existing resolver configurations
    ...config.resolver,
  };

  return config;
})();

module.exports = config;
