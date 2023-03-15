/* eslint-disable camelcase */
const axios = require("axios");
const RedditModel = require("../models/reddit.model");
const mongoose = require("mongoose");

 const searchTerms = [
   "Nuke",
   "Nuclear%20Weapon",
   "ICBM",
   "Bio-weapon",
   "Biological%20Warfare",
   "Anthrax",
   "Smallpox",
   "Plague",
   "Germ%20Warfare",
   "Chemical%20Weapon",
   "Nerve%20Weapon",
   "Asphyxiant%20Weapon",
   "Nuclear%20Bomb",
 ];
//const searchTerms = ["Example"]; // TODO: Remove this and uncomment above

/**
 * Gets Post from Api
 * Stores in mongodb
 * @param {SearchWord} search is  the keyword to find
 */
async function getRedditPosts(search) {
  return axios
    .get(`https://www.reddit.com/search.json?q=${search}`)
    .then((response) => response.data)
    .then((response) => response.data.children) // * I am directly returning the response.data.children here
    .catch((error) => console.log("Error in fetching data: ", error));
}

/**
 * Formats api response to add to mongodb
 */
async function parseRedditData() {
  var datas = []
  for (const search of searchTerms) {
    const receivedResponse = await getRedditPosts(search);
    //console.log(receivedResponse);

    const data = receivedResponse
      .map((response) => response.data)
      .map(
        ({title, ups, upvote_ratio, thumbnail, subreddit, created}) =>
          new RedditModel({
            _id: new mongoose.Types.ObjectId(),
            word: search.replace("%20", " "),
            title,
            ups,
            upvote_ratio,
            thumbnail,
            subreddit,
            created,
          })
      );

    datas.push(...data)
  }
  return RedditModel.insertMany(datas);
}

module.exports = {parseRedditData, getRedditPosts};
