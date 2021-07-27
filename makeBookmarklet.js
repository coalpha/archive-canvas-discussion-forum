const fs = require("fs");
var js = fs.readFileSync(`${__dirname}/bin/oDiscussionForum.min.js`, "utf8");

if (js.endsWith(";\n")) {
   js = js.slice(0, -2);
}

fs.writeFileSync(
   `${__dirname}/bin/bookmarklet.min.js`,
   `javascript:void(${js})`
);
