const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const session = require ('express-session');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config/dev');
const port = process.env.PORT || 5000;
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use(passport.initialize());
app.use(session({
    secret: 'sessionid',
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect('mongodb://localhost:27017/');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID ,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/login/google/callback",
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
  const newUser ={
    googleId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName
  }

  UsersModel.findOne({ email: profile.email })
      .then((user) => {
        if (user) {
          // If the user exists, return the user data
          done(null, user);
        } else {
          // If the user does not exist, create a new account for the user using Google data
          UsersModel.create(newUser)
            .then((newUser) => {
              // Return the newly created user data
              done(null, newUser);
            })
            .catch((error) => {
              // Return an error response if there was an issue creating the account
              done(error, null);
            });
        }
      })
      .catch((error) => {
        // Return an error response if there was an issue checking the email in the database
        done(error, null);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UsersModel.findById(id, (err, user) => {
    done(err, user);
  });
});

// find user by email and fetch their name email and balance 
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UsersModel.findOne({ email: email })
    .then((users) => {
      if (users) {
        if (users.password === password) {
          req.session.users = users;
          req.session.authorized = true
          res.json({ status: 'Success', name: users.name, balance: users.balance });
        } else {
          res.json({ status: 'Incorrect Password' });
        }
      } else {
        res.json({ status: 'Account not existed' });
      }
    });
});


app.post('/createaccount', (req, res) => {
  const { email, password, name } = req.body;

  // Check if the email already exists in the database
  UsersModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        // If user exists, return an error response
        return res.json({ status: 'Error', message: 'User already exists' });
      }

      // If user does not exist, create the account
      UsersModel.create({ email, password, name })
        .then((newUser) => {
          // Return a success response with the newly created user data
          res.json(newUser);
        })
        .catch((error) => {
          // Return an error response if there was an issue creating the account
          res.json({ status: 'Error', message: 'Failed to create account' });
        });
    })
    .catch((error) => {
      // Return an error response if there was an issue checking the email in the database
      res.json({ status: 'Error', message: 'Failed to check email' });
    });
});


app.post('/loginWithGoogle', (req, res) => {
  const { tokenId, email, name } = req.body;

  // Check if the user with the given email already exists in the database
  UsersModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        // If the user exists, return the user data
        res.json({ status: 'Success', name: user.name, email: user.email, balance: user.balance, transactions: user.transactions });
      } else if (email && name) {
        // If the user does not exist and email and name are provided, create a new account for the user using Google data
        UsersModel.create({ email, name })
          .then((newUser) => {
            // Return the newly created user data
            res.json({ status: 'AccountCreated', name: newUser.name, email: newUser.email, balance: newUser.balance, transactions: newUser.transactions });
          })
          .catch((error) => {
            // Return an error response if there was an issue creating the account
            res.status(500).json({ status: 'Error', message: 'Failed to create account' });
          });
      } else {
        // If email and/or name are missing, return an error response
        res.status(400).json({ status: 'Error', message: 'Email and name are required' });
      }
    })
    .catch((error) => {
      // Return an error response if there was an issue checking the email in the database
      res.status(500).json({ status: 'Error', message: 'Failed to check email' });
    });
});



app.get('/user', (req, res) => {
  if (req.session.user) {
    const { name, balance } = req.session.user;
    res.json({ name, balance });
  } else {
    res.json({ error: 'User not found' });
  }
});

app.put('/update', (req, res) => {
  const { email, balance, transactions } = req.body; // Use 'transactions' instead of 'transaction'

  UsersModel.findOneAndUpdate(
    { email: email },
    { balance: balance, transactions: transactions }, // Update the 'transactions' array
    { new: true }
  )
    .then(user => {
      if (user) {
        res.json({ status: 'Success', name: user.name, balance: user.balance });
      } else {
        res.json({ status: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating user data' });
    });
});





  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
app.listen(port, () => console.log(`Listening on port ${port}`));
