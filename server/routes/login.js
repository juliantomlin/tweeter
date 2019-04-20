const express = require('express')
const loginRoutes = express.Router()


module.exports = function(loginHelpers) {
  loginRoutes.post('/register', (req, res) => {
    if (!req.body.UserName || !req.body.password){
      res.sendStatus(400)
      return
    }
    const userID = generateRandomString ()
    const user = {
      user: req.body.UserName,
      password: req.body.password,
      userID: userID
    }
    req.session.user_id = userID
    loginHelpers.saveUser(user, (err) => {
      if (err) {
        res.status(500).json();
      }
      else {
        res.status(201).send()
      }
    });

  });

loginRoutes.post('/login', (req, res) => {
    if (!req.body.UserName || !req.body.password){
      res.sendStatus(400)
      return
    }
    loginHelpers.getUsers((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        for (user in users) {
          if ((users[user].user === req.body.UserName) && (users[user].password === req.body.password)){
            req.session.user_id = users[user].userID
            res.status(201).send()
          }
        }
        if (!req.session.user_id){
          res.status(401).send()
        }
      }
    })
  });
return loginRoutes;
}




function generateRandomString () {
  while (true) {
    let r = Math.random().toString(36).substring(7)
    if (r.length === 6) {
      return r
    }
  }
}
