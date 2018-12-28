export default function (item,html,data,js,css) {
    const tpl=`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>${item.title}</title>
                    <meta name="description" content="${item.description}">
                    <meta name="keywords" content="${item.keywords}">
                    <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revalidate" />
                    <meta http-equiv="Pragma" content="no-cache" />
                    <meta http-equiv="Expires" content="0" />
                    ${css}
                    <script >window.INITSTATE=${JSON.stringify(data)}</script>
                </head>
                <body>
                <div id="root">
                    ${html}
                </div>
                ${js}
                </body>
                </html>`
    return tpl;
}