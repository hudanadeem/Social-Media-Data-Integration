const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsApiSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  api: String,
  word: String,
  source: String,
  title: String,
  url: String,
  created: String,
});

const newsApiModel = mongoose.model("News_Api_Schema", newsApiSchema);

module.exports = newsApiModel;
