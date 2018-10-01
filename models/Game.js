var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  catagory: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Game = mongoose.model("Game", GameSchema);

module.exports = Game;
