const RedditModel = require("../models/reddit.model");

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function getRedditPosts(req, res) {
  try {
    const data = await RedditModel.find().exec();
    res.status(200).json({posts: data});
  } catch (error) {
    res.status(500).json({error: error});
  }
}

module.exports = getRedditPosts;
