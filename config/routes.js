const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbhelper');
const jwt = require("jsonwebtoken");
const secret = "top secret";

const { authenticate } = require('../auth/authenticate');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};



passwordProtection = (password) => {
    if(password.length > 11){
        hashed = bcrypt.hashSync(password, 12);
        return hashed;
    } else {
        return res.status(400).json({
            message: "Password must be at least 12 characters long"
        })
    }
}

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
}


function register(req, res) {
  // implement user registration
  const user = req.body;
  user.password = passwordProtection(user.password);
  db.add(user)
  .then(response => {
    res.status(201).json({ message: 
      "Account created successfully!"})
  })
     .catch(err => {
       res.status(500).json({
         message: "Unable to create user."
       })
     })
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  db.login(creds.username)
   .then(user => {
     if (user && bcrypt.compareSync(creds.password, user.password)) {
       const token = generateToken(user)
       res.status(200).json({ 
         message: "Logged in succcessfully!",
         token: token
      });
     } else {
       res.status(404).json({err: "invalid username or password"});
     }
   })
   .catch(err => {
     res.status(500).send({err: 'Unable to sign in. '});
   })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
