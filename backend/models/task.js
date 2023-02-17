const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const redditSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: String,
  ups: String,
  upvote_ratio: String,
  thumbnail: String,
  subreddit: String,
  created: String,
});

const redditModel = mongoose.model('Reddit_Schema', redditSchema);

module.exports = redditModel;
