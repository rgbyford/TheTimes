let express = require("express");
let router = express.Router();
const dbFns = require("../config/connection.js");
const cheerio = require("cheerio");
const axios = require("axios");

let aoNews = [];
const siteURL = "https://www.thetimes.co.uk";

let aoAlreadySaved = [];
// get already saved stuff
getAlreadySaved();
async function getAlreadySaved() {
    console.log("gAS");
    aoAlreadySaved = await dbFns.getSaved();
}

router.get("/", function (req, res) {
    res.render("index", {});
});

router.post("/save", function (req, res) {
    console.log("save");
    console.log("rbv: ", aoNews[req.body.value]);

    dbFns.insertArticle(aoNews[req.body.value]);
    aoNews[req.body.value].notSaved = false;
    res.render("index", {
        aoNews: aoNews
    });
});

router.post("/scrape", function (req, res) {
    console.log("scrape");
    // Making a request via axios for The Times. The page"s HTML is passed as the callback"s third argument
    axios.get(siteURL).then(function (response) {
        // Load the HTML into cheerio and save it to a variable
        // "$" becomes a shorthand for cheerio"s selector commands, much like jQuery"s "$"
        let $ = cheerio.load(response.data);

        $("p.Item-dip").each(function (i) {
            let heading = $(this).siblings("h3.Item-headline").text();
            let story = $(this).children().first().text();
            let link = siteURL + $(this).siblings("a").attr("href");
            let notSaved = true;
            for (let j = 0; j < aoAlreadySaved.length; j++) { // check if already saved
                if (aoAlreadySaved[j].heading === heading) {
                    notSaved = false;
                    break;
                }
            }
            if (i < 10) { // keep 10 stories
                aoNews.push({
                    heading: heading,
                    story: story,
                    link: link,
                    notSaved: notSaved
                });
            }
        });
        res.render("index", {
            aoNews: aoNews
        });
    });
    return;
});

router.post("/clear", function (req, res) {
    console.log("clear");
    aoNews.length = 0;
    res.render("index", {
        aoNews: aoNews
    });
});

router.post("/getSaved", async (req, res) => {
    aoNews = await dbFns.getSaved();
    for (let i = 0; i < aoNews.length; i++) {
        aoNews[i].notSaved = false;
    }
    res.render("index", {
        aoNews: aoNews
    });
});

router.post("/note", function (req, res) {
    console.log("note");
    console.log("articleNum: ", req.body.value);
    console.log("text: ", req.body.text);

    aoNews[req.body.value].note = req.body.text;
    aoNews[req.body.value].notSaved = true;
    res.render("index", {
        aoNews: aoNews
    });
});

module.exports = router;