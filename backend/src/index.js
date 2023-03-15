const {connect} = require("./db/connect");
const {parseRedditData} = require("./api/api");
const app = require("./app");

const PORT = process.env.PORT || 8080;

connect().then(
  () => {
    const {MONGO_HOSTNAME, MONGO_PORT} = process.env;

    console.log(
      `Running mongodb instance at port ${MONGO_PORT} and host ${MONGO_HOSTNAME}`
    );

    app.set("port", PORT);
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);


      parseRedditData();

      //Run API grab hourly
      setInterval(parseRedditData, 1000 * 60 * 60); 
      //We can also do setTimeout(parseRedditData, 1000*60*60) 
      //in the final line of parseRedditData
    });
  },
  (err) => {
    console.error(`Unable to start mongo...`);
    console.error(err);
  }
);
