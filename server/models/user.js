var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name : {
    required : true,
    type : String
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  thumbnail : {
    type : String
  },
  todayfood : {
    type : Schema.Types.ObjectId,
    ref : 'food'
  },
  keys : [{
    type : String
  }],
  favorite : {
    type : Schema.Types.ObjectId,
    ref : 'food'
  },
  comments : {
    type : String
  },
  logs : [
    {
      foodid: {
      type: Schema.Types.ObjectId,
      ref: 'food'
      },
      date:{
        type: Date,
        default: Date.now
      }
    }
  ],
  created : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
