/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
const axios = require("axios");
const RedditModel = require("../models/reddit.model");
const NewsApiModel = require("../models/newsapi.model");
const mongoose = require("mongoose");
const newsApiKey = "6188d62e2ce24658b78cd80949059d0b"

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
 * Gets Post from NewsApi
 * Stores in mongodb
 * @param {SearchWord} search is  the keyword to find
 */
async function getNewsApiResults(search) {
  return axios
    .get(`https://newsapi.org/v2/everything?q=${search}&pagesize=20&apiKey=${newsApiKey}`)
    .then((response) => response.data)
    .catch((error) => console.log("Error in fetching data: ", error));
}

/**
 * Formats api response to add to mongodb
 */
async function parseNewsApiData(){
  var datas = []
  for (const search of searchTerms) {
    const receivedResponse = await getNewsApiResults(search);

    for (let article in receivedResponse.articles){
      if (article != -1){                             //only for linter
      const obj = new NewsApiModel({
        _id: new mongoose.Types.ObjectId(),
        api: "News",
        word: search.replace("%20", " "),
        source: receivedResponse.articles[article].source.name,
        title: receivedResponse.articles[article].title,
        url: receivedResponse.articles[article].url,
        created: receivedResponse.articles[article].publishedAt,
      })
    

      const data = 
      {
        "_id" : obj.id,
        "api" : obj.api,
        "word" : search.replace("%20", " "),
        "source" : obj.source,
        "title" : obj.title,
        "url" : obj.url,
        "created" : obj.created,
      }

      //console.log(data)
      datas.push({...data})

    }
  }

  }

  return NewsApiModel.insertMany(datas);
}


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
            api: "Reddit",
            title,
            ups,
            upvote_ratio,
            thumbnail,
            subreddit,
            created,
          })
      );

      //console.log(data)

    datas.push(...data)
  }
return RedditModel.insertMany(datas);
}

module.exports = {parseRedditData, getRedditPosts, parseNewsApiData, getNewsApiResults};
