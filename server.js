const express = require("express");
const exphbs = require("express-handlebars");
const routes = require ("./routes/routes.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(routes);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

