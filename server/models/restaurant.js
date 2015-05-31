var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
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
  },
  foods : [{
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'food'
  }],
  pointx : {
    type : Number
  },
  pointy : {
    type : Number
  }
});

module.exports = mongoose.model('restaurant', RestaurantSchema);