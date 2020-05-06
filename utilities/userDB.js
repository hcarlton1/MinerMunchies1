//Requires user.js so User objects can be created
var User = require('./../models/user.js');

//Returns the array of User objects
function getUsers(){
  return User.find({}).exec();
}

function getHashedPassword(username){
  return User.findOne({username: username}).exec().then((results)=>{
    return results.password;
  })
  .catch((err)=>{
    console.log('err');
  });
}

//Returns the user with the specified username if found
function getUser(u){
  return User.findOne({ $or:[ { username: u }, { email: u }]}).exec().then((results)=>{
    return results;
  })
  .catch((err)=>{
    console.log('getUser err');
  });
}
//Adds a new user to the database
function addUser(user){
  return User.find({ $or:[ { username: user.username }, { email: user.email }]}).exec().then((results)=>{
    if(results[0] == null){
      console.log('Adding user ' + user.username);
      var u = new User(user);
      u.save();
    }
  })
  .catch((err)=>{
    console.log('err');
  });
}

/*Receives a Resturant object from the controller, adds it to the array of
favorites. If it is already in the favorites it is first removed and then added
again at the end of the array*/
function addFavorite(r,u){
  var included = false;
  return User.findOne({username: u}).exec().then((results)=>{
    for(var x = 0; x < results.favorites.length; x++){
      if(results.favorites[x].name == r.name){
        included = true;
      }
    }
    if(!included){
      a = results;
      if(a.favorites[0].name == null){
        a.favorites[0] = {name: r.name, link: r.link, image: r.image};
      }
      else{
        a.favorites.push({name: r.name, link: r.link, image: r.image});
      }
      a.save();
    }
  })
  .catch((err)=>{
    console.log('addFavorite err');
  });
}

/*Receives a Resturant object from the controller, searches the array of
favorites and removes the corresponding favorite if it matchesy*/
function removeFavorite(r, u){
  return User.findOne({username: u}).exec().then((results)=>{
    for(var x = 0; x < results.favorites.length; x++){
      if(results.favorites[x].name == r.name){
        a = results;
        a.favorites.splice(x,1);
        a.save();
      }
    }
  })
}
//Exports all functions to be used in other files
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.addFavorite = addFavorite;
module.exports.removeFavorite = removeFavorite;
module.exports.getHashedPassword = getHashedPassword;
