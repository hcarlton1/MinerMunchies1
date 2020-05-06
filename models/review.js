/*Creates a Review object with fields restaurant, username, exp, wait, order,
spent, and rating.
*/
var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  restaurant: String,
  username: String,
  exp: String,
  wait: Number,
  order: String,
  spent: Number,
  rating: Number
});

module.exports = mongoose.model('Review', reviewSchema);
