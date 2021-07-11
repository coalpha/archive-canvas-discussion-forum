const {terser} = require("rollup-plugin-terser");

module.exports = {
   input: "src/oDiscussionForum.js",
   output: {
      file: "bin/oDiscussionForum.min.js",
      format: "iife",
   },
   plugins: [terser()],
};
