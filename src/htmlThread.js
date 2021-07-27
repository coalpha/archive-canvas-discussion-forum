const {minify} = require("html-minifier-terser");

const depthMultiplier = 40;

const htmlComment = ({id, entry, depth}) => /* html */ `
   <tr><td>
      <table
         class="comment"
         style="margin-left: ${depth * depthMultiplier}px;"
         id="${id}">
         <tbody>
            <tr>
               <td>${entry.title}</td>
            </tr>
            <tr>
               <td>${entry.msg}</td>
            </tr>
         </tbody>
      </table>
   </td></td>
`;

function toFlatComments({replies}) {
   return replies.flatMap(reply => [
      {id: reply.id, entry: reply.entry, depth: 0},
      ...toFlatComments(reply)
         .map(comment => ({...comment, depth: comment.depth + 1}))
   ]);
}

function htmlThread(thread, stylesheet) {
   const flatComments = toFlatComments(thread);
   const html = /* html */ `
      <!DOCTYPE html>
      <html>
         <head>
            <meta charset="UTF-8">
            <title>${thread.topic.title}</title>
           <link rel="stylesheet" href="${stylesheet}">
         </head>
         <body>
            <div class="topic">
               <h1>${thread.topic.title}</h1>
               <div>${thread.topic.msg}</div>
            </div>
            <table><tbody>
               ${flatComments.map(htmlComment).join('\n')}
            </tbody></table>
         </body>
      </html>
   `;
   return minify(html, {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
   });
}

module.exports = htmlThread;
