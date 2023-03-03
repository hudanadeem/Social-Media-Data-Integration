const mongoose = require("mongoose");

/**
 * Starts a connection to the MongoDB database using the Mongoose ORM.
 * NOTE: This file is part of the dev and prod mongo connection. A different
 * connection is used for testing which is in backend/test/db/connect.js
 * @return {Promise} a mongoose promise that resolves to the connection
 */
async function connect() {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DATABASE_NAME,
  } = process.env;

  // used to disable deprecation warning:
  // https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to
  mongoose.set("strictQuery", true);

  const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;

  console.log(`Connecting to mongodb at ${MONGO_URI}`);

  return mongoose.connect(MONGO_URI, {
    dbName: MONGO_DATABASE_NAME,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    authSource: "admin", // needed for users that are not root to properly authenticate
  });
}

module.exports = {connect};
