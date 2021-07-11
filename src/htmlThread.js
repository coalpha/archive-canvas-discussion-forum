const {minify} = require("html-minifier-terser");

const htmlEntry = ({entry, replies}, depth = 0) => /* html */ `
   <table class="comment" style="margin-left: ${depth * 40}px;">
      <tbody>
         <tr>
            <td>${entry.title}</td>
         </tr>
         <tr>
            <td>${entry.msg}</td>
         </tr>
      </tbody>
   </table>
   ${replies.map(r => htmlEntry(r, depth + 1)).join('\n')}
`;

function htmlThread({topic, replies}, stylesheet) {
   const html = /* html */ `
      <!DOCTYPE html>
      <html>
         <head>
            <meta charset="UTF-8">
            <title>${topic.title}</title>
           <link rel="stylesheet" href="${stylesheet}">
         </head>
         <body>
            <div class="topic">
               <h1>${topic.title}</h1>
               <div>${topic.msg}</div>
            </div>
            <table>
               <tbody>
                  ${replies.map(r => `<tr><td>${htmlEntry(r)}</tr></td>`).join('\n')}
               </tbody>
            </table>
         </body>
      </html>
   `;
   return minify(html, {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
   });
}

module.exports = htmlThread;
