var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
  name : {
    type : String,
    unique : true,
    required : true
  },
  thumbnail : {
    type : String
  },
  description : {
    type : String
  }
});

module.exports = mongoose.model('food', FoodSchema);
