"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      console.log("TEST ",newTweet);
      db.collection("tweets").insertOne(newTweet, function (err, tweets) {
        if (err) {
          callback(err, false)
        } else {
          // tweets[0].tweets.push(newTweet);
          callback(null, newTweet);
        }
      })
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      console.log("WE ARE HITTING GET TWEETS");
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          callback(err);
        }
        // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
         //callback(null, tweets);
        callback(null, tweets);
        //console.log(tweets[0].tweets)
      });
      // simulateDelay(() => {
      // });
    }
  };
}
