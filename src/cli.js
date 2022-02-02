#!/usr/bin/env node
const fs = require("fs");
const ph = require("path");
const cl = require("clipboardy");
const rl = require("readline-sync");
const ht = require("./htmlThread");
const sn = require("./sanitizeName");

const o = Object.create(null);
const len = process.argv.length;
if (len > 2) {
   for (const arg of process.argv.slice(2)) {
      if (arg.startsWith("--")) {
         const colonIdx = arg.indexOf(':');
         if (colonIdx === -1) {
            throw new Error(`${arg} must be followed by a ':value'!`);
         }

         const key = arg.slice(2, colonIdx);
         const val = arg.slice(colonIdx + 1);
         o[key] = val;
      } else {
         throw new Error(`'${arg}' does not start with '--'!`);
      }
   }
}

const print = s => process.stdout.write(`${s}\n`);

if (!("stylesheet" in o)) {
   print("Where is style.css?");
   o.stylesheet = rl.prompt();
}

const {stylesheet} = o;

if (!("dir" in o)) {
   print("Where do you want to store this?");
   o.dir = rl.prompt();
}
const {dir} = o;

if (!("name" in o)) {
   print("What is the name of this discussion forum?");
   o.name = rl.prompt();
}
const {name} = o;

if (!("exclude" in o)) {
   print("Anyone you'd like to exclude from name scrubbing?");
   print("Enter a comma delimited string.")
   print("* means no name scrubbing.")
   o.exclude = rl.prompt();
}
const exclude = o.exclude.split(',');

print("Make sure the JSON is on your clipboard.");
rl.question("Then press enter when done...\n");

const jsonFile = `${dir}/${name}.json`;
const htmlFile = `${dir}/${name}.html`;

var sanitizeName;
if (exclude.includes("*")) {
   sanitizeName = name => name;
} else {
   sanitizeName = name => exclude.includes(name) ? name : sn(name);
}

const sanitizeTitle = title => {
   if (title.startsWith("Deleted by ")) {
      const on = title.lastIndexOf("on");
      return `Deleted by ${sanitizeName(title.slice(11, on - 1))} ${title.slice(on)}`
   } else {
      return sanitizeName(title);
   }
}
const sanitizeEntry = entry => ({...entry, title: sanitizeTitle(entry.title)});
const sanitizeReplies = replies => replies.map(
   reply => ({
      ...reply,
      entry: sanitizeEntry(reply.entry),
      replies: sanitizeReplies(reply.replies),
   })
);

const obj = JSON.parse(cl.readSync());

const sanitized = {...obj, replies: sanitizeReplies(obj.replies)};

fs.writeFileSync(jsonFile, JSON.stringify(sanitized));
print(`Wrote ${jsonFile}`);
const relativeStylesheet = ph.relative(dir, stylesheet).replace(/\\/g, '/');
fs.writeFileSync(htmlFile, ht(sanitized, relativeStylesheet));
print(`Wrote ${htmlFile}`);
print("Bye.");
