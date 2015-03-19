var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name : {
    type : String,
    required : true,
    unique : true
  },
  created : {
    type : Date,
    default : Date.now
  },
  users : [{
    type : Schema.Types.ObjectId,
    ref : 'user'
  }],
  code : {
    type : String,
    default : ""
  },
  admin : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'user'
  },
  todayfood : {
    type : Schema.Types.ObjectId,
    ref : 'food'
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
  comment : {
    type : String
  }
});

module.exports = mongoose.model('group', GroupSchema);
