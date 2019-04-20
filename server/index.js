"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const makeDb        = require('./mongo_example')
const app           = express();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['key1'],
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


makeDb((db)=>{                  //this makes the code wait for the db to be loaded

  const DataHelpers = require("./lib/data-helpers.js")(db);  //uses the db to read tweets, also used to add tweets to db
  const LoginHelpers = require('./lib/login-helpers.js')(db)

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);  //based on user actionds tells Datahelpers what action to take
  const loginRoutes = require("./routes/login")(LoginHelpers);

  app.use("/tweets", tweetsRoutes);
  app.use("/", loginRoutes);
  app.post("/logout", (req, res) => {
    console.log('cookiesgone?')
    req.session = null
    res.status(201).send()
  })


  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
})

