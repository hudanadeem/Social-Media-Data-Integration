const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

/**
 * This function is used to connect to the in-memory MongoDB server
 * for testing purposes ONLY
 **/
async function connect() {
  // The NODE_ENV variable is set to 'test'
  // in the package.json file under the test script
  // cross-env is used in the package.json to set
  // the NODE_ENV variable both on Windows and Unix systems
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(
        'NODE_ENV is not set to test.',
    );
  }

  const mongod = await MongoMemoryServer.create({
    instance: {
      dbName: 'test',
    },
  });

  const MONGO_URI = mongod.getUri();

  mongoose.set('strictQuery', true);

  return mongoose.connect(MONGO_URI, {dbName: 'test', authSource: 'admin'});
}

/**
 * Closes the connection to the in-memory MongoDB server
 * to avoid memory leaks and side effects
 * @return {Promise} the mongoose promise that
 * resolves to the closing connection
 **/
function close() {
  return mongoose.disconnect();
}

module.exports = {connect, close};
