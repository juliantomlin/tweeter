"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

const makeDb = function (callback) {
  MongoClient.connect(MONGODB_URI, (err, db) => {             //boots up the db
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    callback(db);
  })
}

module.exports = makeDb;