const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 8080;
// hi backend
console.log('Process port', process.env.PORT);
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const RedditModel = require('./models/task');

const searchTerms =
[
  'Nuke',
  'Nuclear%20Weapon',
  'ICBM',
  'Bio-weapon',
  'Biological%20Warfare',
  'Anthrax',
  'Smallpox',
  'Plague',
  'Germ%20Warfare',
  'Chemical%20Weapon',
  'Nerve%20Weapon',
  'Asphyxiant%20Weapon',
  'Nuclear%20Bomb',
];

/**
 * Gets Post from Api
 * Stores in mongodb
 * @param {SearchWord} search is  the keyword to find
 */
async function getRedditPosts(search) {
  return axios
      .get(`https://www.reddit.com/search.json?q=${search}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(
          'Error to fetch data\n'));
}

/**
 * Formats api response to add to mongodb
 */
async function parseRedditData() {
  for (search in searchTerms) {
    if (search != -1) {
      receivedResponse = await getRedditPosts(searchTerms[search]);

      for (index in receivedResponse.data.children) {
        if (search != -1) {
          const newPost = new RedditModel({
            _id: new mongoose.Types.ObjectId(),
            word: searchTerms[search],
            ups: receivedResponse.data.children[index].data.ups,
            upvote_ratio:
            receivedResponse.data.children[index].data.upvote_ratio,
            thumbnail: receivedResponse.data.children[index].data.thumbnail,
            subreddit: receivedResponse.data.children[index].data.subreddit,
            created: receivedResponse.data.children[index].data.created,
          });

          newPost.save()
              .then((item) => {
                console.log('item saved to database');
              })
              .catch((err) => {
                console.log(err);
                console.log(err.message);
              });
        }
      }
    }
  }
}


parseRedditData();


const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
} = process.env;

const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;

console.log('MONGO URI', MONGO_URI);

mongoose.set('strictQuery', false);

mongoose
    .connect(MONGO_URI, {
      dbName: MONGO_DATABASE_NAME,
      user: MONGO_USERNAME,
      pass: MONGO_PASSWORD,
    })
    .then(
        () => {
          console.log(
              `Running mongodb instance at port ${MONGO_PORT}
               and host ${MONGO_HOSTNAME}`,
          );

          app.set('port', PORT);
          app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
          });
        },
        (err) => {
          console.error(`Unable to start mongo at ${MONGO_URI}`);
          console.error(err);
        },
    );
