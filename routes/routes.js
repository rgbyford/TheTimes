let express = require("express");
let router = express.Router();
const dbFns = require("../config/connection.js");
const cheerio = require("cheerio");
const axios = require("axios");

router.get("/", function (req, res) {
    res.render("index", {});
});

let aoNews = [];
const siteURL = "https://www.thetimes.co.uk"

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
            if (i < 10) { // keep 10 stories
                aoNews.push({
                    heading: heading,
                    story: story,
                    link: link,
                    notSaved: notSaved
                });
            }
        });

        //console.log("Stories: ", aoNews.length);
        // console.log (aoNews);
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

router.post("/getSaved", async (req, res) =>{
    aoNews = await dbFns.getSaved();
    for (let i = 0; i < aoNews.length; i++) {
        aoNews[i].notSaved = false;
    }
    res.render("index", {
        aoNews: aoNews
    });
});

module.exports = router;