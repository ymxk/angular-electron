module.exports = {
  module: {
    rules: [{
      test: /\.art$/,
      loader: "art-template-loader",
      options: {
        // art-template options (if necessary)
        // @see https://github.com/aui/art-template
      }
    }]
  }
}
