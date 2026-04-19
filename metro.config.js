const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Prefer compiled output over raw source for packages that ship a "source" field
// pointing at TypeScript + asset requires that Metro can't resolve on Windows.
config.resolver.resolverMainFields = ["react-native", "module", "main"];

module.exports = withNativeWind(config, { input: "./global.css" });
