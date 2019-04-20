const express = require('express')
const loginRoutes = express.Router()


module.exports = function(loginHelpers) {
console.log('ahahh')
loginRoutes.post('/register', (req, res) => {
  console.log('hi')
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
          console.log(users[user].user, req.body.UserName, users[user].password, req.body.password)
          if ((users[user].user === req.body.UserName) && (users[user].password === req.body.password)){
            req.session.user_id = users[user].userID
            console.log(users)
            console.log(req.session.user_id)
            res.status(201).send()
          }
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
