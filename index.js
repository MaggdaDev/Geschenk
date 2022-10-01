const http = require('http');
const url = require('url');
const fs = require('fs');

const host = "minortom.net";
const port = "040917";

const config = require("./config.json");

function redirect(link) {
    return '<meta http-equiv="refresh" content="0; url=' + link + '" />';
}


const htmls = {
    69: redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"),
    42: redirect("https://www.youtube.com/watch?v=djV11Xbc914&ab_channel=a-ha"),
    666: redirect("https://www.youtube.com/watch?v=k3BWCHB2QZg&ab_channel=Galileel"),
    88: redirect("http://" + host + ":" + port + "/einsatz.html"),
    13: redirect("http://" + host + ":" + port + "/double.html")

}
const requestListener = function (req, res) {
    try {
        if (req.url === "/einsatzClaimed") {
            if (config.einsatzClaimed) {
                console.log("einsatz already claimed!");
                res.writeHeader(200, { "Content-Type": "text/html" });
                res.write("SCHON GECLAIMED DU NAZI");
                res.end();
            } else {
                console.log("claim!");
                res.writeHeader(200, { "Content-Type": "image/png" });
                res.write(fs.readFileSync("./success.png"));
                config.einsatzClaimed = true;
                fs.writeFileSync("./config.json", JSON.stringify(config));
                res.end();
            }

        } else if (req.url === "/doubleClaimed") {
            if (config.doubleClaimed) {
                console.log("double already claimed!");
                res.writeHeader(200, { "Content-Type": "text/html" });
                res.write("SCHON GECLAIMED DU NAZI");
                res.end();
            } else {
                console.log("claim!");
                res.writeHeader(200, { "Content-Type": "image/png" });
                res.write(fs.readFileSync("./successD.png"));
                config.doubleClaimed = true;
                fs.writeFileSync("./config.json", JSON.stringify(config));
                res.end();
            }

        } else {
            var query = url.parse(req.url, true).query;
            if (query && query.deinemutter !== undefined && htmls[query.deinemutter]) {
                res.writeHeader(200, { "Content-Type": "text/html" });
                res.write(htmls[query.deinemutter]);
                console.log("sending with id " + query.deinemutter);
                res.end();
            } else if (query) {
                res.writeHeader(200, { "Content-Type": "text/html" });
                res.write(fs.readFileSync(req.url.split("/")[req.url.split("/").length - 1]));
                console.log("sending with id " + query.deinemutter);
                res.end();
            }
        }

    } catch (error) {
        console.log(error);
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});