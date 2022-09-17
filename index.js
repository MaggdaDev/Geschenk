const http = require('http');

const host = "minortom.net";
const port = "12345";

function redirect(link) {
    return '<meta http-equiv="refresh" content="0; url=' + link + '" />';
}

function incrementCounter() {
    counter += 1;
    counter %= htmls.length;
}

const htmls = [
    redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"),
    redirect("https://www.youtube.com/watch?v=djV11Xbc914&ab_channel=a-ha"),
    redirect("https://www.youtube.com/watch?v=k3BWCHB2QZg&ab_channel=Galileel")

]
var counter = 0;
var lastGet = Date.now();
const requestListener = function (req, res) {
    console.log(req.rawHeaders[10]);
    if (req.rawHeaders[10].includes('Insecure')) {
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(htmls[counter]);
        console.log("Sending " + counter + "th");
        incrementCounter();
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});