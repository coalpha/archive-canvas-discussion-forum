# archive-canvas-discussion-forum

<img src="res/icon.png" width=166px/>

*Saving canvas discussion forums as JSON and HTML!*

*It's really not actually that exciting :(*

![](res/example.png)

## usage

1. `npm i -D coarchive/archive-canvas-discussion-forum`.
   Do not install globally on Windows! It just doesn't work for some reason.
2. Optionally, grab yourself a copy of [style.css](src/style.css) and stick it
   somewhere. This is what you can use instead of the builtin stylesheet.
3. Make a bookmarklet with this href.

```
javascript:void(!function(){"use strict";var e=e=>function(e){const r={},n=e.querySelector(":scope > header");if(n){const e=n.querySelector(".discussion-title");e||console.error(n),r.title=e.innerText}const o=e.querySelector("div.message");return r.msg=o?o.innerHTML:"",r}(e.querySelector(":scope > div.entry-content"));function r(r){const o={};o.id=r.id;const t=r.querySelector(":scope > article"),l=r.querySelector(":scope > div.replies");return null==t?(console.error("article was null while scraping li!"),console.error("see here:",r),console.trace(),null):(o.entry=e(t),null==l?(console.error("replies was null while scraping li!"),console.error("see here:",r),console.trace()):o.replies=n(l.firstChild),o)}function n(e){return null==e?[]:[...e.children].map(r).filter((e=>null!=e)).filter((({entry:e})=>null!=e))}window.prompt("Copy this vvvv",JSON.stringify(function(){const r=document.getElementById("discussion_topic"),o=document.getElementById("discussion_subentries").querySelector(":scope > ul.discussion-entries");return document.querySelectorAll("div.showMore.loadNext").forEach((e=>e.click())),{topic:e(r),replies:n(o)}}()))}())
```

3. Go to the discussion forum page you want to archive and click it.
4. Copy that JSON output.
5. `archive-canvas-discussion-forum`
6. Respond to the prompt.

```
What is the name of this discussion forum?
> hw-m2
Make sure the JSON is on your clipboard.
Then press enter when done...

Wrote df/hw-m2.json
Wrote df/hw-m2.html
Bye.
```

Options can be given through command line arguments to skip the prompt. In the above example, `--stylesheet`, `--dir`, and `--exclude` have already been provided.

- `--stylesheet:<path>`
- `--dir:<path>`
- `--name:<name>`
- `--exclude:<name,name>`
