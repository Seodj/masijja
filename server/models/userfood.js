var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserFoodSchema = new Schema({
  user : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'user'
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

module.exports = mongoose.model('userfood', UserFoodSchema);
