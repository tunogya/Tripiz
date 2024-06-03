const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, extraNodeModules },
  } = await getDefaultConfig();
  
  return {
    resolver: {
      extraNodeModules: {
        crypto: require.resolve("react-native-crypto"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
      },
      sourceExts: [...sourceExts, "jsx", "js", "ts", "tsx"],
    },
  };
})();