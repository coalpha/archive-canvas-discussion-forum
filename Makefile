# I keep reflexively typing make

bookmarklet.min.url: oDiscussionForum.min.js
	node makeBookmarklet

oDiscussionForum.min.js:
	npm run build
