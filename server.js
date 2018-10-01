var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var routes = require("./controllers/games_consroller.js");
app.use(routes);

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
