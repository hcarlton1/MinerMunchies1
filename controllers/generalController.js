var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var reviewModel = require('./../models/review.js');
var reviewDB = require('./../utilities/reviewDB.js');
var userModel = require('./../models/user.js');
var userDB = require('./../utilities/userDB.js');
var userDB = require('./../utilities/userDB.js');
var restaurantModel = require('./../models/restaurant.js');
var restaurantDB = require('./../utilities/restaurantDB.js');
var vendingDB = require('./../utilities/vendingDB.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false});

//Route for the home page
router.get('/', function (req, res) {
    res.render('index');
});

//Route for the restaurants page
router.get('/restaurants', function (req, res) {
  req.session.restaurants = restaurantDB.getRestaurants();
  console.log(req.session.restaurants);
  res.render('catalog');
});

//Route for the vending page
router.get('/vending', function (req, res) {
  req.session.machines = vendingDB.getMachines();
  console.log(req.session.machines);
  res.render('vending');
});

//Route for the map page
router.get('/map', function (req, res) {
  res.render('map');
});

//Route for the menu page
router.get('/menu', function (req, res) {
  res.render('menu');
});

//Route for the review page. Redirects to login page if the uses has not logged in
router.get('/review', function (req, res) {
  if(req.session.user){
    res.render('review', {review: req.query});
  }
  else{
    res.redirect('login');
  }
});

//Route for the review page. Redirects to login page if the uses has not logged in
router.get('/reviews', async function (req, res) {
  req.session.reviews = await reviewDB.getReviews(req.session.restaurant);
  res.render('reviews');
});

//Post route for the menu button. Retrieves the restaurant from the restaurantDB and stores it in the session
router.post('/menuButton', urlencodedParser, function (req, res) {
  req.session.restaurant = restaurantDB.getRestaurant(req.body.name);
  console.log(req.session.restaurant);
  res.redirect('menu');
});

//Post route for the review form. Creates a new review object using user input and adds it to the reviewDB.
//Then gets all reviews, calculates the average wait, amount spent, and rating, and redirects to reviews page
router.post('/review', urlencodedParser, async function(req, res){
  review = {restaurant: req.body.restaurant, username: req.body.username, exp: req.body.exp, wait: req.body.wait, order: req.body.order, spent: req.body.spent, rating: req.body.rating};
  await reviewDB.addReview(review);
  req.session.reviews = await reviewDB.getReviews(review.resturant);
  req.session.averages = await reviewDB.getAverages(review.restaurant);
  req.session.save();
  console.log(req.session.reviews);
  res.redirect('/reviews');
});

/*Post route for the favorite button. Redirects if user tries to add a favorite
without logging in. Button sends restaurant name which is used to match the resturant
in the resturantDB, then added to the favorites database (userDB). Favorites
are retrieved and the page redirects to the favorites to display them.
*/
router.post('/favoriteButton', urlencodedParser, async function(req, res){
  if(req.session.user){
    var restaurant = await restaurantDB.getRestaurant(req.body.name);
    await userDB.addFavorite(restaurant, req.session.user.username);
    res.redirect('/favorites');
  }
  else{
    res.redirect('login');
  }
});

//Post route for the add review button. Gets all of the reviews from the database and stores them in the session
router.post('/reviewButton', urlencodedParser, async function(req, res){
  if(req.session.user){
  var restaurant = restaurantDB.getRestaurant(req.body.name);
  req.session.restaurant = restaurant.name;
  req.session.save();
  console.log(req.session.restaurant);
  res.redirect('/review');
  }
  else{
    res.redirect('login');
  }
});

//When the reviews button is clicked, it sends the restaurant name which is used to find the reviews and calculate the average wait, amount spent, and rating
router.post('/reviewsButton', urlencodedParser, async function(req, res){
  var restaurant = await restaurantDB.getRestaurant(req.body.name);
  req.session.restaurant = restaurant.name;
  req.session.averages = await reviewDB.getAverages(req.session.restaurant);
  console.log(req.session.averages);
  req.session.save();
  res.redirect('/reviews');
});

//When the delete button is clicked, it sends the restaurant name which is used to delete it from the array of favorites
router.post('/delete', urlencodedParser, async function(req, res){
  if(req.session.user){
  var restaurant = await restaurantDB.getRestaurant(req.body.name);
  await userDB.removeFavorite(restaurant, req.session.user.username);
  res.redirect('/favorites');
  }
  else{
    res.redirect('login');
  }
});

module.exports = router;
