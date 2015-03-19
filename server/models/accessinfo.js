var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessInfo = new Schema({
  email : {
    type : String
  },
  code : {
    type : String
  },
  key : {
    type : String
  },
  created : {
    type : Date,
    default : Date.now
  }
});
 
module.exports = mongoose.model('accessinfo', AccessInfo);
