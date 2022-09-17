const http = require('http');
const url = require('url');

const host = "minortom.net";
const port = "040917";

function redirect(link) {
    return '<meta http-equiv="refresh" content="0; url=' + link + '" />';
}


const htmls = {
    69: redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"),
    42: redirect("https://www.youtube.com/watch?v=djV11Xbc914&ab_channel=a-ha"),
    666: redirect("https://www.youtube.com/watch?v=k3BWCHB2QZg&ab_channel=Galileel")

}
const requestListener = function (req, res) {
    try {
        var query = url.parse(req.url, true).query;
        if (query && query.deinemutter && htmls[query.deinemutter]) {
            res.writeHeader(200, { "Content-Type": "text/html" });
            res.write(htmls[query.deinemutter]);
            console.log("sending with id " + query.deinemutter);
            res.end();
        }

    } catch (error) {
        console.log(error);
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});