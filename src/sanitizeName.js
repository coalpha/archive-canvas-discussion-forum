const {
   uniqueNamesGenerator,
   adjectives,
   colors,
   animals,
} = require("unique-names-generator");

const stringToSeed = str => [...str].reduce((a, c) => a + c.charCodeAt(0), 0);
const sanitizeName = name => uniqueNamesGenerator({
   dictionaries: [adjectives, animals],
   separator: " ",
   seed: stringToSeed(name),
});

module.exports = sanitizeName;
