var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

var router = express.Router();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gameroom";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

router.get("/scrape", function (req, res) {
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
        res.send('Scrape Complete, You can press "BACK" to return to rate games');
    });
});

router.get("/games", function (req, res) {
    db.Game.find({})
        .then(function (dbGame) {
            res.json(dbGame);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.get("/games/:id", function (req, res) {
    var id = req.params.id;
    db.Game.findOne({ _id: id })
        .populate("note")
        .then(function (dbGame) {
            res.json(dbGame);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.post("/games/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Game.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbGame) {
            res.json(dbGame);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;