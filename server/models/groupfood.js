var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupFoodSchema = new Schema({
  group : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'group'
  },
  food : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'food'
  },
  date : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('groupfood', GroupFoodSchema);
