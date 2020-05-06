//Requires review.js so Review objects can be created
var Review = require('./../models/review.js');
//Requires restaurantDB.js so the array of resturants can be accessed
var restaurantDB = require('./../utilities/restaurantDB.js');

//retrieves the array of restaurants
restaurants = restaurantDB.getRestaurants();

//Receives a Review object from the controller, adds it to the array of reviews
function addReview(r){
  return Review.find({ username: r.username, restaurant: r.restaurant }).exec().then((results)=>{
    if(results[0] == null){
      var a = new Review(r);
      a.save();
    }
  })
  .catch((err)=>{
    console.log('err');
  });
}

//Returns the reviews array
function getReviews(r){
  return Review.find({restaurant: r}).exec();
}

/*Receives a restaurant name from the controller. Searches through the array
of reviews to find the restaurant name, adds the wait, spent, and rating values
to the avg variables when found, and increments the count. When loop exits,
divides the avg variables by the count to find the average for each field.
Creates and returns new Averages object with waitAvg, spentAvg, ratingAvg.*/
function getAverages(r){
  var waitAvg = 0;
  var spentAvg = 0;
  var ratingAvg = 0;
  var count = 0;
  return Review.find({restaurant: r}).exec().then((results)=>{
    if(results){
      for(let i = 0; i < results.length; i++){
          waitAvg+=results[i].wait;
          spentAvg+=results[i].spent;
          ratingAvg+=results[i].rating;
          count++;
      }
          waitAvg = waitAvg/count;
          spentAvg = spentAvg/count;
          ratingAvg = ratingAvg/count;
          var averages = {waitAvg: waitAvg,spentAvg: spentAvg,ratingAvg: ratingAvg};
          return averages;
    }
  })
  .catch((err)=>{
    console.log('err');
  });

}
//Exports Averages object and all functions to be used in other files
module.exports.addReview = addReview;
module.exports.getReviews = getReviews;
module.exports.getAverages = getAverages;
