/*Creates a Restaurant object with fields building, floor, and room.
*/
class Vending{
  constructor(building, floor, room, type){
  this._building = building;//holds the floor to resturant menu
    this._floor = floor;//holds the floor resturant logo room
    this._room = room;//holds the floor resturant logo room
    this._type = type;//holds the floor resturant type
  }
  get building(){
    return this._building;
  }
  set building(building){
    this._building = building;
  }
  get floor(){
    return this._floor;
  }
  set floor(floor){
    this._floor = floor;
  }
  get room(){
    return this._room;
  }
  set room(room){
    this._room = room;
  }
  get type(){
    return this._type;
  }
  set type(type){
    this._type = type;
  }
}
//Exports Restaurant object to be used in other files
module.exports.Vending = Vending;
