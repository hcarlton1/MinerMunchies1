const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./../models/user.js');
const userProfile = require('./../utilities/userProfile.js');
const userDB = require('./../utilities/userDB.js');

const urlencodedParser = bodyParser.urlencoded({ extended: false});
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//Route for the login page, needs {user: req.query} parameter for form
router.get('/login', function (req, res) {
  res.render('login', {user: req.query});
});

//Route for the register page, needs {user: req.query} parameter for form
router.get('/register', function (req, res) {
  res.render('register', {user: req.query});
});

//Route for the favorites page
router.get('/favorites', async function (req, res) {
  req.session.user = await userDB.getUser(req.session.user.username);
  res.render('favorites');
});

//Route for the account page, cannot be accessed until the user has logged in
router.get('/account', function (req, res) {
  if(req.session.user){
    res.render('account');
  }
  else{
    res.render('login', {user: req.query});
  }
});

/*Post route for the login form. If the username does not match any usernames
in the userDB, then the user will be redirected to the register page. If it does
match one of the usernames, they will be logged in and the user information is
saved to the session. Redirects to the account page after sign in.*/
router.use(urlencodedParser);
router.post('/login', [
  check('username')
  .isAlphanumeric()
  .isLength({min: 6})
  .custom(async username => {
    if (!(await userDB.getUser(username))) {
      throw new Error('User does not exist.')
    }
  }),
  check('password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .isLength({min: 8})
], async function(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.session.errors = await errors.array();
    console.log(req.session.errors);
    await res.redirect('login');
  }
  else{
  var password = await userDB.getHashedPassword(req.body.username);
  bcrypt.compare(req.body.password, password, async function(err, result) {
    if(result){
      req.session.user = await userDB.getUser(req.body.username);
      user = req.session.user;
      req.session.save();
      res.redirect('account');
    }
    else{
      req.session.errors = true;
      res.redirect('login');
    }
  });
}
});

/*Post route for the register form. A new user object is created using user
input and added to the userDB. Their account is now created. They will be
logged in and the user information is saved to the session. Redirects to the
account page after sign in.*/
router.post('/register', [
  check('email')
  .isEmail()
  .contains('@uncc.edu')
  .custom(async email => {
    if (await userDB.getUser(email)) {
      throw new Error('Already in use')
    }
  }),
  check('username')
  .isAlphanumeric()
  .isLength({min: 6})
  .custom(async username => {
    if (await userDB.getUser(username)) {
      throw new Error('Already in use')
    }
  }),
  check('firstName').matches(/^[a-zA-Z\s]+$/),
  check('lastName').matches(/^[a-zA-Z\s\-]+$/),
  check('password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .isLength({min: 8})
], async function(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.session.errors = await errors.array();
    console.log(req.session.errors);
    await res.redirect('register');
  }
  else{
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
      var user = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hash, favorites: [{name:null, link: null, image:null}]};
      await userDB.addUser(user);
      req.session.user = user;
      req.session.save();
      res.redirect('account');
    });
  }
});

/*Post route for the profile's logOut button. Simply deletes the user data
from the session and redirects to the home page.*/
router.post('/logout', urlencodedParser, function(req, res){
  delete req.session['user'];
  res.redirect('/');
});

module.exports = router;
