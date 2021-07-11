function oEntryContent(entryContent) {
   const o = {};

   const header = entryContent.querySelector(":scope > header");

   if (header) {
      const title = header.querySelector(".discussion-title");
      if (!title) {
         console.error(header);
      }
      o.title = title.innerText;
   }

   const msg = entryContent.querySelector("div.message");
   if (msg) {
      o.msg = msg.innerHTML;
   } else {
      o.msg = "";
   }

   return o;
}

var oArticle = article =>
   oEntryContent(article.querySelector(":scope > div.entry-content"));

function oEntry(li) {
   const o = {};

   const article = li.querySelector(":scope > article");
   const replies = li.querySelector(":scope > div.replies");

   if (article == null) {
      console.error("article was null while scraping li!");
      console.error("see here:", li);
      console.trace();
      return null;
   }

   o.entry = oArticle(article);

   if (replies == null) {
      console.error("replies was null while scraping li!");
      console.error("see here:", li);
      console.trace();
   } else {
      o.replies = oDiscussionEntries(replies.firstChild);
   }

   return o;
}

function oDiscussionEntries(ul) {
   return [...ul.children]
      .map(oEntry)
      .filter(entry => entry != null)
      .filter(({entry}) => entry != null);
}

function oDiscussionForum() {
   const topic   = document.getElementById("discussion_topic");
   const replies = document.getElementById("discussion_subentries")
      .querySelector(":scope > ul.discussion-entries");
   return {
      topic: oArticle(topic),
      replies: oDiscussionEntries(replies),
   };
}

void function pDiscussionForum() {
   window.prompt("Copy this vvvv", JSON.stringify(oDiscussionForum()));
}();
