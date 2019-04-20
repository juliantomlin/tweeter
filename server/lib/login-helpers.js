"use strict";

module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveUser: function(newUser, callback) {
      db.collection("user").insertOne(newUser, function (err, user) {      //this addes the new tweet to the db
        if (err) {
          callback(err)
        } else {
          callback(null);
        }
      })
    },

    // Get all tweets in `db`, sorted by newest first
    getUsers: function(callback) {
      db.collection("user").find().toArray((err, user) => {
        if (err) {
          callback(err);
        }
          callback(null, user);                                     //returns tweets to render
      });
    }
  };
}
