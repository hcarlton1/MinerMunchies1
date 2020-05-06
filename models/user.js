/*Creates a User object with fields username, firstName, lastName,
email, and password.
*/
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  favorites: [{name: String, link: String, image: String}]
});

module.exports = mongoose.model('User', userSchema);
