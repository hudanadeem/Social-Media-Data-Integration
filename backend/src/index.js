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

      // TODO: This will run every time the server starts/restarts.
      // TODO: Not sure if this is expected behavior.
      parseRedditData();
    });
  },
  (err) => {
    console.error(`Unable to start mongo...`);
    console.error(err);
  }
);
