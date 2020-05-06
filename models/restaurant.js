/*Creates a Restaurant object with fields name, link, and image.
*/
class Restaurant{
  constructor(name, link, image, location, category){
    this._name = name;//holds the restaurant name
    this._link = link;//holds the link to resturant menu
    this._image = image;//holds the link resturant logo image
    this._location = location;//holds the link resturant location
    this._category = category;//holds the link resturant location
  }
  get name(){
    return this.name;
  }
  set name(name){
    this._name = name;
  }
  get link(){
    return this._link;
  }
  set link(link){
    this._link = link;
  }
  get image(){
    return this._image;
  }
  set image(image){
    this._image = image;
  }
  get location(){
    return this._location;
  }
  set location(location){
    this._location = location;
  }
  get category(){
    return this._category;
  }
  set category(category){
    this._category = category;
  }
}
//Exports Restaurant object to be used in other files
module.exports.Restaurant = Restaurant;
