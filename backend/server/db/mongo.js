const mongoose = require('mongoose');


function createConnection() {
  const logger = require('../utils/logger').create(`Mongo:${process.env.MONGODB_DATABASE_NAME}`);
  mongoose.Promise = Promise;
  mongoose.set('debug', true);
  const mongoPathConnection = buildMongoPath();
  const options = buildOptions();
  return mongoose.connect(mongoPathConnection,options)
    .then(() => logger.info(`Connection to MONGODB ${process.env.MONGODB_DATABASE_NAME} has been established successfully.`))
    .catch((err) => logger.error(`Unable to connect to the database MONGODB "${mongoPathConnection}": ${err}`));

}

function buildMongoPath(){
  let authURI;
  let mongoPathConnection = 'mongodb://';
  if(process.env.MONGODB_USERNAME !== undefined){
    authURI = `${encodeURIComponent(process.env.MONGODB_USERNAME)}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}`;
  }
  if(authURI){
    mongoPathConnection += `${authURI}@`;
  }
  mongoPathConnection += `${process.env.MONGODB_URI}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}`;
  return mongoPathConnection;
}

function buildOptions(){
  const result = {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 5,
    authSource: 'admin'
  };
  return result;
}

module.exports = exports = {
  createConnection
};