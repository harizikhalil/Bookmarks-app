const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  URL: {
    type: String,
    required: true,
  },
  auteur: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  duree: {
    type: String,
  },
  hauteur: {
    type: String,
    required: true,
  },
  largeur: {
    type: String,
    required: true,
  },
  imgSource: {
    type: String,
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  motsCles: {
    type: String,
  },
  type: {
    type: String,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bookmark", BookmarkSchema);
