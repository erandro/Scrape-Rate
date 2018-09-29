var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3000;
var app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/gameroom", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
  axios.get("https://armorgames.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    $("a.feature-type-game").each(function (i, element) {
      var result = {};
      result.title = $(this)
        .children('.head')
        .text();
      result.catagory = $(this)
        .children(".tag-category")
        .text();
      result.imgUrl = $(this)
        .children('.thumb')
        .attr("src");

      db.Game.create(result)
        .then(function (dbGame) {
          console.log(dbGame);
        })
        .catch(function (err) {
          return res.json(err);
        });

    });
    res.send("Scrape Complete");
  });
});

app.get("/games", function (req, res) {
  db.Game.find({})
    .then(function (dbGame) {
      res.json(dbGame);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// app.get("/games/:id", function (req, res) {
//   var id = req.params.id;
//   db.Game.findOne({ _id: id })
//     .populate("note")
//     .then(function (dbGame) {
//       res.json(dbGame);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

// app.post("/games/:id", function (req, res) {
//   // TODO
//   // ====
//   // save the new note that gets posted to the Notes collection
//   // then find an article from the req.params.id
//   // and update it's "note" property with the _id of the new note
//   db.Note.create(req.body)
//     .then(function (dbNote) {
//       return db.Game.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })

//     })
// });

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
