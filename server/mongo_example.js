"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

const makeDb = function (callback) {
  MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }

    // We have a connection to the "tweeter" db, starting here.
    // console.log(`Connected to mongodb: ${MONGODB_URI}`);
      // const getTweets = function (callback) {
      //   db.collection("tweets").find().toArray((err, tweets) => {
      //     if (err) {
      //       callback(err);
      //     }
      //      callback(null, tweets);
      //   });
      // }
      callback(db);
    // ==> Refactored and wrapped as new, tweet-specific function:
      // getTweets((err, tweets) => {
      // if (err) throw err;
      // //callback(tweets)

      //   for (let tweet of tweets) {
      //     console.log(tweet);

  })
      //db.close();

    //});
}
// module.exports = makeDb;




module.exports = makeDb;
// module.exports.getTweets = getTweets
