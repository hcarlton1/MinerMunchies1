//Requires restaurant.js so Restaurant objects can be created
var restaurantModel = require('./../models/restaurant.js');

//Creates an array of Restaurants objects with the names, menus, and logos of all our resturants
var restaurants = [
  new restaurantModel.Restaurant('Chick-fil-A', 'https://www.chick-fil-a.com/locations/nc/university-of-nc-charlotte', './../assets/images/logo_chickfila.png', '1st Floor - Prospector','1'),
  new restaurantModel.Restaurant('Bojangles', 'https://www.bojangles.com/menu/m/biscuits/', '/../assets/images/logo_bojangles.png', '1st Floor - Popp Martin Student Union','1'),
  new restaurantModel.Restaurant("Wendy's", 'https://order.wendys.com/categories?site=menu', './../assets/images/logo_wendys.png','1st Floor - Popp Martin Student Union','2'),
  new restaurantModel.Restaurant('Bistro 49', 'https://new.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_bistro-49.png','2nd Floor - Popp Martin Student Union','2'),
  new restaurantModel.Restaurant("The Den by Denny's", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_den.png','2nd Floor - South Village Crossing','2'),
  new restaurantModel.Restaurant("Forty-Niner Diner", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/FortyNinerDiner_logoWeb.png','1st Floor - Barnhardt Student Activity Center','2'),
  new restaurantModel.Restaurant("Salsarita's", 'https://salsaritas.com/menu/', '../../assets/images/logo_salsaritas.png','2nd Floor - Prospector','3'),
  new restaurantModel.Restaurant("Sambazon", 'https://www.sambazon.com/cafe-menu', './../assets/images/sambazon.jpg','2nd Floor - Cone University Center','3'),
  new restaurantModel.Restaurant("Panda Express", 'https://www.pandaexpress.com/menu', './../assets/images/logo_panda-express.png','2nd Floor - Cone University Center','3'),
  new restaurantModel.Restaurant("Mondo Subs", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/mondosubs.jpg','2nd Floor - Prospector','6'),
  new restaurantModel.Restaurant("Starbucks", 'https://www.starbucks.com/menu', './../assets/images/logo_starbucks.png','1st Floor - Popp Martin Student Union','4'),
  new restaurantModel.Restaurant("Fretwell Cafe", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_fretwell-cafe.png','1st Floor (109) - Fretwell','4'),
  new restaurantModel.Restaurant("Library Cafe", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_library-cafe.png','Ground Floor (G26) - Atkins','4'),
  new restaurantModel.Restaurant("Einstein Bros. Bagels", 'https://www.einsteinbros.com/menu/', './../assets/images/einsteins.png','1st Floor - Popp Martin Student Union','6'),
  new restaurantModel.Restaurant("Dominos", 'https://www.dominos.com/en/pages/order/menu#!/menu/category/viewall/', './../assets/images/dominos_logoWeb150px_0.png','9630 University City Blvd ste f, Charlotte, NC 28213','5'),
  new restaurantModel.Restaurant("Mamma Leone's", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_mamma-leones.png','2nd Floor - Prospector','5'),
  new restaurantModel.Restaurant("Subway", 'https://www.subway.com/en-US/MenuNutrition/Menu', './../assets/images/SUBWAYLOGOcopy.png','2nd Floor - Cone University Center','6'),
  new restaurantModel.Restaurant("Market on Craver", 'https://www.erbertandgerberts.com/sandwiches/', './../assets/images/E+BWeb150px.png','1st Floor - Popp Martin Student Union','6')
];

//returns the array of restaurants
function getRestaurants(){
  return restaurants;
}

/*Receives the name of a restaurant, seaches for it in the array of restaurants
and returns the corresponding Resturant object if it is found. If it is not
found, the returned Restaurant object is null*/
function getRestaurant(name){
  //initialized restaurant variable to null so it returns null if there is no match
  var restaurant = new restaurantModel.Restaurant(null,null,null);
  for(var x = 0; x < restaurants.length; x++){
    if(name == restaurants[x].name){
      restaurant = new restaurantModel.Restaurant(restaurants[x].name, restaurants[x].link, restaurants[x].image, restaurants[x].location, restaurants[x].category);
    }
  }
  return restaurant;
}

//Exports getRestaurants function and getRestaurant function to be used in other files
module.exports.getRestaurants = getRestaurants;
module.exports.getRestaurant = getRestaurant;
