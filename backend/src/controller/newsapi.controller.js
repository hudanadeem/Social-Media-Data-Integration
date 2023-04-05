const NewsApiModel = require("../models/newsapi.model");

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function getNewsApiResults(req, res) {
  try {
    const data = await NewsApiModel.find().exec();
    res.status(200).json({results: data});
  } catch (error) {
    res.status(500).json({error: error});
  }
}

module.exports = getNewsApiResults;