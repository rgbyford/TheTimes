const mongoose = require("mongoose");
//const routes = require ("../routes/routes.js");
//require ("../routes/routes.js");
//require ("../routes/routes.js");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

let Article;
let aoAlreadySaved = [];
console.log ("init aoAS");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
    console.log("we're connected!");
    const articleSchema = new mongoose.Schema({
        heading: String,
        story: String,
        link: String,
        note: String
    });
    Article = mongoose.model("Article", articleSchema);
    aoAlreadySaved = await getSaved();
    //console.log("AS len:", aoAlreadySaved.length);
});

const getSaved = async () => {
    return (Article.find());
};

// set already saved stuff
//routes.getAlreadySaved();


function insertArticle(oArticle) {
    //    console.log("iA: ");
    let dbArticle = new Article(oArticle);
    console.log("insertArticle link: ", dbArticle.link);
    // if it is in already saved, do an update to the note.
    // otherwise do an insert
    let notSaved = true;
    for (let j = 0; j < aoAlreadySaved.length; j++) { // check if already saved
        if (aoAlreadySaved[j].link === oArticle.link) { //not headlines because they change!
            notSaved = false;
            break;
        }
    }

    if (notSaved) { // insert
        console.log("Not here - add to AlreadySaved");
        aoAlreadySaved.push(oArticle);
        dbArticle.save(function (err) {
            if (err) {
                return console.error(err);
            }
            //            console.log(dbArticle);
        });
    } else {
        console.log("Already here - update");
        console.log("Note: ", oArticle.note);
        let conditions = {
            link: oArticle.link
        };
        let update = {
            $set: {
                note: oArticle.note
            }
        };
        let options = {
            multi: false
        };
        Article.update(conditions, update, options, udCallback);
    }
}

function udCallback(err, numAffected) {
    console.log("udC err: ", err);
    console.log("udC updated count: ", numAffected);
}



module.exports.insertArticle = insertArticle;
module.exports.getSaved = getSaved;
//module.exports.aoAlreadySaved = aoAlreadySaved;