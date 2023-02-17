const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const axios = require('axios');

const PORT = process.env.PORT || 8080;
// hi backend
console.log("Process port", process.env.PORT);
const app = express();
const TaskModel = require("./models/task");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const redditModel = require("./models/task");

const search_terms =
[
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
   "Nuclear%20Bomb"
]

async function getRedditPosts(search) {
   return axios
       .get(`https://www.reddit.com/search.json?q=${search}`)
       .then((response) => {
         return response.data;
       }) 
       .catch(error => console.log(
         'Error to fetch data\n'));
 }

 
 async function parseRedditData(){

   let posts = []

   for (search in search_terms){
      received_response = await getRedditPosts(search_terms[search])
     
      for (index in received_response.data.children){

         const newPost = new redditModel({
            _id: new mongoose.Types.ObjectId(),
            word: search_terms[search],
            ups: received_response.data.children[index].data.ups,
            upvote_ratio: received_response.data.children[index].data.upvote_ratio,
            thumbnail: received_response.data.children[index].data.thumbnail,
            subreddit: received_response.data.children[index].data.subreddit,
            created: received_response.data.children[index].data.created
         }) 

         newPost.save()
         .then(item => {
           console.log("item saved to database");
         })
         .catch(err => {
           console.log(err);
           console.log(err.message);
         });

          
      }
   }

 }


parseRedditData()




const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
} = process.env;

const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;

console.log("MONGO URI", MONGO_URI);

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI, {
    dbName: MONGO_DATABASE_NAME,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
  })
  .then(
    () => {
      console.log(
        `Running mongodb instance at port ${MONGO_PORT} and host ${MONGO_HOSTNAME}`
      );

      app.set("port", PORT);
      app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
      });


    },
    (err) => {
      console.error(`Unable to start mongo at ${MONGO_URI}`);
      console.error(err);
    }
  );
