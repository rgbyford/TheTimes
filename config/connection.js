const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

let Article;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("we're connected!");
    const articleSchema = new mongoose.Schema({
        heading: String,
        story: String,
        link: String,
        note: String
    });
    Article = mongoose.model("Article", articleSchema);
});

function insertArticle(oArticle) {
    console.log("iA: ");
    let dbArticle = new Article(oArticle);
    console.log("insertArticle: ", dbArticle.heading);
    // if it is in already saved, do an update to the note.
    // otherwise do an insert
    let notSaved = true;
    for (let j = 0; j < aoAlreadySaved.length; j++) { // check if already saved
        if (aoAlreadySaved[j].heading === dbArticle.heading) {
            notSaved = false;
            break;
        }
    }
    if (notSaved) { // insert
        dbArticle.save(function (err) {
            if (err) {
                return console.error(err);
            }
            console.log(dbArticle);
        });
    } else { // update
        let conditions = {
            heading: dbArticle.heading
        };
        let update = {
            note: oArticle.note
        };
        dbArticle.update(conditions, update);
    }
}

const getSaved = async () => {
    return (Article.find());
};

module.exports.insertArticle = insertArticle;
module.exports.getSaved = getSaved;